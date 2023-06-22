import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { theme } from '../core/theme';
import * as yup from 'yup';
import {Formik} from 'formik';

let validSchema = yup.object().shape({
  drug: yup.string().required('Drug Name is required'),
  disease: yup.string().required('Disease is required'),
});
  
export default function DrugOffOnLableScreen({navigation}) {
  const [resultText, setResultText] = React.useState('');

  return (
    <Formik
      initialValues={{drug: '', disease: ''}}
      validateOnMount={true}
      onSubmit={values => {
        const result = `The drug ${values.drug} is ${
          values.drug ? 'on-label' : 'off-label'
        } for the disease: ${values.disease}`;
        setResultText(result);
      }}
      validationSchema={validSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        touched,
        errors,
      }) => (
        <View style={Styles.container}>
          <View style={{width: '90%'}}>
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.primary}
              style={Styles.input}
              label="Drug Name"
              onChangeText={handleChange('drug')}
              onBlur={handleBlur('drug')}
              outlineStyle={Styles.inputOutline}
              values={values.drug}
            />
            {touched.drug && errors.drug && (
              <Text style={Styles.error}>{errors.drug}</Text>
            )}
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.primary}
              style={Styles.input}
              label="Disease"
              onChangeText={handleChange('disease')}
              outlineStyle={Styles.inputOutline}
              onBlur={handleBlur('disease')}
              values={values.disease}
            />
            {touched.disease && errors.disease && (
              <Text style={Styles.error}>{errors.disease}</Text>
            )}
          </View>
          <Button
            style={Styles.Button}
            mode="contained"
            uppercase={false}
            labelStyle={Styles.labelStyle}
            onPress={handleSubmit}>
            Submit
          </Button>
          <Text style={Styles.resultText}>{resultText}</Text>
          <Button
            style={Styles.forumDetailsButton}
            mode="contained"
            uppercase={false}
            labelStyle={Styles.labelStyle}
            onPress={() => navigation.navigate('ForumDetails')}>
                View as a Form
          </Button>
        </View>
      )}
    </Formik>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal:30,
    marginVertical:30,
    justifyContent:'center'
  },
  input: {
    width: '100%',
    height: 43,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '75%',
    alignSelf: 'center',
  },
  Button: {
    marginTop: 20,
    height: 50,
    width: '60%',
    borderRadius: 20,
    backgroundColor: theme.colors.primary
  },
  forumDetailsButton: {
    marginTop: 20,
    height: 80,
    width: '60%',
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    marginTop: 50,
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 15,
    color: theme.colors.white,
  },
  error: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 2,
    alignSelf: 'center',
  },
  inputOutline: {
    color: theme.primary,
    borderRadius: 20,
  },
  resultText: {
    fontSize:20,
    marginTop: 20,
    fontWeight:'bold',
    color: theme.primary,
    textAlign:'center'
  },
});
  