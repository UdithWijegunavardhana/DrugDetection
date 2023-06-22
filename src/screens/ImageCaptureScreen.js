import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../core/theme';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function ImageCaptureScreen({navigation}) {
  const [filePath, setFilePath] = React.useState({});
  const [imageSource, setImageSource] = React.useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 850,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not Granted');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        const {assets} = response;
        if (assets && assets.length > 0) {
          const {base64, uri, width, height, fileSize, type, fileName} =
            assets[0];
          console.log('base64 ->', base64);
          console.log('uri ->', uri);
          console.log('width ->', width);
          console.log('height ->', height);
          console.log('fileSize ->', fileSize);
          console.log('type ->', type);
          console.log('fileName ->', fileName);

          const source = {uri};
          setImageSource(source);
        }
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          {imageSource ? (
            <>
              <Image source={imageSource} style={styles.imageStyle} />
              <Button
                style={styles.proceedButton}
                mode="contained"
                uppercase={false}
                labelStyle={styles.labelStyle}
                onPress={() => navigation.navigate('DrugStatus')}>
                Proceed
              </Button>
            </>
          ) : (
            <>
              <Image
                source={require('../assets/images/no-image.png')}
                style={styles.image}
              />
              <Button
                style={styles.Button}
                mode="contained"
                uppercase={false}
                labelStyle={styles.labelStyle}
                onPress={() => captureImage('photo')}>
                Launch Camera for Image
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  imageStyle: {
    width: 400,
    height: 650,
    margin: 5,
  },
  image: {
    width: '80%',
    height: '32%',
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 10,
  },
  Button: {
    marginTop: '90%',
    height: '8%',
    width: '80%',
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  proceedButton: {
    marginTop: '10%',
    height: '8%',
    width: '80%',
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  labelStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 22,
    color: theme.colors.white,
  },
});
