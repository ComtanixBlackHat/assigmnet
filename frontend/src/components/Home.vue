
<template>
  <div class="newsfeed">
    <div v-for="post in posts" :key="post.id" class="post">
      <h1 style="color:#2D3250; text-decoration: underline;" @click="detail(post)" >Feed</h1>
      <div class="post-content">
      <div>
          <strong>{{ post.author.first_name }}</strong>
          <span>{{ new Date(post.date).toLocaleString() }}</span>
      </div>
      <p>{{ post.text }}</p>
      </div>
      <div class="post-actions">
        <button @click="toggleLike(post)" :class="{ 'liked': post.isLiked }">
          {{ post.likes }} Likes
        </button>
        <button @click="toggleComment(post)">
          Comment
        </button>
       
      </div>
      <div class="post-comments" v-if="post.showComments">
        <!-- Display comments here -->
        <div v-for="(comment, index) in post.comments" :key="index" class="comment">
          <p>{{ comment.text }}</p>
        </div>
        <!-- Comment input for new comments -->
        <input type="text" placeholder="Write a comment..." v-model="post.newComment" @keyup.enter="addComment(post)">
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const posts = ref([]);

  
    onMounted(async () => {
      try {
      
        const response = await axios.get('http://localhost:3333/posts');
        
        
        posts.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      posts,
    };
  },
  
  methods: {
    async toggleLike(post) {
  post.isLiked = !post.isLiked;
  const userId = localStorage.getItem('user_id');
  const postId = post.id;

  
    try {
      const url = `http://localhost:3333/posts/${postId}/like`;
     const res =  await axios.post(url, {
        user_id: userId,
      });

      
      if(res.status === 201)
        post.likes++;
      else 
      if(res.status === 203)
      {
        const url = `http://localhost:3333/posts/${postId}/like`;
        const res = await axios.delete(url, {
          data: {
            user_id: userId,
          },
        });
        post.likes--;  
      }
    } catch (error) {
      console.error('Error liking the post:', error);
      
      post.isLiked = !post.isLiked;
    }
  
},
    toggleComment(post) {
      post.showComments = !post.showComments;
      
    },
    async addComment(post){
      const commentText = post.newComment;
      
   
      const userId = localStorage.getItem('user_id');
      const url = `http://localhost:3333/posts/${post.id}/comment`;

      try {
        const response = await axios.post(url, {
          user_id: userId,
          text: commentText,
        });

       
        console.log(response.data);

      
        post.newComment = '';
      } catch (error) {
      
        console.error('Error adding comment:', error);
      }
    },
      async detail(post)
      {
        this.$router.push(`/post/${post.id}`);
      }
  }
};
</script>

<style scoped>
/* Add CSS styles to mimic Facebook's layout */
.newsfeed {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.post {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  width: 60%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.user-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.post-time {
  color: #666;
  font-size: 0.8em;
}

.post-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.post-actions button {
  background-color: #2D3250;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.post-actions button.liked {
  background-color: #424769;
  font-weight: bold;
}

.post-comments {
  margin-top: 10px;
}

.comment {
  margin-bottom: 6px;
}

.comment strong {
  font-weight: bold;
}
</style>