export const localStorageIdGenerator = ((appName='App') => {
    let id = 1;
   
    return {
      getNewID () {
        this.retrieveStoredId();
        id++;
        this.storeId();
        return id;
      },
  
      storeId() {
          localStorage.setItem(`${appName}-ID`, id);
      },
      retrieveStoredId() {
          id = localStorage.getItem(`${appName}-ID`)?? 0;
      },
      reset() {
        id = 0;
        this.storeId();
      },
    };
  })();
  