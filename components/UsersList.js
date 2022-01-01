import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import axios from 'axios'
import Loading from './Loading'

//Config
import { config } from "../config.js";
import NavButtons from './NavButtons';
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL


export default class UsersList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true,
            error: false,
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        const headers = {
            'Content-Type': 'application/json',

        }

        //const url = domain_url + "/api/member/basic/from/"+ ( (this.state.page * this.state.itemsPerPage) -9 ) +"/count/"+ this.state.itemsPerPage ;
        const url = domain_url + "/api/user";
        axios
            .get(url, headers)
            .then(res => {

                if (res.status === 200 && res.data.status === 200) {
                    this.setState({
                        users: res.data.data
                    })

                }

                this.setState({ loading: false });


            })
            .catch(error => {

                console.log(error);
                this.setState({ loading: false, error: true });
            }
            );
    }
    render() {

        return (
            <View>
                {this.state.loading === false ?
                    <>
                        {this.state.error === true ?
                            <>
                                <Text style={styles.blackText}>Something went wrong</Text>
                            </>
                            :
                            <>
                                {this.state.users.length < 1 ? <><Text>No users found</Text></> :

                                    <>
                                        <FlatList data={this.state.users} renderItem={({ item }) =>
                                            <Text style={styles.listItem} key={item._id} numberOfLines={1} >{item.email}</Text>
                                        }
                                        />
                                    </>

                                }

                            </>
                        }





                    </>
                    :
                    <ActivityIndicator />
                }
                <NavButtons props={this.props} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
        textAlign: 'center',
        color: 'black'
    },
    blackText: {
        color: 'black',
    }
});