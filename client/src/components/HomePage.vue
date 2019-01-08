<template>
  <div>
    <v-layout>
      <v-flex xs12 class="mt-4 ml-4 mr-4">
        <trainer-register :trainer="trainer"></trainer-register>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="mt-4 ml-4 mr-4">
        <course-register :course="course"></course-register>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
//import SongService from "@/services/SongService";
import TrainerRegister from "@/components/admin/TrainerRegister";
import CourseRegister from "@/components/admin/CourseRegister";
export default {
  data() {
    return {
      trainer: null,
      course: null
    };
  },
  // async mounted() {
  //   const songId = this.$store.state.route.params.songId;
  //   //this.song = (await SongService.show(songId)).data;
  // },
  components: {
    TrainerRegister,
    CourseRegister
  }
};
</script>
<style scoped>
</style>
