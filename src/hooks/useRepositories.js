import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  // not sure why, cant use async await on useQuery or else the
  // RepositoryList component breaks (renders before loading data)
  let repositories;
  if (data) {
    repositories = data.repositories;
  }

  const fetchRepositories = async () => {
    await refetch({ GET_REPOSITORIES });
  }

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;