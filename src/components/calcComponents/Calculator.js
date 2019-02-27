import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import KeyBoard from './KeyBoard';

export class Calculator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputField}>
          
        </View>
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
    inputField: {
        flex: 3,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 1,
        borderColor: '#000',
        borderWidth: 1,
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
