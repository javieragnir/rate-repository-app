import { View, FlatList } from 'react-native'
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

const RepositoryInfo = ({ repository }) => {

  return <RepositoryItem {...repository} show={true} />
}

const ReviewItem = ({ review }) => {
  console.log(review)
  console.log('$$$$', review.user)

  return (
    <View>
      <Text>{review.rating}</Text>
      <Text>{review.text}</Text>
      <Text>{review.createdAt}</Text>
      <Text>{review.user.username}</Text>
    </View>
  )
};

const SingleRepository = () => {
  let { id } = useParams();
  const { repository } = useRepository(id);

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      // ...
    />
  );
};


export default SingleRepository