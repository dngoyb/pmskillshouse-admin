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
                :rules="inputRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="last_name"
                label="Last Name"
                id="last_name"
                type="text"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="email"
                label="Email"
                id="email"
                type="email"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="password"
                label="Password"
                id="password"
                type="password"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="identity_number"
                label="Identity Number"
                id="identity_number"
                type="text"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                id="phone_number"
                type="tel"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="address"
                label="Address"
                id="address"
                type="text"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="date_of_birth"
                label="Date of Birth"
                id="date_of_birth"
                type="date"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="gender"
                label="Gender"
                id="date_of_birth"
                type="text"
                :rules="inputRules"
              ></v-text-field>
            </v-flex>

            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="adminRegistration">Sign Up</v-btn>
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
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      identity_number: "",
      date_of_birth: "",
      address: "",
      gender: "",

      error: null,
      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"]
    };
  },
  methods: {
    async adminRegistration() {
      try {
        const response = await AuthService.adminRegistration({
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          identity_number: this.identity_number,
          date_of_birth: this.date_of_birth,
          phone_number: this.phone_number,
          gender: this.gender,
          address: this.address
        });
        if (this.$refs.form.validate()) {
          console.table(response);
        }
        console.log(response);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({ name: "signin" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>
