import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 5,
  },
  appbarText: {
    color: 'white',
  }
})

const AppBarTab = ({ text, link }) => (
    <View style={styles.padding}>
      <Link to={link}>
        <>
          <Text style={styles.appbarText}>{text}</Text>
        </>
      </Link>
    </View>
)

export default AppBarTab;

{/* <Pressable>
<Text style={styles.appbarText} onPress={onPress}>{text}</Text>
<Link styles={styles.appbarText}to={link}>{text}</Link>
</Pressable> */}