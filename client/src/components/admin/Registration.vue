<template>
    <panel title="Trainer Registration" class="mt-4">
        <v-layout>
            <v-flex xs12>
                <v-form class="px-3" ref="form">
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
                                type="phone"
                                :rules="inputRules"
                            ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="address"
                                label="Address"
                                id="address"
                                type="text"
                                required
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
                            <v-btn color="primary" @click="trainerRegistration">Register</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </panel>
</template>

<script>
import Panel from "@/components/Panel";
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
        async trainerRegistration() {
            try {
                const response = await AuthService.trainerRegistration({
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
                this.$router.push({ name: "trainer" });
            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    },
    props: ["trainer"],
    components: {
        Panel
    }
};
</script>
<style scoped>
</style>
