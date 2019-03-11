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
        const history = this.state.history.slice(0);
        const current = history[history.length -1];
        if(current.display1.length === 0  && typeof(keyValue) !== 'number') {
            return;
        }

        if(keyValue === 'C') {
            this.resetCalculator();
            return;
        }
        if(keyValue === 'del') {
            let history = this.state.history;
            history.pop();
            this.setState({
                history: history
            })
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
            const newMonitors = this.operatorClick(i, current);
            this.setState({
                history: history.concat([                
                        monitors = newMonitors
                ]),
                stepNumber: history.length,
            });
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
        let newMonitors = {
            previousTotal : current.previousTotal,
            operator : current.operator,
            runningToatl : current.runningToatl,
            display1 : current.display1,
            display2 : current.display2,
        }        
        switch(keyValue) {
            case '+':
            case '-':
            case 'x':
            case '÷':
                if(display1.slice(-1) === '+' || display1.slice(-1) === '-' || display1.slice(-1) === 'x' || display1.slice(-1) === '÷') {
                    this.updateOperator(i, current);
                } 
                if(current.previousTotal === 0) {
                    newMonitors = {
                        previousTotal: parseFloat(current.runningToatl),
                        operator: current.operator + keyValue,
                        runningToatl: '',
                        display1: current.display1 + keyValue,
                        display2: parseFloat(current.runningToatl),
                    }
                } else {
                    newMonitors = {
                        previousTotal: current.display2,
                        operator: keyValue,
                        runningToatl: '',
                        display1: current.display1 + keyValue,
                        display2: null,
                    }
                }
            break;
            default:
        }
        return newMonitors;
    }

    updateTotal(i, current) {
        const button = this.buttons[i];
        const keyValue = button.btn;
        let newMonitors = {
            previousTotal : current.previousTotal,
            operator : current.operator,
            runningToatl : current.runningToatl,
            display1 : current.display1,
            display2 : current.display2,
        }

        current.runningToatl = current.runningToatl + keyValue;
        newMonitors.runningToatl = current.runningToatl;
        newMonitors.display1 = current. display1 + keyValue
        switch(current.operator) {
            case '+':
            newMonitors.display2 = current.previousTotal + parseFloat(current.runningToatl);
            break;
            case '-':
            newMonitors.display2 = current.previousTotal - parseFloat(current.runningToatl);
            break;
            case 'x':
            newMonitors.display2 = current.previousTotal * parseFloat(current.runningToatl);
            break;
            case '÷':
            newMonitors.display2 = current.previousTotal / parseFloat(current.runningToatl);
            break;
            default:
            ToastAndroid.show('Incorrect button', ToastAndroid.SHORT);
        }
        return newMonitors;
    }

    numberClick(i, current) {
        const button = this.buttons[i];
        const keyValue = button.btn;
        const operator = current.operator;
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
                newMonitors =  this.updateTotal(i, current);              
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
    const monitors = history[history.length - 1];
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
