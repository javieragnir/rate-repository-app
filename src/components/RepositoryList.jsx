import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import RepositoryMenu from './RepositoryMenu';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RenderItem = ({ item, navigate }) => {
  const onPress = () => {
    navigate(`/repository/${item.id}`);
  }

  return (
    <Pressable onPress={onPress}>
      <RepositoryItem {...item} />
    </Pressable>
  )
};

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  // get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={item => <RenderItem {...item} navigate={navigate}/>}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <RepositoryMenu />}
      ListHeaderComponentStyle={{ zIndex: 10, elevation: 10 }}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
}

export default RepositoryList;