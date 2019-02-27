import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export class KeyBoard extends Component {
  render() {
    return (
      <View style={styles.keyPad}>
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
    keyPad: {
        flex: 5,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
    }
});

export default KeyBoard;
