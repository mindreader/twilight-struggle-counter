class SessionStorage {
  static storageAvailable = (type: "sessionStorage" | "localStorage"): boolean => {
    let storage: Storage | undefined;
    try {
      storage = window[type];
      const x = "__storage_test__";
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
        storage !== undefined &&
        storage.length !== 0
      );
    }
  };

  static set = <T>(st: T): T => {
    try {
      sessionStorage.setItem("state", JSON.stringify(st));
      return st;
    } catch (e) {
      console.log("Could not store in session storage");
      if (e instanceof Error) console.log(e.name);
      console.log(st);
      return st;
    }
  };

  static has = (): boolean => {
    return sessionStorage.getItem("state") ? true : false;
  };

  static get = (): unknown => {
    try {
      const item = sessionStorage.getItem("state");
      if (item === null) return null;
      return JSON.parse(item);
    } catch (e) {
      console.log("Could not read from session storage");
      if (e instanceof Error) console.log(e.name);
    }
  };
}

export default SessionStorage;
