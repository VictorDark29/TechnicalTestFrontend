<template>
  <div class="user-management">
    <div class="user-list">
      <UserList :users="users" @edit-user="editUser" @create-user="createUser" />
    </div>
    <div class="user-form">
      <UserForm :userData="selectedUser" @create-user="createUserHandler" @update-user="updateUserHandler" @delete-user="deleteUserHandler" @reset-form="resetForm" />
    </div>
  </div>
</template>

<script>
import UserList from './UserList.vue';
import UserForm from './UserForm.vue';

export default {
  components: {
    UserList,
    UserForm,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    editUser(user) {
      this.selectedUser = user;
    },
    createUser() {
      this.selectedUser = null;
    },
    async createUserHandler(user) {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const newUser = await response.json();
        this.users.push(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    async updateUserHandler(user) {
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const updatedUser = await response.json();
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        this.$set(this.users, index, updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
      this.fetchUsers();
    },
    async deleteUserHandler(userId) {
      try {
        await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'DELETE',
        });
        this.users = this.users.filter(user => user.id !== userId);
        this.resetForm();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    resetForm() {
      this.selectedUser = null;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.user-management {
  display: flex;
  justify-content: space-between;
  padding: 2em;
  background: #f0f4f8;
  border-radius: 5px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
}

.user-list, .user-form {
  width: 45%;
  background: #ffffff;
  padding: 1.5em;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.user-form {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-form:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

button {
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

button:hover {
  background: linear-gradient(135deg, #5477f5, #3a55c5);
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

input, textarea {
  width: 100%;
  padding: 0.75em;
  margin: 0.5em 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #5477f5;
  box-shadow: 0 0 5px rgba(84, 119, 245, 0.5);
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
