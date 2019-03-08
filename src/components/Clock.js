/*Example of Reac Native Life Cycle*/
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    // runs after the component output has been rendered
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello, it is now: {this.state.date.toLocaleTimeString()} o'clock</Text>
      </View>
    );
  }
}

export default Clock;