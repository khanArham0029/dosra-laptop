<template>
    <section class="container forms">
            <div class="form login">
                <div class="form-content">
                    <header>Login</header>
                    <form action="#">
                        <div class="field input-field">
                            <input type="email" placeholder="Email" class="input" v-model="email">
                        </div>
                        <div class="field input-field">
                            <input type="password" placeholder="Password" class="password" v-model="password">
                        </div>
                        <div class="form-link">
                            <router-link to="/forgotPassword" class="forgot-pass">Forgot password?</router-link>
                        </div>
                        <!-- error message is being displayed here -->
                        <div v-show="errorShow" class="error">{{this.errorMsg}}</div>
                         <!-- error msg end -->
                        <div class="field button-field">
                            <button @click.prevent="login">Login</button>
                        </div>
                    </form>
                    <div class="form-link">
                        <span>Don't have an account? <router-link to="/signup" class="link signup-link">Signup</router-link></span>
                    </div>
                </div>
              
              </div>
    </section>
   
  </template>
  
  <script>
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase.js';

  export default { 
    name: 'LogIN',
    data() {
      return {
        email: '', // Define email
        password: '', // Define password
        errorMsg: '', // Define errorMsg
        error: '', // Define error
        errorShow: false
      };
    },
    methods:{
        login(){
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$router.push('/adminView')
                this.errorShow = false
                this.errorMsg = ""
                console.log(auth.currentUser.uid)
            
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid email or password',
                })
                this.errorShow = true
                this.errorMsg = error.message
                console.log(error.message)
            });
        }
    }
  }
  </script>
  
  <style scoped>
  @import "../assets/loginSignup.css";
  .error{
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center
}
 
  </style>  