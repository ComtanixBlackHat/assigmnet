<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
<!-- <template>
  <div>
    <h1>{{ message }}</h1>
    <p>Counter: {{ counter }}</p>
    <button @click="increment">Increment</button>
    <p v-if="counter >= 5">Counter reached 5!</p>
    <p v-else>Counter below 5</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
      counter: 0,
    };
  },
  created() {
    console.log('Component has been created.');
  },
  methods: {
    increment() {
      this.counter++;
    },
  },
};
</script>

<style>
/* Add styles here if needed */
</style> -->
<!-- <template>
  <div>
    <h1>Welcome to My App</h1>
    <login></login>
    <todo-list></todo-list>
    <comment-list></comment-list>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import TodoList from './components/TodoList.vue';
import CommentList from './components/CommentList.vue';


createApp(App).use(router).mount('#app');

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
</style> -->
<!-- src/App.vue -->
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
