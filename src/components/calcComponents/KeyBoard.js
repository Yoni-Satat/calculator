import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SingleKey from './SingleKey';

export class KeyBoard extends Component {

  render() {
    return (
      <View style={styles.keyBoard}>
        <View style={styles.boardRow}>
          <SingleKey title='C' />
          <SingleKey title='()'/>
          <SingleKey title='%' />
          <SingleKey title='÷' />
        </View>
        <View style={styles.boardRow}>
          <SingleKey title='7' />
          <SingleKey title='8'/>
          <SingleKey title='9' />
          <SingleKey title='X' />
        </View>
        <View style={styles.boardRow}>
          <SingleKey title='4' />
          <SingleKey title='5'/>
          <SingleKey title='6' />
          <SingleKey title='-' />
        </View>
        <View style={styles.boardRow}>
          <SingleKey title='1' />
          <SingleKey title='2'/>
          <SingleKey title='3' />
          <SingleKey title='+' />
        </View>
        <View style={styles.boardRow}>
          <SingleKey title='+/-' />
          <SingleKey title='0'/>
          <SingleKey title='.' />
          <SingleKey title='=' />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    keyBoard: {
        flex: 5,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
    },
    boardRow: {
      flexDirection: 'row',
      justifyContent: 'center',
  }
});

export default KeyBoard;
