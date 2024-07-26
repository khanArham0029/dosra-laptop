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
          <img src="../assets/Icons/icons8-dashboard-24.png" class="material-symbols-outlined"> Dashboard</router-link>
      </li>
      <li>
        <router-link to="/studentAdmin">
          <img src="../assets/Icons/icons8-student-24.png" class="material-symbols-outlined"> Students</router-link>
      </li>
      <li>
        <router-link to="/teacherAdmin">
          <img src="../assets/Icons/icons8-teacher-24.png" class="material-symbols-outlined"> Teachers</router-link>
      </li>
      <h4>
        <span>Account</span>
        <div class="menu-separator"></div>
      </h4>
      <li>
        <router-link to="/adminView">
          <img src="../assets/Icons/icons8-logout-24.png" class="material-symbols-outlined"> Logout</router-link>
      </li>
    </ul>
    
  </aside>
</template>

<script>
    export default {
        name: 'SideBarAdmin'
    }
</script>

<style>
@import "../assets/sideBarAdmin.css";
</style>