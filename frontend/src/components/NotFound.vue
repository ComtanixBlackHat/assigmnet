<!-- NotFound.vue -->

<template>
  <div class="not-found">
    <div class="error-content">
      <h1>404</h1>
      <h2>Oops! Page not found</h2>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <router-link to="/login">Go to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // You can add any specific logic here if needed
};
</script>

<style scoped>
/* Add CSS styles for the Not Found page */
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
}

.error-content {
  text-align: center;
}

h1 {
  font-size: 6rem;
  margin-bottom: 10px;
  color: #e74c3c;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #666;
}

router-link {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

router-link:hover {
  background-color: #2980b9;
}
</style>
