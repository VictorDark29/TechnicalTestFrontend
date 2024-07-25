<template>
  <div class="container">
    <h1>IoT Data</h1>
    <div class="data-container">
      <p>Temperature: <span class="data">{{ temperature }}°C</span></p>
      <p>Humidity: <span class="data">{{ humidity }}%</span></p>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      temperature: null,
      humidity: null,
      socket: null,
    };
  },
  methods: {
    connectWebSocket() {
      this.socket = io('ws://localhost:3000');

      this.socket.on('connect', () => {
        console.log('Socket.IO connection opened');
      });

      this.socket.on('iot-data', (data) => {
        this.temperature = data.temperature;
        this.humidity = data.humidity;
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #73a5ff, #5477f5);
  color: #fff;
  font-family: 'Arial', sans-serif;
  text-align: center;
  transition: background 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
}

h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
}

.data-container {
  background: rgba(255, 255, 255, 0.2);
  padding: 1em 2em;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1.5em;
  margin: 0.5em 0;
}

.data {
  font-weight: bold;
  font-size: 1.5em;
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
