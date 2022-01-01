import React, { Component } from 'react'
import { View, Text, Button, TouchableHighlight, StyleSheet } from 'react-native'
import NavButtons from './NavButtons';

export default class Home extends Component {
    constructor(props) {
        super(props);

    }


    render() {

        return (
            <View>
                <Text style={styles.blackText}>Home</Text>

                <NavButtons props={this.props} />


            </View>
        )
    }
}


const styles = StyleSheet.create({
    blackText: {
        color: 'black',
    }

});
