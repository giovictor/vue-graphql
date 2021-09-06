import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag'

const apollo = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api'
});

export {
  apollo,
  gql
}
