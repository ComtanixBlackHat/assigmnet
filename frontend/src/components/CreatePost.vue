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
