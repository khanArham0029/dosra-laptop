<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <!-- <img src="images/logo.png" alt="logo" /> -->
      <h2>Admin</h2>
    </div>
    <ul class="sidebar-links">
      <h4>
        <span>Main Menu</span>
        <div class="menu-separator"></div>
      </h4>
      <li>
        <router-link to="/adminView">
          <img src="../assets/Icons/icons8-dashboard-24.png" class="material-symbols-outlined"> Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/studentAdmin">
          <img src="../assets/Icons/icons8-student-24.png" class="material-symbols-outlined"> Students
        </router-link>
      </li>
      <li>
        <router-link to="/teacherAdmin">
          <img src="../assets/Icons/icons8-teacher-24.png" class="material-symbols-outlined"> Teachers
        </router-link>
      </li>
      <h4>
        <span>Account</span>
        <div class="menu-separator"></div>
      </h4>
      <li @click="performLogout">
        <a>
          <img src="../assets/Icons/icons8-logout-24.png" class="material-symbols-outlined"> Logout
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { interpret } from 'xstate';
import { appMachine } from '../state/eduMachine';

export default {
  name: 'SideBarAdmin',
  data() {
    return {
      service: null
    };
  },
  created() {
    this.service = interpret(appMachine).start();
  },
  methods: {
    performLogout() {
      this.service.send('LOGOUT');
      this.service.onTransition((state) => {
        if (state.matches('idle')) {
          this.$router.push('/'); // Redirect to the homepage on successful logout
        }
      });
    }
  },
  onUnmounted() {
    if (this.service) {
      this.service.stop();
    }
  }
};
</script>

<style>
@import "../assets/sideBarAdmin.css";
</style>
 