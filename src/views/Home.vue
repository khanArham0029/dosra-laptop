<template>
    
    <div class="img"></div>
    <div class="center">
      <div class="title">Welcome to EduSync</div>
      <div class="sub_title">The most advance Learning Managment System</div>
      <div class="btns">
        <button @click="goToLoginPage">Login</button>
        <button @click="goToSignupPage">Signup</button>
    </div>
</div>

  </template>
  
  <script>
  
  export default {
    methods: {
      goToLoginPage() {
        this.$router.push('/login')
      },
      goToSignupPage() {
        this.$router.push('/signup')
      }
    },
    name: 'HomeView'
   
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  ::selection {
    color: #000;
    background: #fff;
  }
  .img {
    /* display: block; */
    background: url('../assets/homePic2.jpg') no-repeat;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .img::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .center {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 0 20px;
    text-align: center;
  }
  .center .title {
    color: whitesmoke;
    font-size: 55px;
    font-weight: 600;
  }
  .center .sub_title {
    color: whitesmoke;
    font-size: 28px;
    font-weight: 300;
  }
  .center .btns {
    margin-top: 20px;
  }
  .center .btns button {
    height: 55px;
    width: 170px;
    border-radius: 5px;
    border: none;
    margin: 0 10px;
    border: 2px solid white;
    font-size: 20px;
    font-weight: 500;
    padding: 0 10px;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
  }
  .center .btns button:first-child {
    color: #fff;
    background: none;
  }
  .center .btns button:last-child {
    color: #fff;
    background: none;
  }
  .btns button:first-child:hover {
    background: white;
    color: black;
  }
  .btns button:last-child:hover {
    background: white;
    color: black;
  }
  </style>