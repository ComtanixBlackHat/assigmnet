
<template>
  <div>
    <form @submit.prevent="login">
    <h1 style="color:#2D3250;">Login</h1>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Login</button>
      <div class="signup-link">
        <p>Don't have an account? <router-link to="/register">Sign Up</router-link></p>
      </div>
      <div>{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);

      const user = {
        username: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post('http://127.0.0.1:3333/auth/login', user);
        console.log('Status Code:', response.status);

        // Check if the login was successful (adjust the condition based on your server response)
        if (response.status === 200) {
          console.log(response.data)
          localStorage.setItem('session_token', response.data.token);
          localStorage.setItem('user_id', response.data.user_id);
          // Redirect to '/auth/login'
          this.$router.push('/dashboard');
        }
      } catch (error) {
        console.error('Login error:', error.message);
        // Handle login error
        this.error = 'Invalid credentials';
      }
    },
  },
};
</script>

<style>
  /* Add your component styles here */
  input[type=email],input[type=password]{
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: vertical;
  }
  form{
      height: 400px;
      width: 400px;
      background-color: rgba(255,255,255,0.13);
      position: absolute;
      transform: translate(-50%,-50%);
      top: 50%;
      left: 50%;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255,255,255,0.1);
      box-shadow: 0 0 40px rgba(8,7,16,0.6);
      padding: 50px 35px;
  }
  /* Style the label to display next to the inputs */
  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }
  /* Style the submit button */
  input[type=submit] {
    background-color: #2D3250;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }
.signup-link {
  text-align: center;
  margin-top: 15px;
}
.signup-link a {
  color: #003569;
  text-decoration: none;
  font-weight: bold;
}
</style>
