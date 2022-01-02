import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default class Loading extends Component {
    render() {
        return (
            <View>
                <ActivityIndicator size="small" />
            </View>
        )
    }
}
