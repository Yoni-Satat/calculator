import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import KeyBoard from './KeyBoard';
import Screen from './Screen';

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardButtons:
                 ['C', '( )', '%', '÷',
                 7, 8, 9, 'x',
                 4, 5, 6, '-',
                 1, 2, 3, '+',
                 '+/-', 0, '.', '=',],
            
                screen: []
        };
    }

    handleClick(i) {
        const keyValue = this.state.keyboardButtons[i];
        if(keyValue[i] === 'C') {
            this.setState({
                screen: []
            })
        } else {
            this.setState({
                screen: [...this.state.screen, keyValue]
            })
        }         
    }

  render() {
    return (
      <View style={styles.container}>
        <Screen input={this.state.screen} />
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
