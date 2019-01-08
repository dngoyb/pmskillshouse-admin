<template>
  <panel title="Course Registration">
    <v-layout>
      <v-flex xs6>
        <v-dialog max-width="600px">
          <v-btn flat slot="activator" class="orange accent-1">Add a new Course</v-btn>
          <v-card>
            <v-card-title>
              <h2>Add a new Course</h2>
            </v-card-title>
            <v-card-text>
              <v-form class="px-3" ref="form">
                <v-layout column>
                  <v-flex>
                    <v-text-field
                      v-model="courseName"
                      label="Course Name"
                      type="text"
                      :rules="inputRules"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-textarea
                      v-model="courseDescription"
                      label="Course descrption"
                      type="text"
                      :rules="inputRules"
                    ></v-textarea>
                  </v-flex>
                  <v-flex class="text-xs-center" mt-5>
                    <v-btn color="primary" @click=" addCourse">Add</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import Panel from "@/components/Panel";
export default {
  data() {
    return {
      courseName: "",
      courseDescription: "",
      error: null,
      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"]
    };
  },
  methods: {
    async  addCourse() {
      try {
        const response = await AuthService.addCourse({
          courseName: this.courseName,
          courseDescription: this.courseDescription
        });
        if (this.$refs.form.validate()) {
          console.table(response);
        }
        console.log(response);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({ name: "home-page" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  props: ["course"],
  components: {
    Panel
  }
};
</script>

<style scoped>
</style>



