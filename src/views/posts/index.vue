<template>
  <v-container>
    <v-toolbar dark flat>
      <v-spacer></v-spacer>
      <v-btn dark small class="ml-3 mt-2" depressed elevation="2" color="primary" @click="setAction('create')">
        <v-icon left>mdi-plus</v-icon>
        <span class="caption">Create Post</span>
      </v-btn>
    </v-toolbar>

    <v-divider dark></v-divider>

    <v-data-table
      dark
      :headers="headers"
      :items="posts"
      :loading="isLoading"
      loading-text="Loading Posts"
      show-expand
      single-expand
    >
      <template v-slot:[`item.excerpt`]="{ item }">
        {{ item.body.slice(0, 30) }}
        <span v-if="item.body.length > 30">...</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon @click="setAction('update', item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="setAction('delete', item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td class="pa-6" :colspan="headers.length">
          {{ item.body }}
        </td>
      </template>
    </v-data-table>
    <modal :title="`${action} post`" @cancel="clearFields">
      <post-form :action="action" :post="post" @cancel="clearFields" @submit="clearFields"></post-form>
    </modal>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Posts',

  components: {
    Modal: () => import('../../components/Modal'),
    PostForm: () => import('./PostForm')
  },

  mounted() {
    this.getPosts()
  },

  data: () => ({
    headers: [
      { text: '', value: 'data-table-expand' },
      { text: 'Title', value: 'title' },
      { text: 'Excerpt', value: 'excerpt' },
      { text: '', value: 'actions' },
    ],
    action: null,
    post: null
  }),

  computed: {
    ...mapState('posts', ['isLoading']),
    ...mapGetters('posts', ['posts']),
  },

  methods: {
    ...mapMutations(['showModal']),
    ...mapMutations('posts', ['setPosts']),
    ...mapActions('posts', ['getPosts']),
    setAction(action, post) {
      this.action = action
      this.showModal(true)

      if(post) {
        this.post = post
      }
    },
    clearFields() {
      this.showModal(false)
      this.action = null
      this.post = null
    }
  },

  beforeRouteLeave(to, from, next) {
    this.setPosts([])
    next()
  }
}
</script>