import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native'


//Config
import { config } from "../config.js";
const configData = config();
const domain_url = configData.EXPRESS_JS_SERVER_URL


export default class BookListItem extends Component {
    render() {



        const { name, picture } = this.props;
        const url = domain_url + picture;
        return (
            <View style={styles.view}>

                <Text style={styles.listItem} numberOfLines={1} >{name}</Text>
                <View style={styles.myimage}>
                    <Image

                        source={{ uri: url }}

                        style={{ width: 300, height: 300 }}
                    />
                </View>



            </View>
        )
    }
}


const styles = StyleSheet.create({

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

    }
});