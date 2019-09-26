<template>
  <div>
    Wollan!!
    {{ patientInfo }}
    <v-btn @click="addrecord">Add Record</v-btn>
  </div>
</template>

<script>
export default {
  name: "PatientInfo",
  data: () => ({
    patientInfo: {}
  }),
  methods: {
    addrecord() {
      this.$router.push({ path: "/healthfacility/new" });
    }
  },
  created() {
    this.patientInfo = this.$store.getters.patientResult;
  }
};
</script>