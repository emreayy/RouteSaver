import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';

const freq = 3000
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      list: []
    }

    this.intervalId = -1

  }

  handleStart = () => {
    if (this.state.isStarted) return;

    this.setState({isStarted: true})
    this.setState(prevState => {
      let list = prevState.list
      list.push([])
      return {
        list
      }
    })
    this.intervalId = setInterval(this.getLocation, freq)
  }

  handleStop = () => {
    if (!this.state.isStarted) return;

    this.setState({isStarted: false})
    clearInterval(this.intervalId)
  }

  getLocation = () => {
    let random = Math.random() * 10000
    //Alert.alert("Selamlar" + random)

    this.findCoordinates()
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords
        const lastIndex = this.state.list.length - 1
        let date = new Date()

        this.setState(prevState => {
          let list = prevState.list
          list[lastIndex].push({latitude, longitude, date})
          return {
            list
          }
        })
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  render() {
    return (
      <View>
      <Button title="Start" onPress={this.handleStart}/>
      <Button title="Stop" onPress={this.handleStop}/>
      <Text>Adet sayisi:{this.state.list.length && this.state.list[0].length}</Text>
      {
        this.state.list.map((eleman, key) => {
            
          if (eleman.length <= 0) return <Text key={key}>Boş eleman</Text>;

          return eleman.map((el, key) => {
            return <Text key={key}>{el.latitude + " - " + el.longitude + " - " + el.date.getSeconds()}</Text>
          })

          
        })
      }
      </View>
    );
  }
}
