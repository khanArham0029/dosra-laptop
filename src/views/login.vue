<template>
    <section class="container forms">
      <div class="form login">
        <div class="form-content">
          <header>Login</header>
          <form action="#">
            <div class="field input-field">
              <input type="email" placeholder="Email" class="input" v-model="email" />
            </div>
            <div class="field input-field">
              <input type="password" placeholder="Password" class="password" v-model="password" />
            </div>
            <div class="field input-field">
              <select v-model="userType" class="input">
                <option value="" disabled>Select User Type</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div class="form-link">
              <router-link to="/forgotPassword" class="forgot-pass">Forgot password?</router-link>
            </div>
            <!-- error message is being displayed here -->
            <div v-show="errorShow" class="error">{{ errorMsg }}</div>
            <!-- error msg end -->
            <div class="field button-field">
              <button @click.prevent="login">Login</button>
            </div>
          </form>
          <div class="form-link">
            <span>
              Don't have an account?
              <router-link to="/signup" class="link signup-link">Signup</router-link>
            </span>
          </div>
        </div>
      </div>
    </section>
  </template>

<script>
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import db from '../firebase.js';

export default { 
  name: 'LogIN',
  data() {
    return {
      email: '',
      password: '',
      userType: '', // Add userType to the data model
      errorMsg: '',
      errorShow: false
    };
  },
  methods: {
    async login() {
      if (this.email && this.password && this.userType) {
        try {
          // Check if the user's email exists in the respective collection
          const collectionName = this.userType === 'teacher' ? 'teachers' : 'students';
          const q = query(collection(db, collectionName), where("email", "==", this.email));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            throw new Error('User not found in the selected user type');
          }

          // Proceed with Firebase authentication
          await signInWithEmailAndPassword(auth, this.email, this.password);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
          });

          // Redirect based on user type
          if (this.userType === 'teacher') {
            this.$router.push('/teacherView');
          } else if (this.userType === 'student') {
            this.$router.push('/studentView');
          }

          this.errorShow = false;
          this.errorMsg = "";
          console.log(auth.currentUser.uid);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message || 'Invalid email or password',
          });
          this.errorShow = true;
          this.errorMsg = error.message || 'Invalid email or password';
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
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
</style>
