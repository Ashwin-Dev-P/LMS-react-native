import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import NavButtons from './NavButtons'

export default class MyProfile extends Component {
    render() {
        return (
            <View>
                <Text>My profile</Text>
                <Text>My issued books</Text>
                <NavButtons props={this.props} />
            </View>
        )
    }
}

