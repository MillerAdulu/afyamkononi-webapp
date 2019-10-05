<template>
  <v-card>
    <v-card-title>
      Account Transactions
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-card-text>
      <p>Query Hash: {{ responseHash }}</p>
      <p>Blockchain Results: {{ pageSize }}</p>
      <p>Table Size: {{ transactions.length }}</p>
    </v-card-text>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :loading="loading"
      :search="search"
      class="elevation-1"
      sort-by="timestamp"
      sort-desc
    >
      <template v-slot:item.created_time="{ item }">{{ formatTime(item.created_time) }}</template>
      <template v-slot:item.data="{ item }">{{ formatPayload(item.action, item.data) }}</template>
      <template v-slot:item.signatures="{ item }">{{ item.signatures.length }}</template>
    </v-data-table>
  </v-card>
</template>

<script>
import apiClient from "@/plugins/api";

export default {
  name: "AccountTransactions",
  data: () => ({
    search: "",
    loading: true,
    headers: [
      { text: "Creator", value: "creator_account_id" },
      { text: "Action", value: "action" },
      { text: "Created Time", value: "created_time" },
      { text: "Payload", value: "data" },
      { text: "Signatures", value: "signatures" },
      { text: "Quorum", value: "quorum" }
    ],
    loading: false,
    transactions: [],
    responseHash: "",
    pageSize: 0
  }),
  methods: {
    fetchMyTransactions() {
      this.loading = true;
      let accountId = localStorage.getItem("govId");
      apiClient.get(`/transactions/${accountId}`).then(response => {
        if (response.data.error_response)
          console.log(response.error_response.message);

        if (response.data.transactions_page_response) {
          this.responseHash = response.data.query_hash;
          this.pageSize =
            response.data.transactions_page_response.all_transactions_size;
          this.transactions =
            response.data.transactions_page_response.transactions;
        }

        this.loading = false;
      });
    },
    formatTime(timestamp) {
      return new Date(timestamp * 1000).toDateString();
    },
    formatPayload(action, payload) {
      switch (action) {
        case "grant_permission":
          return {
            accountId: payload.account_id,
            permission: payload.permission
          };
          break;
        case "create_account":
          return {
            accountName: payload.account_name,
            domainId: payload.domain_id
          };
          break;

        case "set_account_detail":
          return {
            accountId: payload.account_id,
            key: payload.key,
            value: payload.value
          };
        case "revoke_permission":
          return {
            accountId: payload.account_id,
            permission: payload.permission
          };
          break;
        case "append_role":
          return {
            accountId: payload.account_id,
            permission: payload.role_name
          };
          break;

        default:
          return {};
          break;
      }
    }
  },
  created() {
    this.fetchMyTransactions();
  }
};
</script>