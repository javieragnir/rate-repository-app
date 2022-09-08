import { gql } from '@apollo/client';
import { REPOSITORY_ITEM_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
      $orderDirection: OrderDirection,
      $orderBy: AllRepositoriesOrderBy,
      $searchKeyword: String,
      $after: String,
      $first: Int
    ){
    repositories(
        orderDirection: $orderDirection,
        orderBy: $orderBy,
        searchKeyword: $searchKeyword,
        after: $after,
        first: $first
      ){
      edges {
        node {
          ...RepositoryItemDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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

/* export const GET_REPOSITORY = gql`
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
` */

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $after: String, $first: Int) {
    repository(id: $id) {
      ...RepositoryItemDetails
      reviews(after: $after, first: $first) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            repositoryId
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