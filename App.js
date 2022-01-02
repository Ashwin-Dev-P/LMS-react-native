

import React from 'react';
import { StyleSheet } from 'react-native'




import Home from './components/Home';
import UsersList from './components/UsersList';
import Login from './components/Login';
import SignUp from './components/SignUp';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavButtons from './components/NavButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();


const App = () => {




  return (

    <>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>


            <Stack.Screen name="Users" component={UsersList} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />

          </Stack.Navigator>
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
