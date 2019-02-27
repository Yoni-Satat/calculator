import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class Calculator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputField}>
        
        </View>
        <View style={styles.navBar}>
        
        </View>
        <View style={styles.keyPad}>
        
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightyellow',
    },
    inputField: {
        flex: 3,
        backgroundColor: 'blue',
    },
    navBar: {
        flex: 1,
        backgroundColor: 'green',
    },
    keyPad: {
        flex: 5,
        backgroundColor: 'purple',
    }
})

export default Calculator
