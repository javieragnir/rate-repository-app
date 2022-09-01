import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';

const styles = StyleSheet.create({
  padding: {
    padding: 10,
  },
  textInputStyle: {
    padding: 10,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  submitButton: {
    padding: 10,
    backgroundColor: theme.colors.appBar,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
  }
});

const initialValues = {
  username: '',
  password: '',
}

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.padding}>
      <FormikTextInput style={styles.textInputStyle} name="username" placeholder="Username" placeholderTextColor={theme.colors.textSecondary}/>
      <FormikTextInput style={styles.textInputStyle} name="password" placeholder="Password" placeholderTextColor={theme.colors.textSecondary} secureTextEntry={true}/>
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.loginButtonText} fontSize="subheading" fontWeight="bold">Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = values => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default SignIn;
