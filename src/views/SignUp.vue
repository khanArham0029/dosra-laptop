<template>
  <section class="container forms">
    <div class="form login">
      <div class="form-content">
        <header>Signup</header>
        <form action="#">
          <div class="field input-field">
            <input type="text" placeholder="User Name" class="input" v-model="username" />
          </div>
          <div class="field input-field">
            <input type="email" placeholder="Email" class="input" v-model="email" />
          </div>
          <div class="field input-field">
            <input type="password" placeholder="Password" class="password" v-model="password" />
          </div>
          <div class="field input-field">
            <select v-model="userType" class="inputUserType">
              <option value="" disabled>Select User Type</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <!-- error message is being displayed here -->
          <div v-show="errorShow" class="error">{{ errorMsg }}</div>
          <!-- error msg end -->
          <div class="field button-field">
            <button @click.prevent="signup">Signup</button>
          </div>
        </form>
        <div class="form-link">
          <span>
            Already have an account?
            <router-link to="/login" class="link signup-link">Login</router-link>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';
import { collection, addDoc } from "firebase/firestore"; 
import db from '../firebase.js';

export default {
  name: 'signUp',
  components: {},
  data() {
    return {
      username: '',
      email: '',
      password: '',
      userType: '', // Add userType to the data model
      errorMsg: '',
      errorShow: false
    };
  },
  methods: {
    async signup() {
      if (this.username && this.email && this.password && this.userType) {
        try {
          // Signing up the user
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
          console.log(user);
          this.errorShow = false;
          this.errorMsg = "";

          // Determine the collection based on userType
          let collectionName;
          switch (this.userType) {
            case 'teacher':
              collectionName = 'teachers';
              break;
            case 'student':
              collectionName = 'students';
              break;
            case 'admin':
              collectionName = 'admins';
              break;
            default:
              throw new Error('Invalid user type');
          }

          // Data to send
          const dataObj = {
            userName: this.username,
            email: this.email,
          };

          // Create document in the respective collection
          await addDoc(collection(db, collectionName), dataObj);
        } catch (error) {
          this.errorMsg = error.message;
          this.errorShow = true;
          console.log(error.message);
        }
      } else {
        this.errorShow = true;
        this.errorMsg = "Please fill all the fields";
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/loginSignup.css";
.form {
  max-height: 600px;
}
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
.inputUserType {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>
