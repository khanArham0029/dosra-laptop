import { createStore } from 'vuex'
import auth from './modules/auth/indexA.js'

const store = createStore({
  modules: {
    // modules
    auth
  }
})

export default store
