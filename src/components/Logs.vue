<template>
  <div>
    <h1>LOGS</h1>
    <ul class="log-list">
      <li v-for="(item, index) in items" :key="index" class="log-item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
  name: 'logs-data',
  data() {
    return {
      items: []
    };
  },
  methods: {
    connectWebSocket() {
      this.socket = io('ws://localhost:3000');

      this.socket.on('connect', () => {
        console.log('Socket.IO connection opened');
      });

      this.socket.on('log-data', (data) => {
        this.items.push(data);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket.IO connection closed');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
      });
    },
  },
  mounted() {
    this.connectWebSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<style scoped>
h1{
  color: #f0f4f8;
  transition: background 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
}

.log-list {
  list-style: none;
  padding: 0;
  margin: 0;
  transition: background 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
}

.log-item {
  background: #ffffff;
  padding: 1em;
  margin-bottom: 0.5em;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
