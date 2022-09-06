import { gql } from "@apollo/client"

export const SIGN_IN = gql`
  mutation SignIn($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review)  {
      id
      repository {
        ownerName
        fullName
        ratingAverage
        reviewCount
        id
      }
    }
}
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`