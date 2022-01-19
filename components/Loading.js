import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={this.props.size} color={this.props.color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 5,
  },
});
