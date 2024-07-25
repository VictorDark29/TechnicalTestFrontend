<template>
    <div id="app">
      <nav>
        <router-link to="/iot" class="button">IoT</router-link>
        <router-link to="/users" class="button">Users</router-link>
        <router-link to="/logs" class="button">Logs</router-link>
      </nav>
    </div>
  </template>
  
  <script>
  //import UserManagement from './components/UserManagement.vue';
  //import IotData from './components/IotData.vue';
  //import router from './router';
  export default {
    name: 'Home-data',
    components: {
      //UserManagement,
      //IotData
    },
  };
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    margin-top: 60px;
    background: linear-gradient(135deg, #73a5ff, #5477f5);
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  nav {
    background: rgba(255, 255, 255, 0.2);
    padding: 1em 2em;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1em;
    opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
  }
  
  .button {
    font-size: 1.5em;
    color: #fff;
    text-decoration: none;
    padding: 0.75em 1.5em;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    transition: background 0.3s ease, transform 0.3s ease;
    display: inline-block;
    text-align: center;
  }
  
  .button:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
  
  .button:active {
    transform: scale(0.9);
  }
  
  @media (max-width: 600px) {
    .button {
      font-size: 1.2em;
      padding: 0.5em 1em;
    }
  
    nav {
      flex-direction: column;
      gap: 0.5em;
    }
  }
  @keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  </style>
  