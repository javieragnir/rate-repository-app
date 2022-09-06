import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error,
  }
});

const NumberInput = ({ style, error, ...props }) => {
  const numberInputStyle = [style, (error && styles.error)];

  return <NativeTextInput style={numberInputStyle} {...props} />;
};

export default NumberInput;