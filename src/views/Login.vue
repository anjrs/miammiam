<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "admin") {
        this.$router.push("/plats"); // Rediriger après connexion réussie
      } else {
        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect";
      }
    },
  },
};
</script>

<template>
  <div class="login-container">
    <h1>Bienvenue sur Miam-Miam Admin</h1>
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="input-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

h1 {
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
}

h2 {
  margin-bottom: 20px;
  color: #555;
  font-size: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  color: #444;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #a3d2ca;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

button:hover {
  background-color: #5eaaa8;
}

.error {
  color: red;
  margin-bottom: 10px;
}
</style>