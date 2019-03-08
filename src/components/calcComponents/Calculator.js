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
            monitor: {
                previousTotal: 0,
                operator: '',
                runningToatl: '',                
            },
            display1: '',
            display2: null,           
        };
    }

    handleClick(i) {
        const button = this.state.keyboardButtons[i];
        const keyType = typeof(button.btn);
        const keyId = button.id;
        
        if(keyType === 'number' || keyId === 'DOT') {
            this.numberClick(i)
        } else {
            this.operatorClick(i)
        } 
    }

    updateOperator(i) {
        const button = this.state.keyboardButtons[i];
        const keyValue = button.btn;
        const operator = this.state.monitor.operator;
        console.log('updating operator: ', keyValue)
        let display1 = this.state.display1;
        if(operator === '+' || operator === '-' ||  operator === 'x' || operator === '÷') {
            let operator = keyValue;
            display1 = display1.replace(/.$/, keyValue);
            this.setState({
                monitor: {
                    previousTotal: this.state.monitor.previousTotal,
                    operator: operator,
                    runningToatl: this.state.monitor.runningToatl
                },
                display1: display1,
                display2: this.state.display2,
            });
        }
    }



    operatorClick(i) {
        const button = this.state.keyboardButtons[i];
        const keyValue = button.btn;
        const monitor = this.state.monitor;        
        const operator = monitor.operator;
        let runningToatl = monitor.runningToatl;
        let previousTotal = monitor.previousTotal;
        let display1 = this.state.display1;
        let display2 = this.state.display2;
                
        if(keyValue === 'C') {
            this.resetCalculator();
        }
        if(display1.length === 0) {
            return;
        }

        switch(keyValue) {
            case '+':
            case '-':
            case 'x':
            case '÷':
                if(display1.slice(-1) === '+' || display1.slice(-1) === '-' || display1.slice(-1) === 'x' || display1.slice(-1) === '÷') {
                    this.updateOperator(i);
                }
                if(operator !== '') {
                    previousTotal = display2;
                    this.setState({
                        monitor: {
                            previousTotal: previousTotal,
                            operator: keyValue,
                            runningToatl: '',
                        },
                        display1: display1 + keyValue,
                        display2: null,
                    });
                } else {
                    previousTotal = parseFloat(display1)
                    this.setState({
                        monitor: {
                            previousTotal: previousTotal,
                            operator: keyValue,
                            runningToatl: '',
                        },
                        display1: display1 + keyValue,
                        display2: display2
                    });
                } 
            break;
            case '=' :
                if(display2 === null) {
                    return;
                }
                this.setState({
                monitor: {
                    previousTotal: display2,
                    operator: '',
                    runningToatl: '',                
                },
                display1: display2.toString(),
                display2: null,
                });
            break;            
            default:
            console.log('this btn is not yet included in handleOperator');
        }
    }

    numberClick(i) {
        const button = this.state.keyboardButtons[i];
        const keyValue = button.btn;
        const monitor = this.state.monitor;        
        let operator = monitor.operator;
        let runningToatl = monitor.runningToatl;
        let previousTotal = monitor.previousTotal;
        let display1 = this.state.display1;
        let display2 = this.state.display2;

        switch(operator) {
            case '':
                this.setState({
                    monitor: {
                        previousTotal: previousTotal,
                        operator: operator,
                        runningToatl: runningToatl,                
                    },
                    display1: display1 + keyValue,
                    display2: display2,
                });
                
            break;
            case '+':
                runningToatl = runningToatl + keyValue;
                display2 = previousTotal + parseFloat(runningToatl);
                this.setState({
                    monitor: {
                        previousTotal: previousTotal,
                        operator: operator,
                        runningToatl: runningToatl,                
                    },
                    display1: display1 + keyValue,
                    display2: display2,
                });
            break;
            case '-':
                runningToatl = runningToatl + keyValue;
                display2 = previousTotal - parseFloat(runningToatl);
                this.setState({
                    monitor: {
                        previousTotal: previousTotal,
                        operator: operator,
                        runningToatl: runningToatl,                
                    },
                    display1: display1 + keyValue,
                    display2: display2,
                });
            break;
            case 'x':
                runningToatl = runningToatl + keyValue;
                display2 = previousTotal * parseFloat(runningToatl)
                this.setState({
                    monitor: {
                        previousTotal: previousTotal,
                        operator: operator,
                        runningToatl: runningToatl,                
                    },
                    display1: display1 + keyValue,
                    display2: display2,
                });
            break;
            case '÷':
                runningToatl = runningToatl + keyValue;
                display2 = previousTotal / parseFloat(runningToatl)
                this.setState({
                    monitor: {
                        previousTotal: previousTotal,
                        operator: operator,
                        runningToatl: runningToatl,                
                    },
                    display1: display1 + keyValue,
                    display2: display2,
                });
            break;

            default:
        }
    }



    resetCalculator() {
        this.setState({            
            monitor: {
                previousTotal: 0,
                operator: '',
                runningToatl: '',                
            },
            display1: '',
            display2: null,
        });
    }

  render() {
        const monitor = this.state.monitor;
        const previousTotal = monitor.previousTotal;
        const operator = monitor.operator;
        const runningToatl = monitor.runningToatl;
        const display1 = this.state.display1;
        const display2 = this.state.display2;
        
        console.log('---------------------')
        console.log('previousTotal: ', previousTotal, ', typeof: ', typeof(previousTotal));
        console.log('operator: ', operator);
        console.log('runningToatl: ', runningToatl, ', typeof: ', typeof(runningToatl)); 
        console.log('---------------------');
        console.log('display1: ', display1, ', typeof: ', typeof(display1));
        console.log('display2: ', display2, ', typeof: ', typeof(display2));
        console.log('---------------------');

    return (
      <View style={styles.container}>
        <Screen input={this.state.display1} style={styles.inputField} />
        <Screen input={this.state.display2} />
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
    },
});


export default Calculator;
