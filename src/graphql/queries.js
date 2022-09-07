import { gql } from '@apollo/client';
import { REPOSITORY_ITEM_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
      $orderDirection: OrderDirection,
      $orderBy: AllRepositoriesOrderBy,
      $searchKeyword: String
    ){
    repositories(
        orderDirection: $orderDirection,
        orderBy: $orderBy, searchKeyword:
        $searchKeyword
      ){
      edges {
        node {
          ...RepositoryItemDetails
        }
      }
    }
  }
  ${REPOSITORY_ITEM_DETAILS}
`

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryItemDetails
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_ITEM_DETAILS}
`