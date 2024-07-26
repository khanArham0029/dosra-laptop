<template>
    <section class="container forms">
            <div class="form login">
                <div class="form-content">
                    <header>Signup</header>
                    <form action="#">
                        <div class="field input-field">
                            <input type="text" placeholder="User Name" class="input" v-model="username">
                        </div>
                        <div class="field input-field">
                            <input type="email" placeholder="Email" class="input" v-model="email">
                        </div>
                        <div class="field input-field">
                            <input type="password" placeholder="Password" class="password" v-model="password">
                        </div>
                        <!-- error message is being displayed here -->
                         <div v-show="errorShow" class="error">{{this.errorMsg}}</div>
                         <!-- error msg end -->
                        <div class="field button-field">
                            <button @click.prevent="signup">Signup</button>
                        </div>
                    </form>
                    <div class="form-link">
                        <span>Already have an account? <router-link to="/login" class="link signup-link">Login</router-link></span>
                    </div>
                </div>
              
              </div>
    </section>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase.js';
import { collection, addDoc } from "firebase/firestore"; 
import db from '../firebase.js';
export default {
  name: 'signUp',
  components: {
},
data() {
    return {
      username: '', // Assuming username is a string
      email: '', // Define email
      password: '', // Define password
      errorMsg: '', // Define errorMsg
      error: '', // Define error
      errorShow: false
    };
  },
methods: {
  signup() {
        if(this.username !="" && this.email !="" && this.password !=""){
            
        //singing up the user
        createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // Emitting the loggedIn event
          this.errorShow = false;
          this.errorMsg = "";
          //db write
        //const userID=user; 
        const colRef = collection(db, 'users')
        // data to send
        const dataObj = {
        userName: this.username,
        email: this.email,
        

      }


      // create document and return reference to it
       addDoc(colRef, dataObj)
            
        })
        .catch((error) =>{
            this.errorMsg = error.message;
            this.errorShow = true;
            console.log(error.message);
        })
    }
        this.errorShow = true;
        this.errorMsg = "Please fill all the fields";
        return;

    }
 }


}
</script>

<style >
@import "../assets/loginSignup.css";
.form{
  max-height: 600px;
}
.error{
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center
}
</style>    
