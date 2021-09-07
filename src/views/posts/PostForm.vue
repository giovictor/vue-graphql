<template>
  <v-form @submit.prevent="submit">
    <v-card-text>
      <span v-if="action === 'delete'" class="text-subtitle-1">Are you user you want to delete this post?</span>
      <v-container v-else>
        <v-row>
          <v-col cols="12" class="formColumn">
            <v-text-field
              label="Title"
              type="text"
              outlined
              dense
              v-model="$v.title.$model"
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
              :error-messages="titleErrors"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Body"
              outlined
              height="180"
              v-model="$v.body.$model"
              @input="$v.body.$touch()"
              @blur="$v.body.$touch()"
              :error-messages="bodyErrors"
            ></v-textarea>
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
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'PostForm',

  props: ['action', 'post'],

  mounted() {
    this.initializePost()
  },

  data: () => ({
    title: '',
    body: ''
  }),

  validations: {
    title: {
      required, 
      maxLength: maxLength(100),
    },
    body: {
      required
    }
  },

  computed: {
    postForm() {
      let { title, body } = this
      return { title, body }
    },

    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push('Title is required.')
      !this.$v.title.maxLength && errors.push('Title should only have to a 100 characters.')
      return errors
    },
    bodyErrors() {
      const errors = []
      if (!this.$v.body.$dirty) return errors
      !this.$v.body.required && errors.push('Body is required.')
      return errors
    }
  },

  methods: {
    ...mapMutations(['setSnackbar']),
    ...mapActions('posts', ['createPost', 'updatePost', 'deletePost']),
    initializePost() {
      if(this.post) {
        Object.keys(this.post).map(key => {
          this[key] = this.post[key]
        })
      }
    },

    async submit() {
      if(!this.$v.$invalid) {
        try {
          if(this.action == 'create') {
            this.setSnackbar({ color: 'primary', text: 'Creating post...'})
            await this.createPost(this.postForm)
            this.setSnackbar({ color: 'success', text: 'Created post!'})
          }

          if(this.action == 'update') {
            this.setSnackbar({ color: 'primary', text: 'Updating post...'})
            await this.updatePost({ id: this.post.id, post: this.postForm })
            this.setSnackbar({ color: 'success', text: 'Updated post!'})
          }

          if(this.action == 'delete') {
            this.setSnackbar({ color: 'primary', text: 'Deleting post...'})
            await this.deletePost(this.post.id)
            this.setSnackbar({ color: 'success', text: 'Deleted post!'})
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