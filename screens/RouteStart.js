import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, Alert,ToastAndroid} from 'react-native';
import Util from '../Util'

const freq = 10000
export default class RouteStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isStarted: false,
      list: []
    }

    this.intervalId = -1
    this.fillHistory()
  }

  fillHistory = async () => {
    let coordListData = await Util.retrieveData("coordList")
    let coordList = JSON.parse(coordListData)
    coordList = coordList.map(eleman => {
      return eleman.map(el => {
        el.date = new Date(el.date)
        return el
      })
    })

    this.setState({ list: coordList })
  }

  handleStart = () => {
    if (this.state.isStarted) return;
    ToastAndroid.show('Konumunuz alınıyor', ToastAndroid.SHORT);
    this.setState({ isStarted: true })
    this.setState(prevState => {
      let list = prevState.list
      list.push([])
      return {
        list
      }
    })
    this.setState({seconds:0})
    this.tick()
    this.intervalId = setInterval(this.getLocation, freq)
  }

  handleStop = async () => {
    if (!this.state.isStarted) return;
    ToastAndroid.show('Konumlarınız kaydedildi', ToastAndroid.SHORT);
    this.setState({ isStarted: false })
    clearInterval(this.intervalId)
    clearInterval(this.intervalSecondId)

    let last3 = this.state.list.filter(el => el.length > 0).slice(-3)
    let coordListString = JSON.stringify(last3)
    Util.storeData("coordList", coordListString)
  }

  getLocation = () => {
    this.findCoordinates()
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        const lastIndex = this.state.list.length - 1
        let date = new Date()

        this.setState(prevState => {
          let list = prevState.list
          list[lastIndex].push({ latitude, longitude, date })
          return {
            list
          }
        })
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  tick = () => {
    this.intervalSecondId = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={{textAlign:"right",margin:10}}>Süre : {this.state.seconds}</Text>
        <View style={{margin:10}}><Button title="Start"  color="#03AC13" onPress={this.handleStart} /></View>
        <View style={{margin:10}}><Button title="Stop" color="#FF0000" onPress={this.handleStop} /></View>
        <Text style={{margin:10}}>Konum sayisi : {this.state.list.length}</Text>
        {/*
          this.state.list.map((eleman, key) => {

            if (eleman.length <= 0) return <Text key={key}>Boş eleman</Text>;

            return eleman.map((el, key) => {
              return <Text key={key}>{el.latitude + " - " + el.longitude + " - " + el.date.getSeconds()}</Text>
            })


          })*/
        }
      </View>
    );
  }
}

RouteStart.navigationOptions = {
  title: 'Rota Başlat',
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
});