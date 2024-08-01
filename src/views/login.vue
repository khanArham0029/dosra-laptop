<template>
  <section class="container forms">
    <div class="form login">
      <div class="form-content">
        <header>Login</header>
        <form @submit.prevent="performLogin">
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
          <div class="form-link">
            <router-link to="/forgotPassword" class="forgot-pass">Forgot password?</router-link>
          </div>
          <div v-show="errorMsg" class="error">{{ errorMsg }}</div>
          <div class="field button-field">
            <button type="submit">Login</button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { interpret } from 'xstate';
import { appMachine } from '../state/eduMachine'; // Adjust the import path

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const userType = ref('');
    const errorMsg = ref('');
    const router = useRouter();
    const service = interpret(appMachine)
      .onTransition((state) => {
        console.log('Current state:', state.value);
        console.log('Context:', state.context);
        if (state.matches('authenticated')) {
          Swal.fire('Success', 'Login successful', 'success');
          const currentUser = state.context.user;
          console.log(currentUser.userType);
          switch (currentUser.userType) {
            case 'admin':
              router.push('/adminView');
              break;
            case 'teacher':
              router.push('/teacherView');
              break;
            case 'student':
              router.push('/studentView');
              break;
            default:
              console.log(currentUser.userType);
              router.push('/adminView'); // Default route or handle unexpected userType
          }
        } else if (state.matches('error')) {
          errorMsg.value = state.context.error || 'Login failed';
          Swal.fire('Error', errorMsg.value, 'error');
        }
      })
      .start();

    const performLogin = () => {
      errorMsg.value = ''; // Clear the error message before attempting login
      if (email.value && password.value && userType.value) {
        service.send({ type: 'LOGIN', data: { email: email.value, password: password.value, userType: userType.value } });
      } else {
        errorMsg.value = 'Please fill all the fields';
        Swal.fire('Error', errorMsg.value, 'error');
      }
    };

    return {
      email,
      password,
      userType,
      errorMsg,
      performLogin,
    };
  },
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
.inputUserType {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>
