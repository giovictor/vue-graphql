<template>
  <v-dialog v-model="show" :width="600" @click:outside="$emit('cancel')">
    <v-card>
      <v-toolbar dense dark color="primary">
          <v-toolbar-title class="text-uppercase text-body-2">{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="$emit('cancel')"
          >
            <v-icon small>mdi-close</v-icon>
          </v-btn>
      </v-toolbar>
      <slot v-if="show"></slot>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Modal',

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