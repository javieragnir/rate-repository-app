/* import {Picker} from '@react-native-picker/picker';
import { useState, useRef } from 'react';

const RepositoryMenu = () => {
  const [sortBy, setSortBy] = useState('LATEST_REVIEW');

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <Picker
      ref={pickerRef}
      selectedValue={sortBy}
      onValueChange={(itemValue, itemIndex) =>
        setSortBy(itemValue)
      }>
      <Picker.Item label="Latest repositories" value="LATEST_REVIEW" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
    </Picker>
  )
} */

import { View, StyleSheet } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: theme.fonts.main,
    color: 'black'
  },
  button: {
    color: 'black',
    fontFamily: theme.fonts.main,
  }
})

const RepositoryMenu = (props) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const setRepositorySort = props.setRepositorySort;

  return (
    <View style={styles.onTop}>
      <Provider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Menu
            style={{ marginTop: -40, right: 0, left: 'auto', }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button theme={{ colors: {primary: '#0366d6'}}} onPress={openMenu} labelStyle={styles.button}>{props.repositorySort}</Button>}>
            <Menu.Item titleStyle={styles.titleStyle} onPress={() => setRepositorySort('Latest repositories')} title="Latest repositories" />
            <Menu.Item titleStyle={styles.titleStyle} onPress={() => setRepositorySort('Highest rated repositories')} title="Highest rated repositories" />
            <Menu.Item titleStyle={styles.titleStyle} onPress={() => setRepositorySort('Lowest rated repositories')} title="Lowest rated repositories" />
          </Menu>
        </View>
      </Provider>
    </View>
  )
}

export default RepositoryMenu;