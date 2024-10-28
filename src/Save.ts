// @ts-nocheck

class Download {

  static download = (data) => {
    var blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const filename = prompt("filename")
    if (filename) {
      if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
      }
      else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
      }
    }
  }
}

class Load {
  static load = (files, onsuccess) => {
      for (var i = 0; i < files.length; ++i) {

        const f = (file) => {               // Wrap current file in a closure.
          var loader = new FileReader();
          loader.onload = function (loadEvent) {
            if (loadEvent.target.readyState !== 2)
              return;
            if (loadEvent.target.error) {
              console.log("Error while reading file " + file.name + ": " + loadEvent.target.error);
              return;
            }
            onsuccess(JSON.parse(loadEvent.target.result))
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
