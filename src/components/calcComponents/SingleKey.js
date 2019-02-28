import React, { Component } from 'react';
import {Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';

export class SingleKey extends Component {

    handleClick = () => {
        ToastAndroid.show('clicked: ' + this.props.title, ToastAndroid.SHORT)
    }

  render() {
    return (
        <TouchableOpacity style={styles.btn} onPress={this.handleClick}>
            <Text>{this.props.title}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'lightblue',
        flex: 1,
        height: 75,
        width: 75,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SingleKey;
