import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SingleKey from './SingleKey';

export class KeyBoard extends Component {

  renderKey(i) {
    return(
      <SingleKey
        value={this.props.buttons[i]}
        onPress={() => this.props.onPress(i)}
      />
    )
  }

  render() {
    return (
      <View style={styles.keyBoard}>
        <View style={styles.boardRow}>
          {this.renderKey(0)}
          {this.renderKey(1)}
          {this.renderKey(2)}
          {this.renderKey(3)}
        </View>
        <View style={styles.boardRow}>
          {this.renderKey(4)}
          {this.renderKey(5)}
          {this.renderKey(6)}
          {this.renderKey(7)}
        </View>
        <View style={styles.boardRow}>
          {this.renderKey(8)}
          {this.renderKey(9)}
          {this.renderKey(10)}
          {this.renderKey(11)}
        </View>
        <View style={styles.boardRow}>
          {this.renderKey(12)}
          {this.renderKey(13)}
          {this.renderKey(14)}
          {this.renderKey(15)}
        </View>
        <View style={styles.boardRow}>
          {this.renderKey(16)}
          {this.renderKey(17)}
          {this.renderKey(18)}
          {this.renderKey(19)}
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
