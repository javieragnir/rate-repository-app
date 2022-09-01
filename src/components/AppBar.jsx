import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.appBar,
  },
  // ...
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <AppBarTab text="Repositories" link="/"/>
    <AppBarTab text="Sign In" link="/signin"/>
  </View>
  )
};

export default AppBar;
