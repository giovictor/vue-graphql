<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      app
      dark
      clipped
      v-model="drawer"
    >
      <v-list>
        <v-list-item v-for="page in pages" :key="page.title" link :to="page.to">
          <v-list-item-icon>
            <v-icon>{{page.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{page.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
      <snackbar></snackbar>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    Snackbar: () => import("./components/Snackbar")
  },

  data: () => ({
    drawer: true,
    pages: [
      {
        title: 'Users',
        icon: 'mdi-account-group',
        to: '/users'
      },
      {
        title: 'Posts',
        icon: 'mdi-post',
        to: '/posts'
      }
    ]
  })
};
</script>
