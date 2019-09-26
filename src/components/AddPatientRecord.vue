<template>
  <v-card>
    <v-card-title class="grey lighten-4 py-4 title">Add Patient Record</v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <!-- <v-flex xs12>
          <v-text-field placeholder="Patient ID" v-model="patientId" />
        </v-flex>-->
        <v-flex xs12>
          <v-textarea
            prepend-icon="notes"
            name="Symptoms"
            hint="Symptoms"
            persistent-hint
            v-model="symptoms"
          ></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            prepend-icon="notes"
            name="Diagnosis"
            hint="Diagnosis"
            persistent-hint
            v-model="diagnosis"
          ></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            prepend-icon="notes"
            name="Treatment Plan"
            hint="Treatment Plan"
            persistent-hint
            v-model="treatmentPlan"
          ></v-textarea>
        </v-flex>
        <v-flex x12>
          <v-text-field
            prepend-icon="notes"
            label="Seen By"
            name="seen_by"
            hint="Dr. Adulu"
            type="text"
            v-model="seenBy"
          ></v-text-field>
        </v-flex>
        <v-flex x12>
          <v-btn :loading="loading" block color="green white--text" @click="addPatientRecord">Add</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import apiClient from "@/plugins/api";
export default {
  name: "AddPatientRecord",
  data: () => ({
    loading: false,
    symptoms: "",
    diagnosis: "",
    treatmentPlan: "",
    seenBy: "",
    governmentId: ""
  }),
  methods: {
    async addPatientRecord() {
      this.initLoading();

      apiClient
        .patch(`/records/${this.governmentId}`, {
          symptoms: this.symptoms,
          diagnosis: this.diagnosis,
          treatment_plan: this.treatmentPlan,
          seen_by: this.seenBy
        })
        .then(response => {
          if (response.success) {
            console.log("Success Papi");
            this.symptoms = "";
            this.diagnosis = "";
            this.treatmentPlan = "";
            this.seenBy = "";
          } else console.log("No success Papi!");

          this.finishLoading();
        });
    },
    initLoading() {
      this.loading = true;
    },
    finishLoading() {
      this.loading = false;
    }
  },
  created() {
    this.governmentId = this.$store.getters.patientResult.data.gov_id;
  }
};
</script>