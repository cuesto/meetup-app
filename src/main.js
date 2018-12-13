import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DateFilter from "./filters/date";
import * as firebase from "firebase";
import AlertCmp from "./components/Shared/Alert.vue";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDateDiaglog.vue";
import EditMeetupTimeDialog from "./components/Meetup/Edit/EditMeetupTimeDialog.vue";
import RegisterDialog from "./components/Meetup/Registration/RegisterDialog.vue";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog);
Vue.component("app-edit-meetup-date-dialog", EditMeetupDateDialog);
Vue.component("app-edit-meetup-time-dialog", EditMeetupTimeDialog);
Vue.component("app-meetup-register-dialog", RegisterDialog);

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
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
