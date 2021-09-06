<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Users</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark small class="ml-3 mt-2" depressed elevation="2" color="primary" @click="setAction('create')">
        <v-icon left>mdi-plus</v-icon>
        <span class="caption">Create User</span>
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="isLoading"
      :loading-text="loadingText"
      item-key="username"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon @click="setAction('update', item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="setAction('delete', item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <modal :title="`${action} user`" @cancel="cancel">
      <user-form :action="action" :user="user" @cancel="cancel"></user-form>
    </modal>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Users',

  components: {
    Modal: () => import('../../components/Modal'),
    UserForm: () => import('./UserForm')
  },

  mounted() {
    this.getUsers()
  },

  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Username', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Website', value: 'website' },
      { text: '', value: 'actions' },
    ],
    action: null,
    user: null
  }),

  computed: {
    ...mapState('users', ['users', 'isLoading', 'loadingText'])  
  },

  methods: {
    ...mapMutations(['showModal']),
    ...mapActions('users', ['getUsers']),
    setAction(action, user) {
      this.action = action
      this.showModal(true)

      if(user) {
        this.user = user
      }
    },
    cancel() {
      this.showModal(false)
      this.action = null
      this.user = null
    }
  }
}
</script>