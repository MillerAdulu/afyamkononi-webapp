<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    hint="a@b.com"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-snackbar v-model="snackbarStatus" multi-line>
      {{ snackbarMessage }}
      <v-btn :color="snackbarColor" text @click="hide">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import jwt from "jsonwebtoken";
import { mapState } from "vuex";
import apiClient from "@/plugins/api";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    loading: false
  }),
  computed: mapState({
    snackbarColor: state => state.snackbarColor,
    snackbarMessage: state => state.snackbarMessage,
    snackbarStatus: state => state.snackbarStatus
  }),
  methods: {
    hide() {
      this.$store.dispatch("setSnackbarStatus", false);
    },
    async login() {
      this.initLoading();

      apiClient
        .post("/auth/sign_in", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.access_token) {
            let token = response.access_token;
            let decoded = jwt.decode(token, { complete: true });

            localStorage.setItem("token", token);
            localStorage.setItem("id", decoded.payload.id);
            localStorage.setItem("govId", decoded.payload.govId);
            localStorage.setItem("name", decoded.payload.name);
            localStorage.setItem("type", decoded.payload.type);

            this.finishLoading();
            this.$store.dispatch("setSnackbarColor", "green");
            this.$store.dispatch("setSnackbarMessage", "Success");
            this.$store.dispatch("setSnackbarStatus", true);

            switch (decoded.payload.type) {
              case "admin":
                this.$router.push({ path: "/admin" });
                break;
              case "registrar":
                this.$router.push({ path: "/kmpdb" });
                break;
              case "healthfacility":
                this.$router.push({ path: "/healthfacility" });
                break;
              default:
                this.$router.push({ path: "/" });
                break;
            }
          }
          console.log(response.error);
          this.$store.dispatch("setSnackbarColor", "red");
          this.$store.dispatch("setSnackbarMessage", response.error);
          this.$store.dispatch("setSnackbarStatus", true);
        });
    },
    initLoading() {
      this.loading = true;
    },
    finishLoading() {
      this.loading = false;
    }
  }
};
</script>