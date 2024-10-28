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

  in with pkgs; {

    # start aka "watch" mode
    # nix run .#start
    apps.x86_64-linux.default = start;

    # build aka release mode
    # nix run .#build
    apps.x86_64-linux.build = build;

    devShells.x86_64-linux.default = pkgs.mkShell {

      name = "ts-shell";
      packages = [ pkgs.nodejs ];
    };
  };
}
