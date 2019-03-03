import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import KeyBoard from './KeyBoard';
import Screen from './Screen';

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardButtons:
              [
                {id: 'CLR', btn: 'C'}, {id:'PRNT-OP', btn: '('}, {id: 'PRNT-CL', btn: ')'}, {id: 'DIV' , btn: '÷'},
                {id: 'num7', btn: 7}, {id: 'num8', btn: 8}, {id: 'num9', btn: 9}, {id: 'MULT', btn: 'x'},
                {id: 'num4', btn: 4}, {id: 'num5', btn: 5}, {id: 'num6', btn: 6}, {id: 'MIN', btn: '-'},
                {id: 'num1', btn: 1}, {id: 'num2', btn: 2}, {id: 'num3', btn: 3}, {id: 'ADD', btn: '+'},
                {id: 'PER', btn: '%'}, {id: 'num0', btn: 0}, {id: 'DOT', btn: '.'}, {id: 'EQU', btn: '='},
              ],
            isNumber: false,
            monitor: [],
            runningToatl: Number,
            lastValue: [],
        };
    } 

    handleClick(i) {
        const keyValue = this.state.keyboardButtons[i];
        const monitor = this.state.monitor.slice();
        const lastInMonitor = this.state.monitor[this.state.monitor.length - 1];
        const lastIndexInMonitor = this.state.monitor.indexOf(lastInMonitor);

        switch(keyValue.btn) {
            case 'C':
                this.setState({monitor: [], runningToatl: Number});
            break;
            case '=':
                ToastAndroid.show('display toatl', ToastAndroid.SHORT);
            break;
            case '-':
            case '+':
            case 'x':
            case '÷':
                if(lastInMonitor === undefined) {
                    return;
                }

                if(typeof(lastInMonitor) === 'number') {
                    this.setState({
                        monitor: [...this.state.monitor, keyValue.btn]
                    });
                }
                
                if(lastInMonitor === 'x' || lastInMonitor === '+' || lastInMonitor === '-' || lastInMonitor === '÷') {
                    console.log(lastIndexInMonitor);
                    monitor[lastIndexInMonitor] = keyValue.btn;
                    this.setState({
                        monitor: monitor  
                    });
                }
                
            break;
            default:
            this.setState({
                monitor: [...this.state.monitor, keyValue.btn],
                lastValue: [keyValue.id]
            });
                
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <Screen input={this.state.monitor} />
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
});

export default Calculator;
