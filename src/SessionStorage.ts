class SessionStorage {
  static storageAvailable = type => {
    try {
      var storage = window[type],
        x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0
      );
    }
  };

  static set = st => {
    try {
      sessionStorage.setItem("state", JSON.stringify(st));
      return st
    } catch (e) {
      console.log("Could not store in session storage");
      console.log(e.name);
      console.log(st)
    }
  };

  static has = () => {
    return sessionStorage.getItem("state") ? true : false;
  };

  static get = () => {
    try {
      return JSON.parse(sessionStorage.getItem("state"));
    } catch (e) {
      console.log("Could not store in session storage");
      console.log(e.name);
    }
  };
}

export default SessionStorage;
