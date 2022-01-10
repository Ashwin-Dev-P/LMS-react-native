import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'



import Home from './components/Home';
import UsersList from './components/UsersList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyProfile from './components/MyProfile';
import Books from './components/Books';
import BookDetail from './components/BookDetail';
//import Test from './components/test';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();



export default class Apps extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
        }
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.logout = this.logout.bind(this);

    }


    async isLoggedIn() {
        const jwt = await AsyncStorage.getItem("jwt")
        console.log(jwt)
        if (jwt) {
            return true;
        } else {
            return false;
        }
    }

    async logout() {
        await AsyncStorage.removeItem("jwt");
        this.setState({
            loggedIn: false,
        })
    }

    async componentDidMount() {
        this.setState({
            loggedIn: await this.isLoggedIn()
        })
    }


    render() {

        return (

            <SafeAreaView style={{ flex: 1 }}>

                {this.state.loggedIn === true ?
                    <>
                        <TouchableOpacity
                            style={styles.logout}
                            onPress={this.logout}

                        >
                            <Text style={styles.whiteText}>Logout</Text>
                        </TouchableOpacity>
                    </>
                    : null}

                <NavigationContainer>

                    {this.state.loggedIn === true ?


                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen name="Users" component={UsersList} />
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Profile" component={MyProfile} />
                            <Stack.Screen name="Books" component={Books} />
                            <Stack.Screen name="BookDetail" component={BookDetail} />

                            <Stack.Screen name='Login' component={Login} />
                            <Stack.Screen name="SignUp" component={SignUp} />


                        </Stack.Navigator>
                        :

                        <Stack.Navigator initialRouteName="Login">
                            <Stack.Screen name="Users" component={UsersList} />
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Profile" component={MyProfile} />
                            <Stack.Screen name="Books" component={Books} />
                            <Stack.Screen name="BookDetail" component={BookDetail} />

                            <Stack.Screen name='Login' component={Login} />
                            <Stack.Screen name="SignUp" component={SignUp} />


                        </Stack.Navigator>

                    }









                </NavigationContainer>



            </SafeAreaView>

        )
    }
}


const styles = StyleSheet.create({
    blackText: {
        color: 'black',
    },

    logout: {
        color: "white",
        backgroundColor: "red",
        padding: 10,
        width: "20%",
    },
    whiteText: {
        color: "white",
    }

});
