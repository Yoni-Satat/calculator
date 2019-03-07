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
            newTotal: true,
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

    checkLastValue(i) {
        let arithmeticOperators = ['+','-','x','÷'];
        let lastCharInDisplay = this.state.display1.slice(-1);
        console.log(lastCharInDisplay);
        arithmeticOperators.forEach((a) => {
            if(a === lastCharInDisplay) {
                this.updateOperator(i)
            } 
        });
    }

    updateOperator(i) {
        const button = this.state.keyboardButtons[i];
        const keyValue = button.btn;
        console.log('keyValue: ', keyValue)
        const operator = this.state.monitor.operator;
        let display1 = this.state.display1;
        if(operator === '+' || operator === '-' || operator === 'x' || operator === '÷') {
            let operator = keyValue;
            display1 = display1.replace(/.$/, keyValue);
            this.setState({
                monitor: {
                    previousTotal: this.state.monitor.previousTotal,
                    operator: operator,
                    runningToatl: this.state.monitor.runningToatl
                },
                display1: display1,
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
        const newTotal = this.state.newTotal;
        let display1 = this.state.display1;
        let display2 = this.state.display2;
                
        if(keyValue === 'C') {
            this.resetCalculator();
        }
        if(previousTotal === 0 && runningToatl === '') {
            return;
        }

        switch(keyValue) {
            case '+':
                if(display1.slice(-1) === '+' || display1.slice(-1) === '-' || display1.slice(-1) === 'x' || display1.slice(-1) === '÷') {
                    this.updateOperator(i);
                } else if(runningToatl === '') {                     
                    this.setState({
                        newTotal: true,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: runningToatl + keyValue,                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                 } else {
                    previousTotal = previousTotal + parseFloat(runningToatl);
                    this.setState({
                        newTotal: false,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: '',                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                 }     
            break;
            case 'x':
                if(display1.slice(-1) === '+' || display1.slice(-1) === '-' || display1.slice(-1) === 'x' || display1.slice(-1) === '÷') {
                    this.updateOperator(i);
                } else if(runningToatl === '') {                     
                    this.setState({
                        newTotal: true,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: runningToatl + keyValue,                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                } else {
                    previousTotal === 0 ? previousTotal = previousTotal + parseFloat(runningToatl) :
                                          previousTotal = previousTotal * parseFloat(runningToatl);
                    this.setState({
                        newTotal: false,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: '',                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                }                
            break;
            case '-':
                if(display1.slice(-1) === '+' || display1.slice(-1) === '-' || display1.slice(-1) === 'x' || display1.slice(-1) === '÷') {
                    this.updateOperator(i);
                } else if(runningToatl === '') {                     
                    this.setState({
                        newTotal: true,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: runningToatl + keyValue,                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                } else {
                    previousTotal === 0 ? previousTotal = previousTotal + parseFloat(runningToatl) :
                                          previousTotal = previousTotal - parseFloat(runningToatl);
                    this.setState({
                        newTotal: false,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: '',                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                }  
            break;
            case '÷':
                if(display1.slice(-1) === '+' || display1.slice(-1) === '-' || display1.slice(-1) === 'x' || display1.slice(-1) === '÷') {
                    this.updateOperator(i);
                } else if(runningToatl === '') {                     
                    this.setState({
                        newTotal: true,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: runningToatl + keyValue,                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                } else {
                    previousTotal === 0 ? previousTotal = previousTotal + parseFloat(runningToatl) :
                                          previousTotal = previousTotal / parseFloat(runningToatl);
                    this.setState({
                        newTotal: false,
                    monitor: {
                        previousTotal: previousTotal,
                        operator: keyValue,
                        runningToatl: '',                
                    },
                    display1: display1 + keyValue,
                    display2: null,
                    });
                }           
            break;
            case '=' :
                console.log('total: ', display2, typeof(display2));
                runningToatl = display2.toString();
                console.log('runningTotal: ', runningToatl, typeof(runningToatl));
                this.setState({
                    newTotal: true,
                monitor: {
                    previousTotal: 0,
                    operator: keyValue,
                    runningToatl: runningToatl,                
                },
                display1: runningToatl,
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
        const newTotal = this.state.newTotal;

        if(operator === '') {
            console.log('---from numberClick---')
            console.log('no operator')
            runningToatl = runningToatl + keyValue;
            display1 = display1 + keyValue;
            this.setState({
                newTotal: newTotal,
                monitor: {
                    previousTotal: previousTotal,
                    operator: '',
                    runningToatl: runningToatl,                
                },
                display1: display1,
                display2: null,               
            });
        }
        
        switch(operator) {
            case '+':
            runningToatl = runningToatl + keyValue;
            display2 = previousTotal + parseFloat(runningToatl)
            this.setState({
                newTotal: !newTotal,
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
                display2 = previousTotal - parseFloat(runningToatl)
                this.setState({
                    newTotal: !newTotal,
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
                    newTotal: !newTotal,
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
                    newTotal: !newTotal,
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
            newTotal: true,
            monitor: {
                previousTotal: 0,
                operator: '',
                runningToatl: '',                
            },
            display1: '',
            display2: null,
        });
    }

    

    add(number) {
        this.state.runningToatl = parseFloat(this.state.previousTotal) + parseFloat(number);
    }

    subtract(number) {
        this.state.runningToatl = parseFloat(this.state.previousTotal) - parseFloat(number);
    }

    multiply(number) {
        this.state.runningToatl = parseFloat(this.state.previousTotal) * parseFloat(number);
    }

    divide(number) {
        this.state.runningToatl = parseFloat(this.state.previousTotal) / parseFloat(number);
    }

  render() {
        const monitor = this.state.monitor;
        const previousTotal = monitor.previousTotal;
        const operator = monitor.operator;
        const runningToatl = monitor.runningToatl;
        const newTotal = this.state.newTotal;
        
        console.log('---------------------')
        console.log('previousTotal: ', previousTotal);
        console.log('operator: ' ,operator);
        console.log('runningToatl: ', runningToatl);                       
        console.log('newTotal: ', newTotal);
        console.log('---------------------')
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
