import { gql } from '@apollo/client'

export const REPOSITORY_ITEM_DETAILS = gql`
  fragment RepositoryItemDetails on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    url
  }
`