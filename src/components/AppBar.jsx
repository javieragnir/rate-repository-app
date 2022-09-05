import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.appBar,
  },
  // ...
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  
  const me = (data && data.me);

  return (
  <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <AppBarTab text="Repositories" link="/"/>
      {!me && <AppBarTab text="Sign In" link="/signin"/>}
      {me && <AppBarTab text="Sign Out" link="/signout"/>}
    </ScrollView>
  </View>
  )
};

export default AppBar;
