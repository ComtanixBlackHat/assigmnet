<!-- CreatePost.vue -->
<template>
  <div class="create-post">
    <form @submit.prevent="submitPost">
      <h2 style="color:#2D3250;">Create a New Post</h2>
      <div class="form-group">
        <label for="postContent">Post Text:</label>
        <textarea id="text" v-model="post.text" required></textarea>
      </div>
      <div class="form-group">
        <button type="submit">Create Post</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      post: {
        author: '',
        text: '',
      },
    };
  },
  methods: {
    async submitPost() {
      // Access post.text here
      const postText = this.post.text;
      const url = 'http://localhost:3333/posts';
      const userId = localStorage.getItem('user_id');
      const data = {
        user_id: userId ,
        text: postText ,
      };

      try {
        const response = await axios.post(url, data);
        console.log('POST request successful:', response.data);
        if(response.status === 201)
          alert("Post added sucessfully")
        else
          alert("fail to add post")
      } catch (error) {
        console.error('Error making POST request:', error.response.data);
        alert("fail to add post")
      }
      
      // Clear the post text after submitting, if needed
      this.post.text = '';
    },
  },
};
</script>

<style scoped>
.create-post {
  max-width: 600px;
  margin: 0 auto;
}
form{
  margin-top:10px;
  height:320px;
}
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2D3250;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2D3241;
}
</style>
<!--<template>
    <div>
      <h1>Create Post</h1>
      <form @submit.prevent="submitPost">
        
  
        <label for="text">Post Text:</label>
        <textarea id="text" v-model="post.text" required></textarea>
  
        <button type="submit">Submit Post</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        post: {
          author: '',
          text: '',
        },
      };
    },
    methods: {
      submitPost() {
        // You can add any additional logic here, such as validation
  
        // Emit an event to notify the parent component about the new post
        this.$emit('post-submitted', { ...this.post, date: new Date(), likes: 0, comments: [] });
  
        // Reset the form
        this.post = { author: '', text: '' };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component styles here */
  input[type=text], select, textarea{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
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

  /* Style the container */
  .container {
    border-radius: 5px;
    background-color: white;
    padding: 20px;
  }

  /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .col-25, .col-75, input[type=submit] {
      width: 100%;
      margin-top: 0;
    }
  }
  </style>-->
  