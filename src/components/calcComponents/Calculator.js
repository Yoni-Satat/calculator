import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import KeyBoard from './KeyBoard';
import Screen from './Screen';

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {id: 'CLR', btn: 'C'}, {id:'PRNT-OP', btn: '()'}, {id: 'PRNT-CL', btn: '%'}, {id: 'DIV' , btn: '÷'},
            {id: 'num7', btn: 7}, {id: 'num8', btn: 8}, {id: 'num9', btn: 9}, {id: 'MULT', btn: 'x'},
            {id: 'num4', btn: 4}, {id: 'num5', btn: 5}, {id: 'num6', btn: 6}, {id: 'MIN', btn: '-'},
            {id: 'num1', btn: 1}, {id: 'num2', btn: 2}, {id: 'num3', btn: 3}, {id: 'ADD', btn: '+'},
            {id: 'PER', btn: 'del'}, {id: 'num0', btn: 0}, {id: 'DOT', btn: '.'}, {id: 'EQU', btn: '='},
            ],
        this.state = {           
            history: [
                monitors = {
                previousTotal: 0,
                operator: '',
                runningToatl: '',
                display1: '',
                display2: null
            }
        ],
            stepNumber: 0,                   
        };
    }

    

    handleClick(i) {
        const button = this.buttons[i];
        const keyValue = button.btn;
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        if(current.display1.length === 0  && typeof(keyValue) !== 'number') {
            return;
        } 

        if(typeof(keyValue) === 'number' || keyValue === '.') {
            const newMonitors = this.numberClick(i, current);
            this.setState({
                history: history.concat([                
                        monitors = newMonitors
                ]),
                stepNumber: history.length,
            });
        } else {
            this.operatorClick(i, current);
        } 
        
        
    }

    updateOperator(i, current) {
        const button = this.buttons[i];
        const keyValue = button.btn;
        
        console.log('update operator says that current is: ', current)
    }



    operatorClick(i, current) {
        const button = this.buttons[i];
        const keyValue = button.btn;
        let display1 = current.display1;

        ToastAndroid.show('***OPERATOR CLICK***', ToastAndroid.SHORT)
        if(keyValue === 'C') {
            this.resetCalculator();
        }
        switch(keyValue) {
            case '+':
            case '-':
            case 'x':
            case '÷':
                if(display1.slice(-1) === '+' || display1.slice(-1) === '-' || display1.slice(-1) === 'x' || display1.slice(-1) === '÷') {
                    this.updateOperator(i, current);
                } else {
                    current.previousTotal = parseFloat(current.runningToatl);
                    current.operator = keyValue;
                    current.runningToatl = '';
                    current.display1 = display1 + keyValue;
                    current.display2 = current.previousTotal;
                }
            break;
            case 'del':
                this.delete();
            break;
            default:
        }
        return current;
    }

    delete() {
        const history = this.state.history;
        let stepNumber = this.state.stepNumber;
        history.pop();
        stepNumber = stepNumber - 1;
        this.setState({
            history: history,
            stepNumber: stepNumber,
        })
    }

    updateTotal(i) {
        const button = this.buttons[i];
        const keyValue = button.btn;
        const monitor = this.state.monitor;        
        let operator = monitor.operator;
        let runningToatl = monitor.runningToatl;
        let previousTotal = monitor.previousTotal;
        let display1 = monitor.display1;
        let display2 = monitor.display2;

        runningToatl = runningToatl + keyValue;
        switch(operator) {
            case '+':
            display2 = previousTotal + parseFloat(runningToatl);
            break;
            case '-':
            display2 = previousTotal - parseFloat(runningToatl);
            break;
            case 'x':
            display2 = previousTotal * parseFloat(runningToatl);
            break;
            case '÷':
            display2 = previousTotal / parseFloat(runningToatl);
            break;
            default:
            ToastAndroid.show('Incorrect button', ToastAndroid.SHORT);
        }
        this.setState({
            monitor: {
                previousTotal: previousTotal,
                operator: operator,
                runningToatl: runningToatl,
                display1: display1 + keyValue,
                display2: display2,              
            },
            
        });
    }

    numberClick(i, current) {
        const button = this.buttons[i];
        const keyValue = button.btn;
        const operator = current.operator;
        ToastAndroid.show('***NUMBER CLICK***', ToastAndroid.SHORT)
        let newMonitors = {
            previousTotal : current.previousTotal,
            operator : current.operator,
            runningToatl : current.runningToatl,
            display1 : current.display1,
            display2 : current.display2,
        }
        switch(operator) {
            case '':
                newMonitors = {
                    previousTotal : current.previousTotal,
                    operator : current.operator,
                    runningToatl : current.runningToatl + keyValue,
                    display1 : current.display1 + keyValue,
                    display2 : current.display2,
                }             
            break;
            case '+':
            case '-':
            case 'x':
            case '÷':
                this.updateTotal(i)              
            break;
            default:
        }
        console.log('newMonitors: ', newMonitors)
        return newMonitors;
    }

    resetCalculator() {
        ToastAndroid.show('RESET', ToastAndroid.SHORT)
        this.setState({            
            history: [
                monitors = {
                previousTotal: 0,
                operator: '',
                runningToatl: '',
                display1: '',
                display2: null
            }
        ],
            stepNumber: 0,     
        });
    }

  render() {
    const history = this.state.history;
    const monitors = history[this.state.stepNumber];
    const previousTotal = monitors.previousTotal;
    const operator = monitors.operator;
    const runningToatl = monitors.runningToatl;
    const display1 = monitors.display1;
    const display2 = monitors.display2;  
    console.log('history: ', history);
    console.log('stepNumber: ', this.state.stepNumber);
    
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
        <Screen input={display1} style={styles.inputField} />
        <Screen input={display2} />
        <View style={styles.navBar}>            
      </View>
        <KeyBoard
          buttons={this.buttons}
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
