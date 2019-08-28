<template>
<v-card>
    <v-card-title>
      Health Facilities
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
  :headers="headers"
  :items="homeowners"
  :loading="loading"
  :search="search"
  class="elevation-1">
    <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
    <template v-slot:items="props">
      <td class="text-xs-center">{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.location }}</td>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
export default {
    name: 'HealthFacilities',
    data: () => ({
        search: '',
      loading: true,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Location', value: 'location'}
      ],
      homeowners: [],
    }),
}
</script>