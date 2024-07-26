<template>
    <NavBar></NavBar>
    <popup v-if="popupActive" v-on:close-popup="closePopup"/>
    <loading v-if="loading"/>
    <section class="container forms">
            <div class="form login">
                <div class="form-content">
                    <header>Reset Your Password</header>
                    <div class="form-link">
                        <span>Enter your email to reset your password</span>
                    </div>
                    <form action="#">
                        <div class="field input-field">
                            <input type="email" placeholder="Email" class="input" v-model="email">
                        </div>
                        <div class="field button-field">
                            <button>Reset</button>
                        </div>
                    </form>
                    <div class="form-link">
                        <span>Remember your password? <router-link to="/login" class="link signup-link">Login</router-link></span>
                    </div>
                </div>  
              
              </div>
    </section>
   
  </template>
  
  <script>
  import popup from '../components/popup.vue'
  import loading from '../components/loading.vue'

  export default {
  
    name: 'forgotPassword',
    components:{
        email:"",
        popup,loading
    },
    methods:{
        closePopup(){
            this.popupActive=!this.popupActive;
            this.email="";
        }
    },
    data(){
        return{
            email:"",
            popupActive:null,
            popupMessage:"",
            loading:null


        }
    

    }
  }
  </script>
  
  <style scoped>
  @import "../assets/loginSignup.css";

 
  </style>  