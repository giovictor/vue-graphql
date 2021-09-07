<template>
  <v-app>
    <v-app-bar
      app
      color="#1B1B1B"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{$route.name}}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      app
      dark
      color="#1B1B1B"
      v-model="drawer"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            VueGraphQL
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon>mdi-vuejs</v-icon> + <v-icon>mdi-graphql</v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-2" />

      <v-list nav>
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

<style>
  body, main {
    background-color: #111111;
  }
</style>
