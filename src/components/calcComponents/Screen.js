import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class Screen extends Component {
  render() {
    return (
      <View style={styles.monitor}>
         <Text>{this.props.input}</Text>     
      </View>
    )
  }
}

const styles = StyleSheet.create({
    monitor: {
        flex: 1.6,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 1,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    runningTotal: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 1,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Screen;
