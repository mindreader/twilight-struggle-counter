{
  description = "Twilight Struggle Counter";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let

    pkgs = nixpkgs.legacyPackages.x86_64-linux;

    install = (pkgs.writeShellScript "ts-install" ''
      ${pkgs.nodejs}/bin/npm install
    '').outPath;

    start = {
      type = "app";
      program = (pkgs.writeShellScript "ts-start" ''
        ${install}
        ${pkgs.nodejs}/bin/npm run start
      '').outPath;
    };


    build = {
      type = "app";
      program = (pkgs.writeShellScript "ts-release" ''
        ${install}
        ${pkgs.nodejs}/bin/npm run build
        '').outPath;
    };

    twilightCardCounter = pkgs.buildNpmPackage {
      name = "twilight-struggle-card-counter";

      src = with pkgs.lib.fileset; toSource {
        root = ./.;
        fileset = unions [ ./src ./tsconfig.json ./package.json ./package-lock.json ./public ./index.html ];
      };

      npmDepsHash = "sha256-xVOdvxL1X22fyy7HETUcKvxJrP0wueQP8+VWe64ng9c=";

      buildPhase = ''
       npm run build
      '';

      installPhase = ''
        mkdir $out
        cp -r dist/* $out/
     '';
   };

   nginxConf = pkgs.writeText "nginx.conf" ''
      worker_processes auto;

      events {
        worker_connections  1024;
      }

      error_log /var/log/nginx/error.log notice;

      http {
        include ${pkgs.nginx}/conf/mime.types;
        default_type  application/octet-stream;

        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';

        access_log  /var/log/nginx/access.log  main;

        charset utf-8;

        sendfile on;

        server {
          server_name localhost;
          listen 0.0.0.0:8080;

          root /app;

          autoindex off;

          location / {
            try_files $uri $uri/ /index.html;
          }
        }
      }
    '';

    # nginx needs a basic user and group or it simply won't start.
    basicUser = pkgs.writeText "basicUser" ''
      nobody:x:65534:65534:Unprivileged account (don't use!):/var/empty:/run/current-system/sw/bin/nologin
    '';

    basicGroup = pkgs.writeText "basicGroup" ''
      nogroup:x:65534:
    '';


    container = pkgs.dockerTools.buildImage {
      name = "ts-container";
      tag = "latest";

      runAsRoot = ''
        mkdir -p /var/log/nginx
        chown 65534:65534 /var/log/nginx
        mkdir -p /tmp/nginx_client_body
        mkdir -p /tmp/nginx_proxy
        mkdir -p /tmp/nginx_fastcgi
        mkdir -p /tmp/nginx_uwsgi
        mkdir -p /tmp/nginx_scgi
        mkdir /etc
        cp ${basicUser} /etc/passwd
        cp ${basicGroup} /etc/group

        ln -sf /dev/stdout /var/log/nginx/access.log
        ln -sf /dev/stderr /var/log/nginx/error.log

        ln -s ${twilightCardCounter} /app
      '';

# for debugging purposes
#      copyToRoot = [
#        pkgs.dockerTools.usrBinEnv
#
#        (pkgs.buildEnv {
#          name = "image-root";
#          paths = [ pkgs.bash pkgs.coreutils pkgs.gnugrep pkgs.findutils pkgs.less ];
#          pathsToLink = "/bin";
#        })
#     ];

      config = {
        Cmd = [ "${pkgs.nginx}/bin/nginx" "-g" "daemon off;" "-c" nginxConf ];
        User = "65534:65534";
        ExposedPorts = {
          "8080/tcp" = {};
        };
      };
    };

  in with pkgs; {

    # start aka "watch" mode
    # nix run .#start
    apps.x86_64-linux.default = start;
    apps.x86_64-linux.start = start;

    # build aka release mode
    # nix run .#build
    apps.x86_64-linux.build = build;

    # nix -L build .#container && podman load < result && podman run --rm -it -p 127.0.0.1:8080:8080 localhost/ts-container
    # nix -L build .#container && docker load < result && docker run --rm -it -p 127.0.0.1:8080:8080 localhost/ts-container
    packages.x86_64-linux.container = container;

    # nix develop
    devShells.x86_64-linux.default = pkgs.mkShell {

      name = "ts-shell";
      packages = [ pkgs.nodejs ];
    };
  };
}
