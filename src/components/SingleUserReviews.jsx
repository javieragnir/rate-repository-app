import { View, FlatList, StyleSheet } from 'react-native'
import Text from './Text';
import theme from '../theme';
import useUserReviews from '../hooks/useUserReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
  },
  circleContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    marginRight: 15,
  },
  reviewInfoContainer: {
    display: 'flex',
    flex: 1,
  },
  blueText: {
    color: theme.colors.primary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);
  let dd = date.getDay();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const createdAt = `${dd}.${mm}.${yyyy}`

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.circleContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.blueText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewInfoContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 3}}>{review.repository.ownerName}/{review.repository.name}</Text>
        <Text color="textSecondary" style={{ marginBottom: 5}}>{createdAt}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const SingleUserReviews = () => {
  let { reviews } = useUserReviews({
    includeReviews: true,
  });

  console.log(reviews)

  reviews = reviews
  ? reviews.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );

}

export default SingleUserReviews;