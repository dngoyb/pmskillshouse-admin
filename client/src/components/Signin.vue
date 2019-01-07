<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center" mt-5>
                <h1>Sign In</h1>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 mt-3>
                <form>
                    <v-layout column>
                        <v-flex>
                            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex class="text-xs-center" mt-5>
                            <v-btn color="primary" @click="signin">Sign In</v-btn>
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
            error: null
        };
    },
    methods: {
        async signin() {
            try {
                const response = await AuthService.signin({
                    email: this.email,
                    password: this.password
                });
                console.log(response);
                this.$store.dispatch("setToken", response.data.token);
                this.$store.dispatch("setUser", response.data.user);
                if (response.data.error == 0) {
                    this.$router.push({ name: "home-page" });
                }
            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    }
};
</script>
