import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class BookDetail extends Component {

    constructor(props) {
        super(props);
        const { _id } = this.props.route.params;


        this.getBookDetails = this.getBookDetails.bind(this);
        this.state = {
            _id: _id
        }
    }

    getBookDetails() {

    }
    componentDidMount() {
        this.getBookDetails();
    }
    render() {



        return (
            <View>
                <Text>Heyyyy</Text>

            </View>
        )
    }
}
