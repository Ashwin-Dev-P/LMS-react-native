import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import Loading from './Loading'

import BookListItem from './BookListItem'

//Config
import { config } from "../config.js";
import NavButtons from './NavButtons';
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL


export default class Books extends Component {

    constructor(props) {

        super(props);


        this.loadBooks = this.loadBooks.bind(this);
        this.onPress = this.onPress.bind(this);
        this.viewBook = this.viewBook.bind(this);
        this.state = {
            books: [],

            loading: true,
            error: false,
            limit: 10,
            skip: 0,
        }
    }


    loadBooks(skip) {
        this.setState({
            loading: true
        })
        const headers = {
            'Content-Type': 'application/json',

        }

        //const url = domain_url + "/api/member/basic/from/"+ ( (this.state.page * this.state.itemsPerPage) -9 ) +"/count/"+ this.state.itemsPerPage ;
        const url = domain_url + `/api/book/limit/10/skip/${skip || this.state.skip}`;
        axios
            .get(url, headers)
            .then(res => {

                if (res.status === 200 && res.data.status === 200) {

                    var newData = res.data.data;

                    this.setState({
                        //users: res.data.data,
                        books: [...this.state.books, ...newData]
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

    onPress() {
        const limit = this.state.limit;
        var skip = this.state.skip;
        skip = skip + limit;

        this.setState({
            skip: skip,
        })

        this.loadBooks(skip)
    }

    componentDidMount() {
        this.loadBooks()
    }

    viewBook(_id) {
        this.props.navigation.navigate('BookDetail', { "_id": _id })
    }



    render() {
        return (
            <View>
                <ScrollView>



                    {this.state.error === true ?
                        <>
                            <Text style={styles.blackText}>Something went wrong</Text>
                        </>
                        :
                        <>
                            {this.state.loading === false && this.state.books.length < 1 ? <><Text>No users found</Text></> :

                                <>

                                    <FlatList data={this.state.books} renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => this.viewBook(item._id)}>
                                            <BookListItem name={item.name} picture={item.picture} />
                                        </TouchableOpacity>

                                    }
                                    />

                                </>

                            }

                        </>
                    }
                    {this.state.loading === true ?

                        <Loading /> : null
                    }

                    <TouchableOpacity style={styles.loadMore} onPress={this.onPress}>
                        <Text style={styles.whiteText}>Load more</Text>
                    </TouchableOpacity>
                    <NavButtons props={this.props} />


                </ScrollView>
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
    },
    loadMore: {
        backgroundColor: "#007bff",
    },
    whiteText: {
        color: "white",
        textAlign: "center",
        padding: "3%"
    }
});