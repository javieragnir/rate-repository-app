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

const RepositoryMenu = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.onTop}>
      <Provider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Menu
            style={{ marginTop: -40 }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu} labelStyle={styles.button}>Show menu</Button>}>
            <Menu.Item titleStyle={styles.titleStyle} onPress={() => {}} title="Item 1" />
            <Menu.Item titleStyle={styles.titleStyle} onPress={() => {}} title="Item 2" />
            <Menu.Item titleStyle={styles.titleStyle} onPress={() => {}} title="Item 3" />
          </Menu>
        </View>
      </Provider>
    </View>
  )
}

export default RepositoryMenu;