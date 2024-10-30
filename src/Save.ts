class Download {
  static download = (data) => {
    var blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const filename = prompt("filename")
    if (filename) {
      var elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }
}

class Load {
  static load = (files: File[], onsuccess: (data: any) => void) => {
      for (var i = 0; i < files.length; ++i) {

        const f = (file: File) => {               // Wrap current file in a closure.
          var loader = new FileReader();
          loader.onload = function (loadEvent: ProgressEvent<FileReader>) {
            const target = loadEvent.target as FileReader;
            if (target.readyState !== 2)
              return;
            if (target.error) {
              console.log("Error while reading file " + file.name + ": " + target.error);
              return;
            }
            onsuccess(JSON.parse(target.result as string))
          };
          loader.onabort = function () {
            console.log("aborted")
          }
          loader.readAsText(file);
        }

        return f(files[i]);
      }
    }
}

export { Download, Load }
