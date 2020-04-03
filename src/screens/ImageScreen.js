import React, { useState } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
// 'https://cors-anywhere.herokuapp.com/'
const ImageScreen = () => {
  const [state, setState] = useState({ image: null });


  const pickImage = async () => {
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1, 
    });

    console.log(imageResult);
    if (!imageResult.cancelled) {
      setState({ image: imageResult });
    }
  };
  //Add contact
  // const addContact = async contact => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   try {
  //     const res = await axios.post('/api/contacts', contact, config);
  //     dispatch({
  //       type: ADD_CONTACT,
  //       payload: res.data
  //     })
  //   } catch (err) {
  //     dispatch({
  //       type: CONTACT_ERROR,
  //       payload: err.response.msg
  //     })
  //   }
  // };
  const submit = async (res) => {
    console.log('submitted', res)
    const { uri } = res
    console.log('uri::', uri)
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const name = new Date().getTime() + '.' + fileType
    console.log('name', name)
    const formData = new FormData();
    console.log('formData:::', formData);
    formData.append('file', { uri, name, type: `application/${fileType}` })
    console.log('formData', formData);

    const config = {
      headers: {
        'Content-Type': 'application/form-data'
      }
    };
    try {
     const res =  await axios.post('http://localhost:3001/upload', formData, config);
      console.log('RES', res)
      alert('saved')
    } catch (err) {
      console.log('err axios', err);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        {
          state.image ? (
            <View style={{ marginBottom: 10 }}  >
              <Image
                source={{ uri: state.image.uri }}
                style={{ width: 300, height: 200 }}
              />
            </View>
          ) : (
              <Button
                title="Pick an image from gallery"
                onPress={pickImage}
              />
            )
        }
      </View>
      {state.image ?
        (
          <View style={{ flexDirection: 'row' }} >
            <Button title='Save' onPress={() => submit(state.image)} />
            <Button title='change' onPress={pickImage} />
          </View>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ImageScreen;