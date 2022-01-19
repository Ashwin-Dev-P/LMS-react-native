import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

import Loading from './Loading';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

//Config
import {config} from '../config.js';
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.validateData = this.validateData.bind(this);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  async componentDidMount() {}

  async addJWT(value) {
    try {
      await AsyncStorage.setItem('jwt', value);
    } catch (e) {
      console.error(e);
    }
  }

  async validateData() {
    const email = this.state.email;
    if (!email || email.trim().length < 3) {
      this.setState({
        error: true,
        message: 'Please enter a valid email id',
      });
      return false;
    }

    const password = this.state.password;
    if (!password || password.trim().length < 1) {
      this.setState({
        error: true,
        message: 'Please enter a password',
      });
      return false;
    }
    return true;
  }

  handleSubmit = async () => {
    this.setState({
      loading: true,
    });
    const validInput = await this.validateData();
    if (validInput !== true) {
      this.setState({
        loading: false,
      });
      return false;
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    const url = domain_url + '/api/user/login';

    var form_data = {
      email: this.state.email,
      password: this.state.password,
    };

    await axios
      .post(url, form_data, headers)
      .then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const {token} = res.data;

          this.addJWT(token);

          //Navigate to home page if login is success
          this.props.navigation.navigate('Home');

          this.setState({
            error: false,
          });
        } else {
          this.setState({
            message: res.data.message,
            error: true,
          });
        }

        this.setState({
          loading: false,

          status: `styles.error`,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, error: true});
      });
  };

  changeHandler = (text, name) => {
    this.setState({
      [name]: text,
    });
  };

  navigateTo(path) {
    this.props.navigation.navigate(path);
  }

  render() {
    if (this.state.loggedIn) {
      this.navigateTo('Home');
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>

        <TextInput
          placeholder="email"
          style={styles.formField}
          underlineColorAndroid="transparent"
          value={this.state.email}
          //name="email"
          //onChangeText={(text) => this.setState({ email: text })}
          onChangeText={text => this.changeHandler(text, 'email')}
        />

        <TextInput
          style={styles.formField}
          placeholder="Password"
          underlineColorAndroid="transparent"
          value={this.state.password}
          onChangeText={text => this.changeHandler(text, 'password')}
          secureTextEntry={true}
        />

        <Button title="Log In" onPress={this.handleSubmit} />

        {this.state.loading === true ? (
          <Text style={styles.message}>
            {' '}
            <Loading />{' '}
          </Text>
        ) : null}
        {this.state.message &&
        !this.state.error &&
        this.state.loading === false ? (
          <Text style={styles.message}>{this.state.message}</Text>
        ) : null}

        {!this.state.loading && this.state.error && this.state.message ? (
          <Text style={styles.errorDiv}>{this.state.message}</Text>
        ) : null}

        <View style={styles.div}>
          <Text>
            Don't have an account?
            <Text
              style={styles.linkStyle}
              onPress={() => this.navigateTo('SignUp')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    );
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
    margin: 25,
    marginTop: 200,
  },
  formField: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 3.5,
    paddingLeft: 20,
  },
  error: {
    fontSize: 20,
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
  },
  linkStyle: {
    color: 'blue',
  },
  div: {
    marginTop: 40,
    textAlign: 'center',
    marginLeft: 70,
    fontSize: 20,
  },
  errorDiv: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
