import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from '../core/theme';

export default function HomeScreen({navigation}) {
  return (
    <View style={Styles.container}>
      <Image
        style={Styles.image}
        source={require('../assets/images/page01.png')}
      />
      <Button
        style={Styles.Button}
        mode="contained"
        uppercase={false}
        labelStyle={Styles.labelStyle}
        // onPress={() => navigation.navigate('CaptureImage')}
      >
        Drug Recomendation
      </Button>
      <Button
        style={Styles.Button}
        mode="contained"
        uppercase={false}
        labelStyle={Styles.labelStyle}
        // onPress={() => navigation.navigate('CaptureImage')}
      >
        Off Lable Drugs Detection
      </Button>
      <Button
        style={Styles.Button}
        mode="contained"
        uppercase={false}
        labelStyle={Styles.labelStyle}
        onPress={() => navigation.navigate('CaptureImage')}>
        Counterfriet Drug Detection
      </Button>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '75%',
    marginTop: '2%',
  },
  Button: {
    marginTop: '10%',
    height: '10%',
    width: '80%',
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 32,
    color: theme.colors.white,
  },
  image: {
    width: '80%',
    height: '32%',
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
