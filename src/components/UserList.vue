<template>
  <div>
    <button @click="onCreate" class="button">Crear Usuario</button>
    <ul>
      <li v-for="user in users" :key="user.id" @click="onEdit(user)" class="user-item">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  },
  methods: {
    onEdit(user) {
      this.$emit('edit-user', user);
    },
    onCreate() {
      this.$emit('create-user');
    },
  },
};
</script>

<style scoped>
.button {
  background: linear-gradient(135deg, #73a5ff, #5477f5);
  color: #fff;
  font-size: 1em;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  display: inline-block;
  margin-bottom: 1em;
}

.button:hover {
  background: linear-gradient(135deg, #5477f5, #3a55c5);
  transform: scale(1.05);
}

.button:active {
  transform: scale(0.95);
}

ul {
  list-style: none;
  padding: 0;
}

.user-item {
  background: #fff;
  padding: 1em;
  margin-bottom: 0.5em;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
}

.user-item:hover {
  background: #f0f4f8;
  transform: scale(1.02);
}

.user-item:active {
  transform: scale(0.98);
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
