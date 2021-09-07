<template>
  <v-form @submit.prevent="submit">
    <v-card-text>
      <span v-if="action === 'delete'" class="text-subtitle-1">Are you user you want to delete this user?</span>
      <v-container v-else>
        <v-row>
          <v-col cols="12" class="formColumn">
            <v-text-field
              label="Name"
              type="text"
              outlined
              dense
              v-model="userForm.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="formColumn">
            <v-text-field
              label="Username"
              type="text"
              outlined
              dense
              v-model="userForm.username"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="formColumn">
            <v-text-field
              label="Email"
              type="text"
              outlined
              dense
              v-model="userForm.email"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn dark outlined class="actionButton" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn dark color="primary" class="actionButton" type="submit">Confirm</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'UserForm',

  props: ['action', 'user'],

  mounted() {
    this.initializeUser()
  },

  data: () => ({
    userForm: {
      name: '',
      email: '',
      username: ''
    }
  }),

  methods: {
    ...mapMutations(['setSnackbar']),
    ...mapActions('users', ['createUser', 'updateUser', 'deleteUser']),
    initializeUser() {
      if(this.user) {
        Object.keys(this.userForm).map(key => {
          this.userForm[key] = this.user[key]
        })
      }
    },

    async submit() {
      try {
        if(this.action == 'create') {
          this.setSnackbar({ color: 'primary', text: 'Creating user...'})
          await this.createUser(this.userForm)
          this.setSnackbar({ color: 'success', text: 'Created user!'})
        }

        if(this.action == 'update') {
          this.setSnackbar({ color: 'primary', text: 'Updating user...'})
          await this.updateUser({ id: this.user.id, user: this.userForm })
          this.setSnackbar({ color: 'success', text: 'Updated user!'})
        }

        if(this.action == 'delete') {
          this.setSnackbar({ color: 'primary', text: 'Deleting user...'})
          await this.deleteUser(this.user.id)
          this.setSnackbar({ color: 'success', text: 'Deleted user!'})
        }
        this.$emit('submit')
      } catch(err) {
        this.setSnackbar({ color: 'error', text: 'An error has occured. Please try again.' })
      }
    }
  }
}
</script>