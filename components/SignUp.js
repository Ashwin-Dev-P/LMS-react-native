import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Button } from 'react-native'
import axios from 'axios';


import Loading from './Loading'

//Config
import { config } from "../config.js";
import NavButtons from './NavButtons';
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            loading: false,
        }
    }
    handleSubmit = () => {
        // do the things  
        console.log("Submiting form pls wait...")
        this.setState({
            loading: true
        })
        const headers = {
            'Content-Type': 'application/json',

        }

        //const url = domain_url + "/api/member/basic/from/"+ ( (this.state.page * this.state.itemsPerPage) -9 ) +"/count/"+ this.state.itemsPerPage ;
        const url = domain_url + "/api/user";
        console.log("here")
        var form_data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

        axios
            .post(url, form_data, headers)
            .then(res => {
                console.log("entered")
                console.log(res.data)
                if (res.status === 200 && res.data.status === 200) {
                    this.setState({
                        data: res.data.data
                    })
                    console.log(res)

                }

                this.setState({ loading: false, message: res.data.message, status: `styles.error` });


            })
            .catch(error => {

                console.log(error);
                this.setState({ loading: false, error: true });
            }
            );

    }

    changeHandler = (text, name) => {
        this.setState({
            [name]: text
        })

    }


    render() {
        console.log(this.state.status)
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Registration</Text>

                <TextInput placeholder='email' style={styles.formField}
                    underlineColorAndroid="transparent"
                    value={this.state.email}
                    //name="email"
                    //onChangeText={(text) => this.setState({ email: text })}
                    onChangeText={(text) => this.changeHandler(text, "email")}
                />

                <TextInput
                    style={styles.formField}
                    // Adding hint in TextInput using Placeholder option.
                    placeholder="Name"
                    // Making the Under line Transparent.
                    underlineColorAndroid="transparent"

                    value={this.state.name}

                    onChangeText={(text) => this.changeHandler(text, "name")}
                />

                <TextInput
                    style={styles.formField}

                    placeholder="Password"

                    underlineColorAndroid="transparent"
                    value={this.state.password}

                    onChangeText={(text) => this.changeHandler(text, "password")}
                />


                <TextInput
                    style={styles.formField}

                    placeholder="Confirm password"

                    underlineColorAndroid="transparent"

                    value={this.state.confirm_password}

                    onChangeText={(text) => this.changeHandler(text, "confirm_password")}
                />


                <Button
                    title="Sign Up"
                    onPress={this.handleSubmit}
                />

                {this.state.loading === true ? <Text style={styles.message}> <Loading /> </Text> : null}
                {this.state.message && this.state.loading === false ? <Text style={styles.message}>{this.state.message}</Text> : null}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    blackText: {
        color: 'black',
    },
    container: {
        margin: 40
    },
    formField: {
        height: 40, width: "95%", borderColor: 'gray', borderWidth: 1, marginBottom: 20,
        borderRadius: 3.5
    },
    error: {
        fontSize: 20,

    },
    message: {
        marginTop: 20,
        textAlign: 'center',
    }

});


