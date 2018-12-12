import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DateFilter from "./filters/date";
import * as firebase from "firebase";
import AlertCmp from "./components/Shared/Alert.vue";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCqCQUOg2YDQJPp_T73VSMg8G43Flfl4I0",
      authDomain: "meetup-app-2c038.firebaseapp.com",
      databaseURL: "https://meetup-app-2c038.firebaseio.com",
      projectId: "meetup-app-2c038",
      storageBucket: "meetup-app-2c038.appspot.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
