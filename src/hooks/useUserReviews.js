import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useUserReviews = (variables) => {
  const { data, loading, refetch, ...result } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const fetchReviews = async () => {
    await refetch({ GET_ME });
  }

  return {
    reviews: data?.me.reviews,
    loading,
    refetch: fetchReviews,
    ...result,
  }
}

export default useUserReviews;