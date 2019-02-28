import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import KeyBoard from './KeyBoard';
import Screen from './Screen';

export class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyboardButtons: ['C', '( )', '%', '÷',
                 '7', '8', '9', 'x',
                 '4', '5', '6', '-',
                 '1', '2', '3', '+',
                 '+/-', '0', '.', '=',

            ],
            input: 'Hello from Screen.js',
        };
    }

    handleClick(i) {
        ToastAndroid.show('Clicked' + i.btnValue, ToastAndroid.SHORT)
    }

  render() {
    return (
      <View style={styles.container}>
        <Screen input={this.state.input} />
        <View style={styles.navBar}>
        
        </View>
        <KeyBoard
          keyboardButtons={this.state.keyboardButtons}
          onPress={(i) => this.handleClick(i)}
        />
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
