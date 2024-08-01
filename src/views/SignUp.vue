<template>
  <section class="container forms">
    <div class="form login">
      <div class="form-content">
        <header>Signup</header>
        <form @submit.prevent="performSignup">
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
            <input type="password" placeholder="Confirm Password" class="password" v-model="confirmPassword" />
          </div>
          <div class="field input-field">
            <select v-model="userType" class="inputUserType">
              <option value="" disabled>Select User Type</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
          <div class="field button-field">
            <button type="submit">Signup</button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { interpret } from 'xstate';
import { appMachine } from '../state/eduMachine'; // Adjust the import path

export default {
  name: 'SignupPage',
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const userType = ref('');
    const errorMsg = ref('');
    const router = useRouter();
    const service = interpret(appMachine)
      .onTransition((state) => {
        if (state.matches('authenticated')) {
          Swal.fire('Success', 'Signup successful', 'success');
          router.push('/login');
        } else if (state.matches('error')) {
          errorMsg.value = state.context.error || 'Signup failed';
          Swal.fire('Error', errorMsg.value, 'error');
        }
      })
      .start();

    const performSignup = () => {
      if (username.value && email.value && password.value && confirmPassword.value && userType.value) {
        if (password.value !== confirmPassword.value) {
          errorMsg.value = "Passwords do not match";
          return;
        }
        service.send({
          type: 'REGISTER',
          data: {
            username: username.value,
            email: email.value,
            password: password.value,
            userType: userType.value
          }
        });
      } else {
        errorMsg.value = "Please fill all the fields";
        Swal.fire('Error', errorMsg.value, 'error');
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      userType,
      errorMsg,
      performSignup,
    };
  },
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
