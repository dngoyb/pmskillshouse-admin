<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="first_name"
                label="First Name"
                id="first_name"
                type="text"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="last_name"
                label="Last Name"
                id="last_name"
                type="text"
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field v-model="email" label="Email" id="email" type="email" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="password"
                label="Password"
                id="password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
            <!-- <v-flex>
              <v-text-field
                v-model="identity_number"
                label="Identity Number"
                id="identity_number"
                type="text"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                id="phone_number"
                type="number"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="address" label="Address" id="address" type="text" required></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="date_of_birth"
                label="Date of Birth"
                id="date_of_birth"
                type="date"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-select :items="gender" label="Gender" v-model="gender"></v-select>
            </v-flex>
            <v-flex>
              <v-select :items="role" label="Role" v-model="role"></v-select>
            </v-flex>-->
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="register">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  data() {
    return {
      // gender: ["Male", "Female", "Other"],
      // role: ["Admin", "Trainer"],
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthService.register({
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name
        });
        console.log(response);

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
    // async register() {
    //   const response = await AuthService.register({
    //     email: this.email,
    //     password: this.password
    //   });
    //   console.log(response);
    // }
  }
};
</script>
