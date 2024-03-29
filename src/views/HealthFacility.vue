<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>

          <v-list-item v-else :key="item.text" @click="goToLink(item)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Afya Mkononi</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        v-model="searchId"
        :loading="searchLoading"
        @keydown.enter="searchPatient"
      ></v-text-field>
      <div class="flex-grow-1"></div>

      <v-btn large class="red" @click="logout">Log Out: {{displayName}}</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Add Patient</v-card-title>
        <v-container>
          <v-row>
            <v-col class="align-center justify-space-between" cols="6">
              <v-row align="center">
                <v-avatar size="40px" class="mr-4">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name" hint="Super Patient" v-model="name"></v-text-field>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-text-field
                type="text"
                prepend-icon="notes"
                v-model="governmentId"
                placeholder="Government ID"
                hint="0000000"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                type="tel"
                prepend-icon="phone"
                v-model="phoneNumber"
                placeholder="254 700 000000"
                hint="254 700 000000"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
                hint="patient@email.com"
                v-model="email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="addPatient" :loading="patientSaving">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-snackbar />
  </v-app>
</template>

<script>
import apiClient from "@/plugins/api";

export default {
  name: "HealthFacility",
  data: () => ({
    dialog: false,
    drawer: true,
    items: [
      { icon: "account_circle", text: "Home", path: "" },
      { icon: "list", text: "Transactions", path: "transactions" }
    ],
    patientSaving: false,
    name: "",
    email: "",
    phoneNumber: "",
    governmentId: "",
    searchId: "",
    searchLoading: false
  }),
  methods: {
    goToLink(item) {
      if (item.path == "healthfacility") return;
      this.$router.push({ path: `/healthfacility/${item.path}` });
    },
    searchPatient() {
      this.searchLoading = true;
      apiClient
        .get(`/accounts/gov_id/${this.searchId}`)
        .then(response => {
          if (response.error) {
            this.$store.commit(`setSnackbar`, {
              msg: `${response.error}`,
              type: `error`
            });
          }
          if (response.data && response.creator) {
            this.$store.dispatch("setPatientResult", response);
            this.$router.push({ path: "/healthfacility/search" });
          }
          this.searchLoading = false;
        })
        .catch(error => {
          this.$store.commit(`setSnackbar`, {
            msg: `${error}`,
            type: `error`
          });
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
    addPatient() {
      this.initLoading();

      apiClient
        .post("/accounts", {
          gov_id: this.governmentId,
          name: this.name,
          email: this.email,
          phone_number: this.phoneNumber,
          password: this.password,
          type: "user"
        })
        .then(response => {
          if (response.success) {
            this.$store.commit(`setSnackbar`, {
              msg: `${response.success}`,
              type: `success`
            });
          } else if (response.error) {
            this.$store.commit(`setSnackbar`, {
              msg: `${response.error}`,
              type: `error`
            });
          }

          this.dialog = false;
          this.finishLoading();
        });
    },
    initLoading() {
      this.patientSaving = true;
    },
    finishLoading() {
      this.patientSaving = false;
    }
  },
  computed: {
    displayName() {
      return localStorage.getItem("name");
    }
  }
};
</script>
