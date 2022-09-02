import { gql } from '@apollo/client';
import { REPOSITORY_ITEM_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryItemDetails
        }
      }
    }
  }
  ${REPOSITORY_ITEM_DETAILS}
`