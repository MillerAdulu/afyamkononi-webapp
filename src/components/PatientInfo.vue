<template>
  <v-card>
    <v-card-title>
      Patient Records
      <v-spacer />
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />
      <v-spacer />
      <v-btn @click="addrecord" color="primary">Add Record</v-btn>
    </v-card-title>
    <v-data-table :headers="headers" item-key="id" :items="history" :search="search" sort-by="timestamp" sort-desc>
      <template v-slot:item.timestamp="{ item }">{{ formatTime(item.timestamp) }}</template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "PatientInfo",
  data: () => ({
    patientInfo: {},
    history: [],
    search: "",
    headers: [
      {
        text: `Hospital ID`,
        value: `author`
      },
      {
        text: `Attending Doctor`,
        value: `seen_by`
      },
      {
        text: `Symptoms`,
        value: `symptoms`
      },
      {
        text: `Diagnosis`,
        value: `diagnosis`
      },
      {
        text: `Treatment Plan`,
        value: `treatment_plan`
      },
      {
        text: `Updated On`,
        value: `timestamp`
      }
    ]
  }),
  methods: {
    addrecord() {
      this.$router.push({ path: "/healthfacility/new" });
    },
    formatTime(timestamp) {
      return new Date(timestamp * 1000).toDateString();
    },
    setData() {
      const patientData = this.$store.getters.patientResult;
      this.patientInfo = patientData;
      this.history = patientData.data ? patientData.data.medical_data : [];
    }
  },
  created() {
    this.setData();
  }
};
</script>