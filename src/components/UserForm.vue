<template>
  <div>
    <h2>{{ isEditMode ? 'Editar Usuario' : 'Crear Usuario' }}</h2>
    <form @submit.prevent="onSubmit" class="user-form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="user.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" required />
      </div>
      <button type="submit" class="button">{{ isEditMode ? 'Actualizar' : 'Crear' }}</button>
      <button type="button" @click="onReset" class="button cancel">Cancelar</button>
      <button v-if="isEditMode" type="button" @click="onDelete" class="button delete">Eliminar</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    userData: Object,
  },
  data() {
    return {
      user: {
        id: null,
        name: '',
        email: '',
      },
      isEditMode: false,
    };
  },
  watch: {
    userData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.user = { ...newVal };
          this.isEditMode = true;
        } else {
          this.resetForm();
          this.isEditMode = false;
        }
      },
    },
  },
  methods: {
    onSubmit() {
      if (this.isEditMode) {
        this.$emit('update-user', this.user);
      } else {
        this.$emit('create-user', this.user);
      }
      this.resetForm();
    },
    onReset() {
      this.resetForm();
      this.$emit('reset-form');
    },
    onDelete() {
      this.$emit('delete-user', this.user.id);
      this.resetForm();
    },
    resetForm() {
      this.user = {
        id: null,
        name: '',
        email: '',
      };
      this.isEditMode = false;
    },
  },
};
</script>

<style scoped>
.user-form {
  background: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-form:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #5477f5;
  box-shadow: 0 0 5px rgba(84, 119, 245, 0.5);
}

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
  margin-top: 1em;
}

.button:hover {
  background: linear-gradient(135deg, #5477f5, #3a55c5);
  transform: scale(1.05);
}

.button:active {
  transform: scale(0.95);
}

.cancel {
  background: #ff7373;
  margin-left: 1em;
}

.cancel:hover {
  background: #ff4c4c;
}

.delete {
  background: #ff0000;
  margin-left: 1em;
}

.delete:hover {
  background: #cc0000;
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
