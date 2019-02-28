import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import KeyBoard from './KeyBoard';
import Screen from './Screen';

export class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {input: 'Hello from Screen.js'};
    }

  render() {
    return (
      <View style={styles.container}>
        <Screen input={this.state.input} />
        <View style={styles.navBar}>
        
        </View>
        <KeyBoard />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    navBar: {
        flex: 1,
        backgroundColor: 'lightgray',
        borderBottomLeftRadius: 1,
        borderColor: '#000',
        borderWidth: 1,
    }
})

export default Calculator;
