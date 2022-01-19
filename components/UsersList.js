import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Loading from './Loading';

//Config
import {config} from '../config.js';
import NavButtons from './NavButtons';
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL;

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.state = {
      users: [],
      loading: true,
      error: false,
      limit: 10,
      skip: 0,
    };
  }

  loadData(skip) {
    this.setState({
      loading: true,
    });
    const headers = {
      'Content-Type': 'application/json',
    };
    console.log(this.state.skip);
    //const url = domain_url + "/api/member/basic/from/"+ ( (this.state.page * this.state.itemsPerPage) -9 ) +"/count/"+ this.state.itemsPerPage ;
    const url =
      domain_url + `/api/user/limit/10/skip/${skip || this.state.skip}`;
    axios
      .get(url, headers)
      .then(res => {
        if (res.status === 200 && res.data.status === 200) {
          console.log(res.data.data);
          var newData = res.data.data;
          console.log(newData);
          this.setState({
            //users: res.data.data,
            users: [...this.state.users, ...newData],
          });
        }

        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, error: true});
      });
  }

  onPress() {
    const limit = this.state.limit;
    var skip = this.state.skip;
    skip = skip + limit;

    this.setState({
      skip: skip,
    });

    this.loadData(skip);
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <View>
        {this.state.error === true ? (
          <>
            <Text style={styles.blackText}>Something went wrong</Text>
          </>
        ) : (
          <>
            {this.state.loading === false && this.state.users.length < 1 ? (
              <>
                <Text>No users found</Text>
              </>
            ) : (
              <>
                <FlatList
                  data={this.state.users}
                  renderItem={({item}) => (
                    <Text
                      style={styles.listItem}
                      key={item._id}
                      numberOfLines={1}>
                      {item.email}
                    </Text>
                  )}
                />
              </>
            )}
          </>
        )}
        {this.state.loading === true ? <Loading /> : null}

        <TouchableOpacity style={styles.loadMore} onPress={this.onPress}>
          <Text style={styles.whiteText}>Load more</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    textAlign: 'center',
    color: 'black',
  },
  blackText: {
    color: 'black',
  },
  loadMore: {
    backgroundColor: '#007bff',
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    padding: '3%',
  },
});
