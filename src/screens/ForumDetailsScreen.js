import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { theme } from '../core/theme';
import * as yup from 'yup';
import {Formik} from 'formik';
import axios from 'axios';

let validSchema2 = yup.object().shape({
  disease: yup.string().required('Disease is required'),
});
  
export default function ForumDetailsScreen({navigation}) {
    const [onLabelDrugs, setOnLabelDrugs] = React.useState([]);
    const [offLabelDrugs, setOffLabelDrugs] = React.useState([]);

  return (
    <Formik
      initialValues={{disease: ''}}
      onSubmit={async values => {
        const response = await axios.post(
          'https://e8c4-35-245-159-145.ngrok.io/api/viewform',
          values,
        );
        console.log(values);
        console.log(response.data.off_label);
        console.log(response.data.on_label);

        setOnLabelDrugs(
          response.data.on_label.length > 0
            ? response.data.on_label
            : ['No On-Lable Drugs'],
        );
        setOffLabelDrugs(
          response.data.off_label.length > 0
            ? response.data.off_label
            : ['No Off-Lable Drugs'],
        );
      }}
      validationSchema={validSchema2}>
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
            style={[
              Styles.Button,
              {
                backgroundColor: isValid
                  ? theme.colors.primary
                  : theme.colors.disabled,
              },
            ]}
            mode="contained"
            uppercase={false}
            labelStyle={Styles.labelStyle}
            onPress={handleSubmit}>
            View Form Details
          </Button>

          <View style={Styles.tableContainer}>
            <View style={Styles.tableColumn}>
              <Text style={Styles.tableTitle}>On-Label Drugs:</Text>
              <Table>
                <Rows
                  data={onLabelDrugs.map(drug => [drug])}
                  textStyle={Styles.tableText}
                />
              </Table>
            </View>
            <View style={Styles.tableColumn}>
              <Text style={Styles.tableTitle}>Off-Label Drugs:</Text>
              <Table>
                <Rows
                  data={offLabelDrugs.map(drug => [drug])}
                  textStyle={Styles.tableText}
                />
              </Table>
            </View>
          </View>
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
  Button: {
    marginTop: 20,
    height: 50,
    width: '60%',
    borderRadius: 20,
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
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: theme.primary,
    textAlign: 'center',
  },
  tableText: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableBorderStyle: {
    borderWidth: 1,
    borderColor: 'black',
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  tableContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tableColumn: {
    marginHorizontal:10,
  }
});
  