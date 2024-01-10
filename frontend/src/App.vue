
<template>
  <div>
    <router-link class="item" to="/dashboard">Home</router-link>
    <router-link class="item" to="/addpost">Create Post</router-link>
    <router-link class="item" to="/mypost">My Posts</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import TodoList from './components/TodoList.vue';
import CommentList from './components/CommentList.vue';
export default {
  

  components: {
  
    login: Login,
    'todo-list': TodoList,
    'comment-list': CommentList,
  },
};
</script>

<style>
/* Add styles here if needed */

.item {
  background-color: #2D3250;
  color:white;
  text-decoration: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.item:hover {
  background-color: #2D3250;
}

.active {
  background-color: #555;
}
</style>
