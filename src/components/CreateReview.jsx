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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()
    .optional(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.padding}>
      <FormikTextInput style={styles.textInputStyle} name="ownerName" placeholder="Owner Name" placeholderTextColor={theme.colors.textSecondary}/>
      <FormikTextInput style={[styles.textInputStyle, styles.marginTop]} name="repositoryName" placeholder="Repository Name" placeholderTextColor={theme.colors.textSecondary} />
      <FormikTextInput style={[styles.textInputStyle, styles.marginTop]} name="rating" placeholder="Rating from 0 to 100" placeholderTextColor={theme.colors.textSecondary} />
      <FormikTextInput style={[styles.textInputStyle, styles.marginTop]} name="text" placeholder="Review" placeholderTextColor={theme.colors.textSecondary} />
      <Pressable onPress={onSubmit} style={[styles.submitButton, styles.marginTop]}>
        <Text style={styles.submitButtonText} fontSize="subheading" fontWeight="bold">Create a review</Text>
      </Pressable>
    </View>
  )
}

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
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
    <CreateReviewContainer onSubmit={onSubmit} />
  )
}

export default CreateReview;