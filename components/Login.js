import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import NavButtons from './NavButtons'

export default class Login extends Component {
    render() {
        return (
            <View>
                <Text style={styles.blackText} >Login</Text>

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
