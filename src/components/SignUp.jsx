import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

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
    height: 60
  },
  submitButton: {
    padding: 10,
    backgroundColor: theme.colors.appBar,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  submitButtonText: {
    color: 'white',
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirm is required')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.padding}>
      <FormikTextInput style={styles.textInputStyle} name="username" placeholder="Username" placeholderTextColor={theme.colors.textSecondary}/>
      <FormikTextInput style={[styles.textInputStyle, styles.marginTop]} name="password" placeholder="Password" placeholderTextColor={theme.colors.textSecondary} secureTextEntry={true}/>
      <FormikTextInput style={[styles.textInputStyle, styles.marginTop]} name="passwordConfirm" placeholder="Password Confirmation" placeholderTextColor={theme.colors.textSecondary} secureTextEntry={true}/>
      <Pressable onPress={onSubmit} style={[styles.submitButton, styles.marginTop]}>
        <Text style={styles.submitButtonText} fontSize="subheading" fontWeight="bold">Sign up</Text>
      </Pressable>
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW);

  const onSubmit = async values => {

    const review = {...values, rating: Number(values.rating)};

    try {
      const { data } = await mutate({ variables: { review }})
      console.log(data);
      console.log(data.createReview.repository);
      navigate(`/repository/${data.createReview.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SignUpContainer onSubmit={onSubmit} />
  )
}

export default SignUp;