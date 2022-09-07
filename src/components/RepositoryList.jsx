import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import RepositoryMenu from './RepositoryMenu';
import { useState } from 'react';
import RepositorySearch from './RepositorySearch';
import { useDebounce } from 'use-debounce'

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

const RepositoryListHeader = (props) => {
  return (
    <>
      <RepositorySearch setSearchText={props.setSearchText}/>
      <RepositoryMenu repositorySort={props.repositorySort} setRepositorySort={props.setRepositorySort}/>
    </>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    // ...

    return (
      <RepositoryListHeader
        repositorySort={props.repositorySort}
        setRepositorySort={props.setRepositorySort}
        setSearchText={props.setSearchText}
      />
    );
  };

  render() {
    const props = this.props;

    // get the nodes from the edges array
    const repositories = props.repositories;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        // ...
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={item => <RenderItem {...item} navigate={props.navigate}/>}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={{ zIndex: 10, elevation: 10 }}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

/* export const RepositoryListContainer = ({ repositories, ...props }) => {
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
      ListHeaderComponent={() => <RepositoryMenu repositorySort={props.repositorySort} setRepositorySort={props.setRepositorySort}/>}
      ListHeaderComponentStyle={{ zIndex: 10, elevation: 10 }}
    />
  );
}; */

const RepositoryList = () => {
  const [repositorySort, setRepositorySort] = useState('Latest repositories');
  const [searchText, setSearchText] = useState('');
  const [debouncedText] = useDebounce(searchText, 500);

  let variables = {
    first: 8,
    searchKeyword: debouncedText,
  }

  switch (repositorySort) {
    case 'Latest repositories':
      variables = { ...variables, orderBy: 'CREATED_AT'}
      break;
    case 'Highest rated repositories':
      variables = { ...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'Lowest rated repositories':
      variables = { ...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
    default:
      throw new Error('Something went wrong with the sorting filter');
  }

  const { repositories, fetchMore } = useRepositories(variables);

  const navigate = useNavigate();

  const onEndReach = () => {
    fetchMore();
  }

  return <RepositoryListContainer
      repositories={repositories}
      repositorySort={repositorySort}
      setRepositorySort={setRepositorySort}
      navigate={navigate}
      setSearchText={setSearchText}
      onEndReach={onEndReach}
    />;
}

export default RepositoryList;