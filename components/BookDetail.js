import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import Loading from './Loading'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

//Config
import { config } from "../config.js";
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL

export default class BookDetail extends Component {

    constructor(props) {
        super(props);
        const { _id } = this.props.route.params;
        console.log(_id)

        this.getBookDetails = this.getBookDetails.bind(this);
        this.issueBook = this.issueBook.bind(this);
        this.issueCheck = this.issueCheck.bind(this);

        this.state = {
            _id: _id,
            loading: true,
            issuing: false,
        }
    }

    async issueCheck() {
        var book_id = this.state._id;
        var jwt = await AsyncStorage.getItem("jwt");

        const form_data = {
            jwt: jwt,
        }
        const headers = {
            'Content-Type': 'application/json',

        }

        //const url = domain_url + "/api/member/basic/from/"+ ( (this.state.page * this.state.itemsPerPage) -9 ) +"/count/"+ this.state.itemsPerPage ;
        const url = domain_url + `/api/user/issue_check/id/${book_id}`;
        axios
            .post(url, form_data, headers)
            .then(res => {

                if (res.status === 200 && res.data.status === 200) {



                    console.log(res.data)
                    var issued = res.data.data;
                    this.setState({
                        issued
                    })


                }




            })
            .catch(error => {

                console.log(error);

            }
            );
    }

    async issueBook() {
        this.setState({
            issuing: true,
        })


        var book_id = this.state._id;
        var jwt = await AsyncStorage.getItem("jwt");

        const form_data = {
            jwt: jwt,
        }
        const headers = {
            'Content-Type': 'application/json',

        }

        //const url = domain_url + "/api/member/basic/from/"+ ( (this.state.page * this.state.itemsPerPage) -9 ) +"/count/"+ this.state.itemsPerPage ;
        const url = domain_url + `/api/book/issue/id/${book_id}`;
        axios
            .patch(url, form_data, headers)
            .then(res => {
                console.log("res", res)
                if (res.status === 200 && res.data.status === 200) {



                    console.log(res.data)
                    this.setState({
                        issued: true,
                    })

                }

                this.setState({ issuing: false });


            })
            .catch(error => {

                console.log(error);
                this.setState({ issuing: false, error: true });
            }
            );

    }

    getBookDetails() {
        this.setState({
            loading: true
        })
        const headers = {
            'Content-Type': 'application/json',

        }

        const url = domain_url + `/api/book/id/${this.state._id}`;
        axios
            .get(url, headers)
            .then(res => {

                if (res.status === 200 && res.data.status === 200) {



                    this.setState({
                        //users: res.data.data,
                        data: res.data.data,
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
    componentDidMount() {
        this.issueCheck();
        this.getBookDetails();
    }
    render() {

        if (this.state.loading === false) {
            var issued = this.state.issued;
            var { name, picture, available } = this.state.data;
            var author_name = this.state.data.author.name;


            var url = domain_url + picture;

            if (available === undefined) {
                available = true;
            }
        }



        return (
            <View style={styles.screen}>

                {this.state.loading ? <><Text style={styles.loading}><Loading /></Text></> :

                    <>
                        <View>
                            <View style={styles.myimage}>
                                <Image

                                    source={{ uri: url }}

                                    style={{ width: 300, height: 300 }}
                                />
                            </View>
                            <View style={styles.detailview}>
                                <View style={styles.details}>
                                    <Text style={styles.label}>
                                        Title
                                    </Text>
                                    <Text>
                                        {name}
                                    </Text>


                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.label}>
                                        Author
                                    </Text>
                                    <Text>{author_name}
                                    </Text>
                                </View>
                            </View>

                            {issued ?
                                <>
                                    <TouchableHighlight style={styles.mybtn3}>
                                        <Text style={styles.whiteText}>
                                            Issued

                                        </Text>
                                    </TouchableHighlight>
                                </>
                                :
                                <>

                                    {available ?
                                        <>
                                            <TouchableHighlight style={styles.mybtn} onPress={() => this.issueBook()}>
                                                <Text style={styles.whiteText}>
                                                    {this.state.issuing ? <Loading color="white" size="large" /> : <>Issue book</>}

                                                </Text>
                                            </TouchableHighlight>

                                        </>
                                        :
                                        <>
                                            <TouchableHighlight style={styles.mybtn2} >
                                                <Text style={styles.blackText}>Book not available to issue</Text>
                                            </TouchableHighlight>
                                        </>
                                    }
                                </>
                            }


                        </View>
                    </>


                }


            </View>
        )
    }
}

const styles = StyleSheet.create({

    screen: {
        marginTop: "10%",

    },
    view: {
        borderBottomWidth: 1,
        borderColor: 'gray',

        paddingBottom: 80,
        paddingTop: 30,
    },
    listItem: {
        padding: 15,
        marginBottom: 5,
        textAlign: 'center',
        color: 'black'
    },
    blackText: {
        color: 'black',
        textAlign: 'center',
    },
    loadMore: {
        backgroundColor: "#007bff",
    },
    whiteText: {
        color: "white",
        textAlign: "center",
        padding: "3%"
    },
    myimage: {


        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    details: {

        padding: "1%",
        paddingLeft: "12%",

    },
    detailview: {
        marginTop: '12%',
    },
    loading: {
        textAlign: 'center',
        marginTop: "55%"
    },
    mybtn: {
        backgroundColor: "#007bff",
        marginTop: "20%",
        marginLeft: "10%",
        marginRight: "10%",
        padding: "1.5%",
        width: "80%"
    },
    mybtn2: {

        marginTop: "10%",
        marginLeft: "10%",
        marginRight: "10%",
        padding: "1.5%",
        width: "80%"
    },
    mybtn3: {
        backgroundColor: "gray",
        marginTop: "10%",
        marginLeft: "10%",
        marginRight: "10%",
        padding: "1.5%",
        width: "80%"
    },
    label: {
        fontWeight: "900",
        fontSize: 18,

    },
});
