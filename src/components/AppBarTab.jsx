import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  appbarText: {
    color: 'white',
  }
})

const AppBarTab = ({ text, link }) => (
    <View>
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