import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';

const freq = 3000
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false
    }

    this.intervalId = -1
    this.list = []

  }

  handleStart = () => {
    if (this.state.isStarted) return;

    this.setState({isStarted: true})
    let date = new Date()
    this.intervalId = setInterval(this.getLocation, freq)
  }

  handleStop = () => {
    if (!this.state.isStarted) return;

    this.setState({isStarted: false})
    clearInterval(this.intervalId)
  }

  getLocation = () => {
    let random = Math.random() * 10000
    Alert.alert("Selamlar" + random)
  }

  render() {
    return (
      <View>
      <Button title="Start" onPress={this.handleStart}/>
      <Button title="Stop" onPress={this.handleStop}/>
      </View>
    );
  }
}
