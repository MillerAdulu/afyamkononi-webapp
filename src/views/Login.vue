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
                  <v-text-field label="Login" name="login" type="text" v-model="email"></v-text-field>

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
  </v-app>
</template>

<script>
import jwt from "jsonwebtoken";
import apiClient from "@/plugins/api";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    loading: false
  }),
  methods: {
    async login() {
      this.initLoading();

      try {
        const response = await apiClient.post("/accounts/sign_in", {
          email: this.email,
          password: this.password
        });
        let token = response.data.access_token;
        let decoded = jwt.decode(token, { complete: true });

        localStorage.setItem("token", token);
        localStorage.setItem("id", decoded.payload.id);
        localStorage.setItem("name", decoded.payload.name);
        localStorage.setItem("type", decoded.payload.type);

        switch (decoded.payload.type) {
          case "admin":
            this.$router.push({ path: "/admin" });
            break;
          case "registrar":
            this.$router.push({ path: "/kmpdu" });
            break;
          case "healthfacility":
            this.$router.push({ path: "/healthfacility" });
            break;

          default:
            break;
        }
      } catch (_) {
        this.finishLoading();
      } finally {
        this.finishLoading();
      }
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