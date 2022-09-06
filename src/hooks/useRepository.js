import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  })

  // not sure why, cant use async await on useQuery or else the
  // RepositoryList component breaks (renders before loading data)
  let repository;
  if (data) {
    repository = data.repository;
  }

  const fetchRepository = async () => {
    await refetch({ id });
  }

  return { repository, loading, refetch: fetchRepository };
};

export default useRepository;