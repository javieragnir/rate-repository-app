import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {

  const { data, loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      }
    })
  };

  // data.repositories has to exist

  const fetchRepositories = async () => {
    await refetch({ GET_REPOSITORIES });
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch: fetchRepositories,
    ...result,
  };
};

export default useRepositories;