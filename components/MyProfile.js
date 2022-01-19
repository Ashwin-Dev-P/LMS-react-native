import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Config
import {config} from '../config.js';
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL;

export default class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.fetchMyProfile = this.fetchMyProfile.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loggedIn: true,
    });
    await this.fetchMyProfile();
  }

  async fetchMyProfile() {
    this.setState({
      loading: true,
    });
    const headers = {
      'Content-Type': 'application/json',
    };

    const form_data = {
      jwt: await AsyncStorage.getItem('jwt'),
    };

    const url = domain_url + `/api/user/my_profile`;
    await axios
      .post(url, form_data, headers)
      .then(res => {
        if (res.status === 200 && res.data.status === 200) {
          this.setState({
            user: res.data.user,
          });
        }

        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, error: true});
      });
  }

  async isLoggedIn() {
    const jwt = await AsyncStorage.getItem('jwt');

    if (jwt) {
      return true;
    } else {
      return false;
    }
  }

  async logout() {
    await AsyncStorage.removeItem('jwt');
    this.setState({
      loggedIn: false,
    });
    await this.props.navigation.navigate('Login');
  }

  render() {
    if (!this.state.loading) {
      var {name, email} = this.state.user;

      var book = this.state.user.book_currently_issued.book;

      if (book) {
        var url = domain_url + book.picture;
      }
    }

    return (
      <ScrollView>
        <View style={styles.screen}>
          {this.state.loading ? (
            <Loading />
          ) : (
            <View>
              <View style={styles.details}>
                <Text style={styles.label}>Name:</Text>
                <Text>{name}</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.label}>Email:</Text>
                <Text>{email}</Text>
              </View>

              {book ? (
                <View style={styles.details}>
                  <Text style={styles.label}>My issued book:</Text>
                  <Text style={styles.listItem} numberOfLines={1}>
                    {book.name}
                  </Text>
                  <View style={styles.myimage}>
                    <Image
                      source={{uri: url}}
                      style={{width: 300, height: 300}}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.details}>
                  <Text style={styles.label}>My issued book:</Text>
                  <Text>No book issued</Text>
                </View>
              )}
            </View>
          )}

          {this.state.loggedIn === true ? (
            <>
              <TouchableOpacity
                style={styles.logout}
                onPress={this.logout}
                props={this.props}>
                <Text style={styles.whiteText}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    //margin: '5%',
  },
  label: {
    fontWeight: '900',
    fontSize: 18,
  },
  details: {
    padding: '1%',
    paddingLeft: '5%',
    marginBottom: '1%',
    marginTop: '1%',
  },
  myimage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    padding: 15,
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
    fontWeight: '900',
    fontSize: 18,
  },
  blackText: {
    color: 'black',
  },

  logout: {
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
  },
});
