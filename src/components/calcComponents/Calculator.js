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
                display2: null,
                parentheses: {
                    prevTot: 0,
                    runTot: '',
                    isOpen: false,
                    operator: '',
                    total: 0,
                },
            }
        ],
            stepNumber: 0,              
        };
    }    

    handleClick(i) {
        const button = this.buttons[i];
        let keyValue = button.btn;
        const history = this.state.history.slice(0);
        const current = history[history.length -1];
        const display1 = current.display1;
        let newMonitors = {
            previousTotal: current.previousTotal,
            operator: current.operator,
            runningToatl: current.runningToatl,
            display1: display1,
            display2: current.display2,
            parentheses: {
                prevTot: current.parentheses.prevTot,
                runTot: current.parentheses.runTot,
                isOpen: current.parentheses.isOpen,
                operator: current.parentheses.operator,
                total: current.parentheses.total,
            }
        }

        if(display1.length === 0  && typeof(keyValue) !== 'number') {
            return;
        }

        if(typeof(keyValue) === 'number' || keyValue === '.') {
            newMonitors = this.numberClick(keyValue, current, newMonitors);
            this.setState({
                history: [...this.state.history, newMonitors],
                stepNumber: history.length,
            });
        } else {
            switch(keyValue) {
                case 'C':
                    this.resetCalculator();
                break;
                case 'del':
                    let history = this.state.history;
                    if(history.length === 0) {
                        return;
                    }
                    history.pop();
                    this.setState({
                        history: history
                    });
                break;
                case '+':
                case '-':
                case 'x':
                case '÷':
                    history = this.state.history.slice(0);
                    history = this.operatorClick(keyValue, current, history);
                    this.setState({
                        history: history,
                        stepNumber: history.length,
                    })
                break;
                case '()':
                    history = this.state.history.slice(0);
                    history = this.handleParentheses(keyValue, current, history);
                    this.setState({
                        history: history,
                        stepNumber: history.length,
                    })                  
                break;
            }
        }
    }

    checkDoubleOperator(current) {
        const lastInDisplay1 = current.display1.slice(-1);
        let lastInDisplay1IsOperator = false;
        const operators = ['+', '-', 'x', '÷'];
        for(let i = 0; i < operators.length; i++) {
            if(lastInDisplay1 === operators[i]) {
                lastInDisplay1IsOperator = true
                return lastInDisplay1IsOperator;
            }
        }
        return lastInDisplay1IsOperator;
    }

    handleParentheses(keyValue, current, history) {
        let lastInDisplay1 = current.display1.slice(-1);
        let isNaN = parseFloat(lastInDisplay1);
        let isOpen = current.parentheses.isOpen;
        console.log(history)
        let newMonitors = {
            previousTotal : current.previousTotal,
            operator : current.operator,
            parentheses: {
                prevTot: current.parentheses.prevTot,
                runTot: current.parentheses.runTot,
                isOpen: current.parentheses.isOpen,
                operator: current.parentheses.operator,
                total: current.parentheses.total,
            },
            runningToatl : current.runningToatl,
            display1 : current.display1,
            display2 : current.display2,
        }
        if(isNaN < 0 || isNaN > 0 ) {
            ToastAndroid.show('Please choose an operator first', ToastAndroid.LONG)
        } else if(!isOpen) {
            keyValue = keyValue.slice(0, -1);
            newMonitors = {
                previousTotal : current.previousTotal,
                operator : current.operator,
                parentheses: {
                    prevTot: current.parentheses.prevTot,
                    runTot: current.parentheses.runTot,
                    isOpen: true,
                    operator: current.parentheses.operator,
                    total: current.parentheses.total,
                },
                runningToatl : current.runningToatl,
                display1 : current.display1 + keyValue,
                display2 : current.display2,
            }
        } else {
            keyValue = keyValue.slice(-1);
            newMonitors = {
                previousTotal : current.previousTotal,
                operator : current.operator,
                parentheses: {
                    prevTot: current.parentheses.prevTot,
                    runTot: current.parentheses.runTot,
                    isOpen: false,
                    operator: current.parentheses.operator,
                    total: current.parentheses.total,
                },
                runningToatl : current.runningToatl,
                display1 : current.display1 + keyValue,
                display2 : current.display2,
            }
        }
        history = [...history, newMonitors]
        return history;
    }

    updateOperator(keyValue, current) {   
        let updatedMonitors = {
            previousTotal : current.previousTotal,
            operator : current.operator.replace(/.$/, keyValue),
            parentheses: current.parentheses,
            runningToatl : current.runningToatl,
            operator: current.parentheses.operator,
            display1 : current.display1.replace(/.$/, keyValue),
            display2 : current.display2,
        }
        return updatedMonitors;
    }



    operatorClick(keyValue, current, history ,newMonitors) {
        const index = history.indexOf(current);        
        const display2 = current.display2;
        const isOpen = current.parentheses.isOpen;
        const lastInDisplay1IsOperator =  this.checkDoubleOperator(current);

        if(!isOpen) {
            if(lastInDisplay1IsOperator) {
                const updated = this.updateOperator(keyValue, current);
                history[index] = updated;
            } else if(display2 === null) {
                newMonitors = {
                    previousTotal: parseFloat(current.runningToatl),
                    operator: keyValue,
                    parentheses: {
                        prevTot: current.parentheses.prevTot,
                        runTot: current.parentheses.runTot,
                        isOpen: current.parentheses.isOpen,
                        operator: current.parentheses.operator,
                        total: current.parentheses.total,
                    },
                    runningToatl: '',
                    display1: current.display1 + keyValue,
                    display2: current.display2,
                }
                history = [...history, newMonitors];
            } else {                    
                newMonitors = {
                    previousTotal: display2,
                    operator: keyValue,
                    parentheses: {
                        prevTot: current.parentheses.prevTot,
                        runTot: current.parentheses.runTot,
                        isOpen: current.parentheses.isOpen,
                        operator: current.parentheses.operator,
                        total: current.parentheses.total,
                    },
                    runningToatl: '',
                    display1: current.display1 + keyValue,
                    display2: null,
                }
                history = [...history, newMonitors];
            }
            return history;
        } else {
            if(lastInDisplay1IsOperator) {
                const updated = this.updateOperator(keyValue, current);
                history[index] = updated;
            } else if(display2 === null) {
                ToastAndroid.show('Parentheses are open', ToastAndroid.SHORT);
                prevTot = parseFloat(current.parentheses.runTot);
                newMonitors = {
                    previousTotal: display2,
                    operator: current.operator,
                    parentheses: {
                        prevTot: prevTot,
                        runTot: '',
                        isOpen: current.parentheses.isOpen,
                        operator: keyValue,
                        total: current.parentheses.total,
                    },
                    runningToatl: '',
                    display1: current.display1 + keyValue,
                    display2: null,
                }
                history = [...history, newMonitors];
            } else {
                newMonitors = {
                    previousTotal: current.previousTotal,
                    operator: current.operator,
                    runningToatl: current.runningToatl,
                    display1: current.display1 + keyValue,
                    display2: null,                    
                    parentheses: {
                        prevTot: current.parentheses.total,
                        runTot: '',
                        isOpen: current.parentheses.isOpen,
                        operator: keyValue,
                        total: 0,
                    },
                }
                history = [...history, newMonitors];
            }
            return history;
        }
        
    }

    updateTotal(newMonitors, isOpen) {
        console.log('update total, new monitors = ', newMonitors)

        if(!isOpen) {
            let runningToatl = newMonitors.runningToatl;
            switch(newMonitors.operator) {
                case '+':
                newMonitors.display2 = newMonitors.previousTotal + parseFloat(runningToatl);
                break;
                case '-':
                newMonitors.display2 = newMonitors.previousTotal - parseFloat(runningToatl);
                break;
                case 'x':
                newMonitors.display2 = newMonitors.previousTotal * parseFloat(runningToatl);
                break;
                case '÷':
                newMonitors.display2 = newMonitors.previousTotal / parseFloat(runningToatl);
                break;
                default:
                ToastAndroid.show('Incorrect button', ToastAndroid.SHORT);
            }
        } else {
            switch(newMonitors.operator) {
                case '+':
                newMonitors.display2 = newMonitors.previousTotal + newMonitors.parentheses.total;
                break;
                case '-':
                newMonitors.display2 = newMonitors.parentheses.prevTot - newMonitors.parentheses.total;
                break;
                case 'x':
                newMonitors.display2 = newMonitors.parentheses.prevTot * newMonitors.parentheses.total;
                break;
                case '÷':
                newMonitors.display2 = newMonitors.parentheses.prevTot / newMonitors.parentheses.total;
                break;
                default:
                ToastAndroid.show('Incorrect button', ToastAndroid.SHORT);                
            }
        }            
        return newMonitors;
    }

    numberClick(keyValue, current, newMonitors) {
        const isOpen = current.parentheses.isOpen;
        console.log(isOpen);
        
        if(!isOpen) {
            switch(current.operator) {
                case '':
                    newMonitors.runningToatl = current.runningToatl + keyValue;
                    newMonitors.display1 =  current.display1 + keyValue;    
                break;
                case '+':
                case '-':
                case 'x':
                case '÷':
                    newMonitors.runningToatl = current.runningToatl + keyValue;
                    newMonitors.display1 =  current.display1 + keyValue;
                    newMonitors =  this.updateTotal(newMonitors, isOpen);              
                break;
                default:
            }
        } else {
            newMonitors.display1 =  current.display1 + keyValue;
            let total = current.parentheses.total;
            let runTot = current.parentheses.runTot + keyValue;
            newMonitors.parentheses.runTot = runTot;
            let prevTot = current.parentheses.prevTot;
            switch(current.parentheses.operator) {
                case '':                    
                    total = parseFloat(runTot);
                    newMonitors.parentheses.total = total;                   
                    newMonitors = this.updateTotal(newMonitors, isOpen);     
                break;
                case '+':
                    newMonitors.parentheses.total = prevTot + parseFloat(runTot);
                    newMonitors = this.updateTotal(newMonitors, isOpen);
                case '-':
                    newMonitors.parentheses.total = prevTot - parseFloat(runTot);
                    newMonitors = this.updateTotal(newMonitors, isOpen);
                break;
                case 'x':
                    newMonitors.parentheses.total = prevTot * parseFloat(runTot);
                    newMonitors = this.updateTotal(newMonitors, isOpen);
                break;
                case '÷':
                    newMonitors.parentheses.total = prevTot / parseFloat(runTot);
                    newMonitors = this.updateTotal(newMonitors, isOpen);
                break;
                default:
            }
        }
        return newMonitors;
    }
    

    resetCalculator() {
        this.setState({            
            history: [
                monitors = {
                previousTotal: 0,
                operator: '',
                parentheses: {
                    prevTot: 0,
                    runTot: '',
                    isOpen: false,
                    operator: '',
                    total: 0,
                },
                runningToatl: '',
                display1: '',
                display2: null
            }
        ],
            stepNumber: 0,
            isOperator: false,    
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
    console.log('*** from render ***'); 
    console.log('length: ', history.length, 'history: ', history);
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
