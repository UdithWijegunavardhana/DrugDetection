import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {theme} from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import ImageCaptureScreen from './src/screens/ImageCaptureScreen';
import DrugStatusScreen from './src/screens/DrugStatusScreen';
import DrugOffOnLableScreen from './src/screens/DrugOff-OnLableScreen';
import ForumDetailsScreen from './src/screens/ForumDetailsScreen';
import DrugRecomendationScreen from './src/screens/DrugRecomendationScreen';
import DrugStatusScreenValid from './src/screens/DrugStatusScreenValid';
import DrugStatusScreenInvalid from './src/screens/DrugStatusScreenInvalid';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="CaptureImage"
              component={ImageCaptureScreen}
              options={{title: 'Counterfriet Drug Detection'}}
            />
            <Stack.Screen
              name="DrugStatus"
              component={DrugStatusScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DrugOn-OffLable"
              component={DrugOffOnLableScreen}
              options={{title: 'Off Lable Drugs Detection'}}
            />
            <Stack.Screen
              name="ForumDetails"
              component={ForumDetailsScreen}
              options={{title: 'Off Lable Drugs Detection'}}
            />
            <Stack.Screen
              name="DrugRecomendation"
              component={DrugRecomendationScreen}
              options={{title: 'Drug Recomendation'}}
            />
            <Stack.Screen
              name="ValidDrug"
              component={DrugStatusScreenValid}
              options={{title: 'Drug Recomendation'}}
            />
            <Stack.Screen
              name="InvalidDrug"
              component={DrugStatusScreenInvalid}
              options={{title: 'Drug Recomendation'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
