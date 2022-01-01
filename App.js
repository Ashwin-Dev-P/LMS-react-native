

import React from 'react';
import {


  View,
  Text,
  Button,

} from 'react-native';




import Home from './components/Home';
import UsersList from './components/UsersList';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


const App = () => {




  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName='Profile'>


        <Stack.Screen name="Profile" component={UsersList} />
        <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>






  );
};



export default App;
