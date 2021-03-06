import { apollo, gql } from '../apollo'

const state = {
  users: [],
  isLoading: false,
  fragment: gql`
    fragment user on User {
      id 
      name
      username
      email
    }
  `
}

const getters = {
  users: (state) => {
    return [...state.users].reverse()
  }
}

const mutations = {
  setUsers: (state, users) => {
    state.users = users
  },
  setIsLoading: (state, isLoading) => {
    state.isLoading = isLoading
  },
  createUser: (state, newUser) => {
    state.users.push(newUser)
  },
  updateUser: (state, { id, updatedUser }) => {
    state.users.map(user => {
      if(user.id === id) {
        user.name = updatedUser.name
        user.username = updatedUser.username
        user.email = updatedUser.email
      }
    })
  },
  deleteUser: (state, userId) => {
    state.users = state.users.filter(user => user.id != userId)
  }
}

const actions = {
  getUsers({ state, commit }) {
    commit('setIsLoading', true)
    apollo.query({
      query: gql`
        query GetUsers {
          users {
            data {
              ...user
            }
          }
        }
        ${state.fragment}
      `
    })
    .then(response => {
      commit('setUsers', response.data.users.data)
      commit('setIsLoading', false)
    })
    .catch(err => {
      console.log(err)
    })
  },
  createUser({ state, commit}, user) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: gql`
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              ...user
            }
          }
          ${state.fragment}
        `,
        variables: {
          input: { ...user }
        }
      })
      .then(response => {
        resolve()
        commit('createUser', response.data.createUser)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  updateUser({ state, commit}, { id, user }) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: gql`
          mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
            updateUser(id: $id, input: $input) {
              ...user
            }
          }
          ${state.fragment}
        `,
        variables: {
          id: id,
          input: { ...user }
        }
      })
      .then(response => {
        resolve()
        commit('updateUser', { id: id, updatedUser: response.data.updateUser })
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  deleteUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      apollo.mutate({
        mutation: gql`
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id)
          }
        `,
        variables: { 
          id: id
        }
      })
      .then(response => {
        if(response.data.deleteUser) {
          resolve()
          commit('deleteUser', id)
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