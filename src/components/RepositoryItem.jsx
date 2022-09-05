import { Image, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    padding: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  flexContainer: {
    display: 'flex',
    flexShrink: 1,
  },
  flexContainerRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  metricsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  metric: {
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 8,
  },
  languageTag: {
    backgroundColor: '#0366d6',
    borderRadius: 8,
    alignSelf: 'flex-start',
    padding: 6,
  },
  languageText: {
    color: 'white'
  },
  bottomMargin: {
    marginBottom: 6,
  },
  largeBottomMartin: {
    marginBottom: 10,
  }
})

const RepositoryItem = ({ ownerAvatarUrl, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount }) => {
  return (
    <View testID="repositoryItem" style={styles.itemContainer}>
      <View style={[styles.flexContainerRow, styles.largeBottomMartin]}>
        <Image source={{uri: `${ownerAvatarUrl}`}} style={styles.profileImage} />
        <View style={styles.flexContainer}>
          <Text style={styles.bottomMargin} fontWeight="bold" fontSize="subheading" >{fullName}</Text>
          <Text style={styles.bottomMargin} color="textSecondary">{description}</Text>
          <View style={styles.languageTag}>
            <Text style={styles.languageText}>{language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.metricsContainer}>
        <RepositoryMetric number={stargazersCount} text="Stars"/>
        <RepositoryMetric number={forksCount} text="Forks"/>
        <RepositoryMetric number={reviewCount} text="Reviews"/>
        <RepositoryMetric number={ratingAverage} text="Rating"/>
      </View>
    </View>
  )
}

const RepositoryMetric = ({ number, text }) => {
  if (number >= 1000) {
    number = (Math.round((number / 100)) / 10).toFixed(1) + 'k'
  }

  return (
    <View style={styles.metric}>
      <Text fontWeight="bold" fontSize="subheading">{number}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  )
}

export default RepositoryItem;