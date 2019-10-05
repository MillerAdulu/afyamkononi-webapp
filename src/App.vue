<template>
  <v-app>
    <router-view />
    <v-snackbar v-model="snackbarStatus" multi-line>
      {{ snackbarMessage }}
      <v-btn :color="snackbarColor" text @click="hide">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: mapState({
    snackbarColor: state => state.snackbarColor,
    snackbarMessage: state => state.snackbarMessage,
    snackbarStatus: state => state.snackbarStatus
  }),
  methods: {
    hide() {
      this.$store.dispatch("setSnackbarStatus", false);
    }
  }
};
</script>