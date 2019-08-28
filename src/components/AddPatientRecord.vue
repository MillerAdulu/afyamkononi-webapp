<template>
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">Add HomeSense</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          
          <v-flex xs12>
            <v-text-field placeholder="Patient ID" v-model="patientId"/>
          </v-flex>
          <v-flex xs12>
            <v-textarea prepend-icon="notes" name="Symptoms" hint="Symptoms" persistent-hint v-model="symptoms"></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea prepend-icon="notes" name="Diagnosis" hint="Diagnosis" persistent-hint v-model="diagnosis"></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea prepend-icon="notes" name="Treatment Plan" hint="Treatment Plan" persistent-hint v-model="treatmentPlan"></v-textarea>
          </v-flex>
          <v-flex>
            <v-btn
            :loading="loading"
            block
            color="green white--text"
            @click="addPatientRecord">Add</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'AddPatientRecord',
    data: () => ({
        loading: false,
        patientId: '',
        symptoms: '',
        diagnosis: '',
        treatmentPlan: ''
    }),
    methods: {
        addPatientRecord(){}
    }
}
</script>