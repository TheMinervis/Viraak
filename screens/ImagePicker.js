import React, { useState, useCallback } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = useCallback(async () => {
    // try {
    //   console.log(pickedImage.size);
    //   setLoading(true);
    //   const response = await axios.post(
    //     `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB9TgUmQPgLSSjAidq_IvY07PSL-kTns84`,
    //     {
    //       requests: [
    //         {
    //           features: [
    //             {
    //               type: 'TEXT_DETECTION',
    //             },
    //           ],
    //           image: {
    //             source: {
    //               imageUri: pickedImage.base64,
    //             },
    //           },
    //         },
    //       ],
    //     }
    //   );
    //   console.log(response);
    //   let res = response.data['responses'][0]['textAnnotations'];
    //   const result = {};

    //   result.licenseNo = res[13]['description'];
    //   result.dob = res[14]['description'];
    //   result.expireDate = res[15]['description'];
    //   result.name = res[20]['description'] + ' ' + res[21]['description'];
    // } catch (er) {
    //   console.log(er.response.data);
    // }
    // const url = pickedImage.uri;
    // setPickedImage(null);
    // setLoading(false);
    try {
      var form = new FormData();
      let filename = pickedImage.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      form.append('file', { uri: pickedImage, name: filename, type });
      // form.append('srcImg', 'File');
      // form.append('Session', 'string');
      setLoading(true);
      const res = await fetch(
        'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/',
        {
          method: 'POST',
          body: form,
          headers: {
            'x-rapidapi-host': 'pen-to-print-handwriting-ocr.p.rapidapi.com',
            'x-rapidapi-key':
              'fafdfc20b6msh8852ab42626b831p1ed32fjsn2d53ec3af524',
            'content-type': 'multipart/form-data',
          },
        }
      );
      console.log(await res.json());
      setLoading(false);
    } catch (er) {
      setLoading(false);
      console.log(er);
    }
    // props.navigation.navigate('Id details', { url });
  });

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log(image);
    setPickedImage(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No prescription picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Scan Doc" color="red" onPress={takeImageHandler} />
      </View>
      {loading ? (
        <ActivityIndicator color="green" />
      ) : (
        <Button title="Submit Doc" color="green" onPress={submitHandler} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImgPicker;
