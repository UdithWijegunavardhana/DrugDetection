import * as React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {theme} from '../core/theme';
import axios from 'axios';

// const DrugData = [
//   {
//     main_distributor_id: true,
//     manufacture_id: true,
//     pharmacy_id: false,
//     store_id: true,
//     sub_distributor_id: false,
//   },
// ];

export default function DrugStatusScreen({navigation}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://172.20.10.4:5000/check_id_status/8902541600416',
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();

    setTimeout(() => {
      setIsLoading(false);
      // setData(DrugData);
      console.log(data);
    }, 2000);

    return () => {
      setIsLoading(true);
      setData(null);
    };
  }, []);

  React.useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const isDataValid = Object.values(data[0]).every(
        value => value !== undefined && value !== null,
      );
      setIsValid(isDataValid);
    } else {
      setIsValid(false);
    }
  }, [data]);

  const renderField = (label, value) => {
    const isDataAvailable = value !== undefined && value !== false;
    return (
      <View style={styles.fieldContainer}>
        <View
          style={[
            styles.indicator,
            {backgroundColor: isDataAvailable ? 'green' : 'red'},
          ]}
        />
        <Text style={styles.label}>{label} </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View>
          {data && data.length > 0 ? (
            <>
              {renderField('Manufacture', data[0]?.manufacture_id)}
              {renderField('Store', data[0]?.store_id)}
              {renderField('Main Distributor', data[0]?.main_distributor_id)}
              {renderField('Sub Distributor', data[0]?.sub_distributor_id)}
              {renderField('Pharmacy', data[0]?.pharmacy_id)}
              <Text
                style={[
                  styles.validationText,
                  {color: isValid ? 'green' : 'red'},
                ]}>
                {isValid ? 'Drug is valid' : 'Drug is invalid'}
              </Text>
              <Button
                style={styles.Button}
                mode="contained"
                uppercase={false}
                labelStyle={styles.labelStyle}
                onPress={() => navigation.navigate('Home')}>
                Ok
              </Button>
            </>
          ) : (
            <>
              <Text>Data is not available</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'serif',
    color: theme.colors.dark,
    shadowColor: '#00A',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '75%',
    marginTop: '2%',
  },
  Button: {
    marginTop: '10%',
    height: 46,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 12,
    color: theme.colors.white,
  },
  image: {
    width: '110%',
    height: 350,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: '10%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  value: {
    fontSize: 20,
  },
  validationText: {
    marginTop: 16,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    fontSize: 22,
  },
});
