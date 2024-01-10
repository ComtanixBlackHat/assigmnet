<template>
  <div class="update-post">
    <form @submit.prevent="updatePost">
      <h1 style="color:#2D3250;">Edit Post</h1>
      <div class="form-group">
        <label for="post_text">Text</label>
        <textarea id="post_text" v-model="updatedPost.text" required></textarea>
        <span v-if="errors.text" class="error-message">{{ errors.text }}</span>
      </div>
      <button type="submit" :disabled="isUpdating">Update Post</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      updatedPost: {
        text: ''
      },
      isUpdating: false,
      errors: {
        text: ''
      }
    };
  },
  methods: {
    async updatePost() {
      try {
        this.isUpdating = true;
        
        const postId = this.$route.params.id;
        const response = await axios.patch(`http://localhost:3333/posts/${postId}`, {
          text: this.updatedPost.text
        });

        if (response.status === 200) {
          alert("Post Updated Successfully");
        } else {
          this.errors.text = "Error while updating post";
        }
      } catch (error) {
        console.error('Error updating post:', error);
        this.errors.text = "Error updating post. Please try again.";
      } finally {
        this.isUpdating = false;
      }
    }
  }
};
</script>
  
  <style scoped>
  /* Styles for the update post form */
  .update-post {
    max-width: 600px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  form{
    height:320px;
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
    background-color: #2D3450;
  }
  </style>