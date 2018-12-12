import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import VueCookies from 'vue-cookies'
import Toastr from 'vue-toastr'
import vueSmoothScroll from 'vue2-smooth-scroll'
import api from './api'
import store from './store'

axios.defaults.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const token = VueCookies.get('token');
if (token) {
  axios.defaults.headers['Authorization'] = "Bearer " + token;
}

const checkUnique = {
  getMessage: field => `Such ${field} already exists.`,
  validate: value => value && api.checkUnique({email: value}).then(response => ({valid: response.valid}))
};

const checkCode = {
  getMessage: field => `This School is full`,
  validate: code => code && api.checkCode({code}).then(response => ({valid: response.valid}))
};

Vue.use(vueSmoothScroll)
Vue.use(Toastr)
Vue.use(VueCookies)
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

import { Validator } from 'vee-validate'

Validator.extend('check-unique', checkUnique)
Validator.extend('check-code', checkCode)

new Vue({
  router,
  store,
  render: h => h(App),
  data: () => ({
    user: false
  }),
  created() {
    if (this.$cookies.get('token')) {
      this.getUser()
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch("setUser")
    },
  }
}).$mount('#app') 
