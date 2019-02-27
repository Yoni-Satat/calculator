import React, { Component } from 'react';
import {View, Button } from 'react-native';

export class SingleKey extends Component {
  render() {
    return (
      <View style={{width: 60, height: 60}}>
        <Button
          title={this.props.title}
          onPress={this.handleClick}
          color='#D6D6E8'
          accessibilityLabel='Calculator button'
        />
      </View>
    )
  }
}

export default SingleKey;
