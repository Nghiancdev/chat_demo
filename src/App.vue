<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="customer_id">Customer ID:</label>
        <input
          type="text"
          id="customer_id"
          v-model="form.customer_id"
          placeholder="Enter Customer ID"
        />
      </div>
      <div class="form-group">
        <label for="full_name">Full Name:</label>
        <input
          type="text"
          id="full_name"
          v-model="form.full_name"
          placeholder="Enter Full Name"
        />
      </div>
      <div class="form-group">
        <label for="avatar">Avatar:</label>
        <input
          type="text"
          id="avatar"
          v-model="form.avatar"
          placeholder="Enter avatar url"
        />
      </div>
      <div class="form-group">
        <label for="user_role">User Role:</label>
        <input
          type="text"
          id="user_role"
          v-model="form.user_role"
          placeholder="Enter User Role"
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Enter Email"
        />
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>

    <!-- Chỉ hiển thị khi submitted và truyền dữ liệu từ submittedData -->
    <ChatPopup v-if="submitted" :key="componentKey"></ChatPopup>

    <SyncUser
      v-if="submitted"
      :customer_id="submittedData.customer_id"
      :full_name="submittedData.full_name"
      :user_role="submittedData.user_role"
      :email="submittedData.email"
      :user_avatar="submittedData.avatar"
    ></SyncUser>
  </div>
</template>

<script>
import { ChatPopup, SyncUser } from "ikigroup-chat";
import "ikigroup-chat/dist/MyLibrary.css";
import { initializeSocket, getAuthCode } from "ikigroup-chat";

export default {
  name: "App",
  components: {
    ChatPopup,
    SyncUser,
  },
  data() {
    return {
      form: {
        customer_id: "",
        full_name: "",
        avatar: "",
        user_role: "",
        email: "",
      },
      submitted: false,
      componentKey: 0,
      submittedData: {
        customer_id: "",
        full_name: "",
        avatar: "",
        user_role: "",
        email: "",
      },
    };
  },
  methods: {
    submitForm() {
      // Sao chép dữ liệu form vào submittedData
      this.submittedData = { ...this.form };
      this.submitted = true;
      console.log("Form submitted", this.submittedData);

      setTimeout(() => {
        this.componentKey += 1;
        const userString = getAuthCode();
        console.log("userString", userString);
        if (userString) {
          initializeSocket(userString);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
