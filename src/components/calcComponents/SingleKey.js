import React, { Component } from 'react';
import {Text, StyleSheet, TouchableOpacity } from 'react-native';

export class SingleKey extends Component {
    render() {
    return (
        <TouchableOpacity style={styles.btn} onPress={() => this.props.onPress()}>
            <Text>{this.props.value}</Text>
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
