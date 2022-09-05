import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  padding: {
    padding: 10,
  },
  marginTop: {
    marginTop: 10
  },
  textInputStyle: {
    padding: 10,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 4,
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.padding}>
      <FormikTextInput style={styles.textInputStyle} name="username" placeholder="Username" placeholderTextColor={theme.colors.textSecondary}/>
      <FormikTextInput style={[styles.textInputStyle, styles.marginTop]} name="password" placeholder="Password" placeholderTextColor={theme.colors.textSecondary} secureTextEntry={true}/>
      <Pressable onPress={onSubmit} style={[styles.submitButton, styles.marginTop]}>
        <Text style={styles.loginButtonText} fontSize="subheading" fontWeight="bold">Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data)
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default SignIn;
