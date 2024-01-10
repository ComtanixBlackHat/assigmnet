<template>
    <div >
      <form @submit.prevent="registerUser">
      <h2 style="color:#2D3250;">Registration</h2>
        <label for="firstName">First Name:</label>
        <input type="text" v-model="user.first_name" required />
  
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="user.last_name" required />
  
        <label for="email">Email:</label>
        <input type="email" v-model="user.username" required />
  
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" required />
  
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="user.confirmPassword" required />
  
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      };
    },
    methods: {
      async registerUser() {
        if (this.user.password !== this.user.confirmPassword) {
          console.error('Password and Confirm Password do not match');
          // You can show an error message to the user if needed
          return;
        }
  
        try {
            console.log(this.user)
          // Make a POST request using Axios
          const response = await axios.post('http://127.0.0.1:3333/auth/register', this.user);
          console.log('Status Code:', response.status);
                // Check if the registration was successful (adjust the condition based on your server response)
          if (response.status >= 201 ) {
            // Redirect to 'auth/login'
            this.$router.push('/login');
        }
          // Handle the response
          console.log('Registration successful:', response.data);
        } catch (error) {
          // Handle errors
          console.error('Registration failed:', error.message);
        }
      },
    },
  };
  </script>
  
<style>
  /* Add your component styles here */
  input[type=text],input[type=email],input[type=password],textarea{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  }
  form{
      height: 620px;
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
  button{
      margin-top: 50px;
      width: 100%;
      background-color: #2D3250;
      color: white;
      padding: 15px 0;
      font-size: 18px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
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

  /* Style the container */
  

  /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    input[type=submit] {
      width: 100%;
      margin-top: 0;
    }
  }
</style>
  