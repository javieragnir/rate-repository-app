import { Pressable, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appbarText: {
    color: 'white',
  }
})

const AppBarTab = ({ text, onPress }) => (
    <Pressable>
      <Text style={styles.appbarText} onPress={onPress}>{text}</Text>
    </Pressable>
)

export default AppBarTab;