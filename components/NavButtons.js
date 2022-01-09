import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default class NavButtons extends Component {

    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo(path) {
        this.props.props.navigation.navigate(path)
        console.log(path)
    }


    render() {
        return (
            <View style={{ marginTop: 20 }}>


                <TouchableOpacity onPress={() => this.navigateTo("Home")} style={styles.navButton}>
                    <Text style={styles.whiteText}>Home</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.navigateTo("Users")} style={styles.navButton}>
                    <Text style={styles.whiteText}>Users</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.navigateTo("Profile")} style={styles.navButton}>
                    <Text style={styles.whiteText}>My profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.navigateTo("Books")} style={styles.navButton}>
                    <Text style={styles.whiteText}>Books</Text>
                </TouchableOpacity>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    navButton: {
        backgroundColor: "#007bff",

        padding: "3%",
        width: "33%"
    },
    blackText: {
        color: 'black',
    },

    whiteText: {

        color: "white",
        textAlign: "center"

    }
});