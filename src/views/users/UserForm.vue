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
              v-model="$v.name.$model"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              :error-messages="nameErrors"
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
              v-model="$v.username.$model"
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
              :error-messages="usernameErrors"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="formColumn">
            <v-text-field
              label="Email"
              type="text"
              outlined
              dense
              v-model="$v.email.$model"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              :error-messages="emailErrors"
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
import { mapState, mapMutations, mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'UserForm',

  props: ['action', 'user'],

  mounted() {
    this.initializeUser()
  },

  data: () => ({
    name: '',
    username: '',
    email: ''
  }),

  validations: {
    name: { 
      required 
    },
    username: { 
      required, 
      minLength: minLength(3),
      usernameExists: (value, vm) => {
        if(vm.action == 'update') {
          return !vm.users.some(user => user.username.toLowerCase() == value.toLowerCase() && user.id != vm.user.id)
        } else {
          return !vm.users.some(user => user.username.toLowerCase() == value.toLowerCase())
        }
      }
    },
    email: { 
      required, 
      email ,
      emailExists: (value, vm) => {
        if(vm.action == 'update') {
          return !vm.users.some(user => user.email.toLowerCase() == value.toLowerCase() && user.id != vm.user.id)
        } else {
          return !vm.users.some(user => user.email.toLowerCase() == value.toLowerCase())
        }
      }
    }
  },

  computed: {
    ...mapState('users', ['users']),

    userForm() {
      let { name, email, username } = this
      return { name, email, username }
    },

    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required.')
      !this.$v.username.minLength && errors.push('Username must have at least 3 characters.')
      !this.$v.username.usernameExists && errors.push('Username is already taken.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required.')
      !this.$v.email.email && errors.push('Email must be valid.')
      !this.$v.email.emailExists && errors.push('Email is already taken.')
      return errors
    }
  },

  methods: {
    ...mapMutations(['setSnackbar']),
    ...mapActions('users', ['createUser', 'updateUser', 'deleteUser']),
    initializeUser() {
      if(this.user) {
        Object.keys(this.user).map(key => {
          this[key] = this.user[key]
        })
      }
    },

    async submit() {
      if(!this.$v.$invalid) {
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
      } else {
        this.$v.$touch()
      }
    }
  }
}
</script>