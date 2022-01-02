import React, { Component } from 'react'
import { Button, View } from 'react-native';

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
                <Button title="Users" onPress={() => this.navigateTo("Users")} ></Button>
                <Button title="Home" onPress={() => this.navigateTo("Home")}></Button>

            </View>
        )
    }
}
