import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import Text from './Text';
import theme from '../theme';
import useUserReviews from '../hooks/useUserReviews';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
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
    whiteText: {
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonBlue: {
    borderRadius: 6,
    height: 50,
    width: '47.5%',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRed: {
    borderRadius: 6,
    height: 50,
    width: '47.5%',
    backgroundColor: theme.colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, ...props }) => {
  const navigate = useNavigate();
  const refetch = props.refetch;
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const date = new Date(review.createdAt);
  let dd = date.getDay();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const createdAt = `${dd}.${mm}.${yyyy}`

  const onPressView = () => {
    navigate(`/repository/${review.repository.id}`)
  }

  const onPressDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              console.log('deleting...')
              await deleteReview({ variables: { id: review.id }});
              refetch();
            } catch (e) {
              console.log(e);
            }
          },
        }
      ]
    )
  }


  return (
    <View style={styles.container}>
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
      <View style={styles.buttonContainer}>
        <Pressable onPress={onPressView} style={styles.buttonBlue}><Text fontWeight="bold" fontSize="Subheading" style={styles.whiteText}>View repository</Text></Pressable>
        <Pressable onPress={onPressDelete} style={styles.buttonRed}><Text fontWeight="bold" fontSize="Subheading" style={styles.whiteText}>Delete review</Text></Pressable>
      </View>
    </View>
  )
};

const SingleUserReviews = () => {
  let { reviews, refetch } = useUserReviews({
    includeReviews: true,
  });

  reviews = reviews
  ? reviews.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );

}

export default SingleUserReviews;