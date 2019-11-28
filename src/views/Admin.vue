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
        v-model="search"
        @keypress.enter="searchTransactions"
      ></v-text-field>
      <div class="flex-grow-1"></div>
      
      <v-btn class="red" large @click="logout">
        Log Out: {{displayName}}
      </v-btn>
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
        <v-card-title class="grey darken-2">Add Board</v-card-title>
        <v-container>
          <v-row>
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center">
                <v-avatar size="40px" class="mr-4">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name" v-model="name"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="notes"
                placeholder="Government ID"
                hint="000000"
                v-model="governmentId"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                prepend-icon="mail"
                hint="board@afyamkononi.com"
                placeholder="Email"
                v-model="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="254 700 000000"
                hint="254 700 000000"
                v-model="phoneNumber"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="notes"
                type="password"
                placeholder="Password"
                v-model="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text :loading="boardSaving" @click="addBoard">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-snackbar />
  </v-app>
</template>

<script>
import apiClient from "@/plugins/api";

export default {
  name: "Admin",
  data: () => ({
    search: "",
    drawer: true,
    dialog: false,
    items: [
      { icon: "account_circle", text: "Home", path: "" },
      { icon: "list", text: "Transaction Viewer", path: "transactions" }
    ],
    boardSaving: false,
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    governmentId: ""
  }),
  methods: {
    goToLink(item) {
      this.$router.push({ path: `/admin/${item.path}` });
    },
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
    async addBoard() {
      this.initLoading();

      apiClient
        .post("/accounts", {
          gov_id: this.governmentId,
          name: this.name,
          email: this.email,
          phone_number: this.phoneNumber,
          password: this.password,
          type: "registrar"
        })
        .then(response => {
          if (response.success)
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
      this.boardSaving = true;
    },
    finishLoading() {
      this.boardSaving = false;
    },
    searchTransactions() {}
  },
  computed: {
    displayName () {
      return localStorage.getItem("name");
    },
  }
};
</script>
