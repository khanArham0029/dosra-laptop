// persist.js
import debounce from 'lodash.debounce';

const persistState = (delay = 500) => {
  return store => {
    // Called when the store is initialized
    const savedState = sessionStorage.getItem('vuex-state');
    if (savedState) {
      store.replaceState(JSON.parse(savedState));
    }

    // Subscribe to store updates
    store.subscribe(debounce((mutation, state) => {
      const stateToPersist = JSON.stringify(state);
      sessionStorage.setItem('vuex-state', stateToPersist);
    }, delay));
  };
};

export default persistState;
