<!-- Comment.vue -->

<template>
    <div class="comment">
      <div class="author">{{ author }}</div>
      <div class="date">{{ formatDate(date_published) }}</div>
      <div class="content">{{ comment_text }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      comment_text: String,
      author: String,
      date_published: String, // Assuming date_published is a string for simplicity
    },
    methods: {
      formatDate(dateString) {
        // Implement date formatting logic if needed
        return dateString;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles here if needed */
  .comment {
    border: 1px solid #2D3250;
    border-radius: 12px;
    padding: 10px;
    margin-bottom: 10px;
  }
  .author {
    font-weight: bold;
  }
  .date {
    font-style: italic;
    font-size: 0.8em;
    color: white;
  }
  
  .content {
    margin-top: 5px;
  }
  </style>
  