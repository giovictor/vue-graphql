<template>
  <v-snackbar
    v-model="show"
    :color="color"
    right
    dark
  >
    <span class="subtitle-1">{{ text }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        icon
        v-bind="attrs"
        @click="show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',

  created() {
    this.$store.subscribe((mutation, state) => {
      if(mutation.type == 'setSnackbar') {
        this.show = !this.show
        this.text = state.snackbar.text
        this.color = state.snackbar.color
      }
    })
  },

  data: () => ({
    show: false,
    color: "",
    text: ""
  })
}
</script>