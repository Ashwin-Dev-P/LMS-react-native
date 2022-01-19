import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import NavButtons from './NavButtons';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <NavButtons props={this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blackText: {
    color: 'black',
  },
});
