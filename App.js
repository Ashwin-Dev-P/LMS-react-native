

import React, { useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native'




import Home from './components/Home';
import UsersList from './components/UsersList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Test from './components/test';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();


const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  //Used to delete jwt
  var jwt = async function getJWT(value) {
    var jwt = await AsyncStorage.getItem("jwt")


    if (jwt === null) {
      console.log("jwt not present")
      setLoggedIn(false);
      return false;
    }
    setLoggedIn(jwt);
    return jwt;

  }

  //Used to delete jwt
  var deletey = async function deleteJWT(value) {
    var jwt = await AsyncStorage.removeItem("jwt")

    setLoggedIn(false);

    //Navigate to home page if login is success
    this.props.navigation.navigate("Login")

  }

  //delete jwt callback
  //deletey()
  jwt()






  return (

    <>


      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>




          {loggedIn === false ?
            <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name="Users" component={UsersList} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Test" component={Test} />

            </Stack.Navigator>
            : <Stack.Navigator initialRouteName='Home'><Stack.Screen name="Users" component={UsersList} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Test" component={Test} />

            </Stack.Navigator>
          }
        </NavigationContainer>



      </SafeAreaView>
    </>







  );
};

const styles = StyleSheet.create({
  blackText: {
    color: 'black',
  }

});


export default App;
