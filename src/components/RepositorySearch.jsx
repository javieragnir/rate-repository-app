import { useState } from 'react';
import { Searchbar } from 'react-native-paper';


const RepositorySearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query)
    props.setSearchText(query);
  };

  return (
    <Searchbar
      theme={{ colors: {primary: '#0366d6'}}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default RepositorySearch;