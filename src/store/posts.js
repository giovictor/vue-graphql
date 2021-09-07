import { apollo, gql } from '../apollo'

const state = {
  posts: [],
  isLoading: false,
  fragment: gql`
    fragment post on Post {
      id
      title
      body
    }
  `
}

const getters = {
  posts: (state) => {
    return [...state.posts].reverse()
  }
}

const mutations = {
  setPosts: (state, posts) => {
    state.posts = posts
  },
  setIsLoading: (state, isLoading) => {
    state.isLoading = isLoading
  },
  createPost: (state, newPost) => {
    state.posts.push(newPost)
  },
  updatePost: (state, { id, updatedPost }) => {
    state.posts.map(post => {
      if(post.id === id) {
        post.title = updatedPost.title
        post.body = updatedPost.body
      }
    })
  },
  deletePost: (state, postId) => {
    state.posts = state.posts.filter(post => post.id != postId)
  }
}

const actions = {
  getPosts({ state, commit }) {
    commit('setIsLoading', true)
    apollo.query({
      query: gql`
        query GetPosts {
          posts {
            data {
              ...post
            }
          }
        }
        ${state.fragment}
      `
    })
    .then(response => {
      commit('setPosts', response.data.posts.data)
      commit('setIsLoading', false)
    })
    .catch(err => {
      console.log(err)
    })
  },
  createPost({ state, commit }, post) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: gql`
          mutation CreatePost($input: CreatePostInput!) {
            createPost(input: $input) {
              ...post
            }
          }
          ${state.fragment}
        `,
        variables: { 
          input: { ...post }
        }
      })
      .then(response => {
        resolve()
        commit('createPost', response.data.createPost)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  updatePost({ state, commit }, { id, post }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: gql`
          mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
            updatePost(id: $id, input: $input) {
              ...post
            }
          }
          ${state.fragment}
        `,
        variables: { 
          id: id,
          input: { ...post }
        }
      })
      .then(response => {
        resolve()
        commit('updatePost', { id: id, updatedPost: response.data.updatePost })
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  deletePost({ commit }, id) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: gql`
          mutation DeletePost($id: ID!) {
            deletePost(id: $id)
          }
        `,
        variables: { 
          id: id
        }
      })
      .then(response => {
        if(response.data.deletePost) {
          resolve()
          commit('deletePost', id)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}