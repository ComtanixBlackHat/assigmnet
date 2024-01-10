<!-- TodoList.vue -->

<template>
  <div class="todo-app">
    <nav>
      <ul>
        <li v-for="(navItem, index) in navigation" :key="index" @click="changeTab(navItem)">
          {{ navItem }}
        </li>
      </ul>
    </nav>
    <div v-if="selectedTab === 'Todo'" class="todo-list">
      <h2>Todo List</h2>
      <form @submit.prevent="addItem">
        <input type="text" v-model="newItem" placeholder="Add a new item" required>
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <span>{{ todo }}</span>
          <button @click="removeItem(index)">Remove</button>
        </li>
      </ul>
    </div>
    <div v-if="selectedTab === 'Completed'" class="completed-list">
      <h2>Completed Items</h2>
      <ul>
        <li v-for="(completed, index) in completedItems" :key="index">
          <span>{{ completed }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
      todos: [],
      completedItems: [],
      navigation: ['Todo', 'Completed'],
      selectedTab: 'Todo'
    };
  },
  methods: {
    addItem() {
      if (this.newItem.trim() !== '') {
        this.todos.push(this.newItem.trim());
        this.newItem = '';
      }
    },
    removeItem(index) {
      this.completedItems.push(this.todos[index]);
      this.todos.splice(index, 1);
    },
    changeTab(tab) {
      this.selectedTab = tab;
    }
  }
};
</script>

<style scoped>

.todo-app {
  max-width: 600px;
  margin: 0 auto;
}

nav {
  background-color: #f0f0f0;
  padding: 10px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

nav ul li {
  cursor: pointer;
}

.todo-list,
.completed-list {
  display: none;
}

.todo-list h2,
.completed-list h2 {
  margin-bottom: 10px;
}

.todo-list form {
  margin-bottom: 20px;
}

.todo-list form input[type="text"] {
  padding: 8px;
  width: 60%;
  margin-right: 10px;
}

.todo-list form button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list form button:hover {
  background-color: #2980b9;
}

.todo-list ul li,
.completed-list ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.completed-list {
  display: none;
}
</style>
