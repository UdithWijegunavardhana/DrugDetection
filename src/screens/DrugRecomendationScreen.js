import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { theme } from '../core/theme';
import * as yup from 'yup';
import {Formik} from 'formik';
import axios from 'axios';

let validSchema3 = yup.object().shape({
    condition: yup.string().required('Condition is required'),
});
  
export default function DrugRecomendationScreen({navigation}) {
    const [recommendedDrugs, setRecommendedDrugs] = React.useState([]);

  return (
    <Formik
      initialValues={{condition: ''}}
      onSubmit={async (values) => {
        console.log(values);
        // fetchRecommendedDrugs(values);
        try {
          const response = await axios.post('https://e82a-34-172-14-252.ngrok.io/api/recommend', values);
          console.log('Response : ',response.data);
          setRecommendedDrugs(response.data);
        } catch (error) {
          console.error(error);
        }
      }}
      validationSchema={validSchema3}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={Styles.container}>
          <View style={{width: '90%'}}>
            <Text style={Styles.headerText}>Enter Your Condition :</Text>
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.primary}
              style={Styles.input}
              label="Condition"
              onChangeText={handleChange('condition')}
              outlineStyle={Styles.inputOutline}
              onBlur={handleBlur('condition')}
              values={values.condition}
            />
            {touched.condition && errors.condition && (
              <Text style={Styles.error}>{errors.condition}</Text>
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
          {recommendedDrugs.length > 0 && (
            <View style={Styles.recommendedDrugsContainer}>
              <Text style={Styles.recommendedDrugsTitle}>
                Top Five Drugs for Condition : {values.condition}
              </Text>
              {recommendedDrugs.map(drug => (
                <Text key={drug} style={Styles.recommendedDrug}>
                  {drug}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </Formik>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    height: 43,
    alignSelf: 'center',
    marginTop: 20,
  },
  headerText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  Button: {
    marginTop: 20,
    height: 50,
    width: '60%',
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
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
  recommendedDrugsContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  recommendedDrugsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  recommendedDrug: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});
  