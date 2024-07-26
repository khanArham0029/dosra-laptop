<template>
  <header>
    <nav>
      <div class="menu">
        <div class="logo">
          <a href="#">EduSync</a>
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
          <li><router-link to="/signup">Login/Signup</router-link></li>
        </ul>
      </div>
    </nav>
  </header>
  </template>
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  <style scoped>
  
  nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #1b1b1b;
  width: 100%;
  padding: 10px 0;
  z-index: 12;
}

.menu {
  max-width: 1250px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo a {
  text-decoration: none;
  color: #fff;
  font-size: 35px;
  font-weight: 600;
}

ul {
  display: inline-flex;
}

ul li {
  list-style: none;
  margin-left: 7px;
}

ul li:first-child {
  margin-left: 0px;
}

ul li a {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

ul li a:hover {
  background: #fff;
  color: black;
}

  </style>