<template>
    <v-layout column>
        <v-flex xs6 offset="xs3" class="mt-4">
            <panel title="Trainer Registration">
                <v-btn
                    slot="action"
                    fab
                    medium
                    right
                    absolute
                    middle
                    class="green"
                    @click="navigateTo({name: 'trainer-registration'})"
                >
                    <v-icon>add</v-icon>
                </v-btn>

                <div class="trainer" v-for="trainer in trainers" :key="trainer.user_id">
                    <v-layout>
                        <v-flex xs6>
                            <div>{{trainer.firstNme}}</div>
                            <div>{{trainer.lastName}}</div>
                            <div>{{trainer.email}}</div>
                            <v-btn
                                class="cyan"
                                dark
                                @click="navigateTo({name: 'trainer', params: {trainerId: trainer.user_id}})"
                            >view</v-btn>
                        </v-flex>
                        <!-- <v-flex xs6>
                            <img class="album-image" :src="song.albumImage">
                        </v-flex> -->
                    </v-layout>
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>
<script>
import Panel from "@/components/Panel";
import AuthService from "@/services/AuthService";
export default {
    components: {
        Panel
    },
    data() {
        return {
            trainers: null
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    },
    async mounted() {
        this.trainers = (await AuthService.getAllTrainers()).data;
    }
};
</script>
<style scoped>

</style>
