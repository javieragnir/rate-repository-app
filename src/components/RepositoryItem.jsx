import { Image, View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from 'expo-linking'

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
    marginTop: 10,
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
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignSelf: 'flex-start',
    padding: 6,
  },
  whiteText: {
    color: 'white'
  },
  bottomMargin: {
    marginBottom: 6,
  },
  largeBottomMartin: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
})

const LinkButton = ({ url }) => {
  const onPress = () => {
    Linking.openURL(url);
  }

  return(
    <Pressable style={styles.button} onPress={onPress}>
      <Text fontSize="subheading" fontWeight="bold" style={styles.whiteText}>Open in GitHub</Text>
    </Pressable>
  )
}

const RepositoryItem = ({ ownerAvatarUrl, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, url, show = false }) => {
  return (
    <View testID="repositoryItem" style={styles.itemContainer}>
      <View style={[styles.flexContainerRow, styles.largeBottomMartin]}>
        <Image source={{uri: `${ownerAvatarUrl}`}} style={styles.profileImage} />
        <View style={styles.flexContainer}>
          <Text style={styles.bottomMargin} fontWeight="bold" fontSize="subheading" >{fullName}</Text>
          <Text style={styles.bottomMargin} color="textSecondary">{description}</Text>
          <View style={styles.languageTag}>
            <Text style={styles.whiteText}>{language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.metricsContainer}>
        <RepositoryMetric number={stargazersCount} text="Stars"/>
        <RepositoryMetric number={forksCount} text="Forks"/>
        <RepositoryMetric number={reviewCount} text="Reviews"/>
        <RepositoryMetric number={ratingAverage} text="Rating"/>
      </View>
      {show && <LinkButton url={url}/>}
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

export const RepositoryView = () => {
  let { id } = useParams();
  
  const { repository } = useRepository(id);

  return <RepositoryItem {...repository} show={true} />
}

export default RepositoryItem;