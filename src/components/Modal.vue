<template>
  <v-dialog v-model="show" :width="600">
    <v-card>
      <v-toolbar dense dark color="primary">
          <v-toolbar-title class="text-uppercase subtitle-1">{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="showModal(false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-form @submit.prevent="$emit('submit')">
        <slot v-if="show"></slot>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark class="red darken-2" @click="showModal(false)">Cancel</v-btn>
          <v-btn type="submit" dark class="success">Confirm</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['title'],
  computed: {
    ...mapState(['modal']),
    show: {
      get() {
        return this.modal
      },
      set(value) {
        this.showModal(value)
      }
    }
  },
  methods: {
    ...mapMutations(['showModal'])
  }
}
</script>