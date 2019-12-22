import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity,ToastAndroid} from 'react-native'
import Util from '../Util'
import MapView, { Marker, MarkerAnimated } from 'react-native-maps'
import { SafeAreaView } from 'react-navigation'

export default class RouteShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      coordList: []
    }
    this.setRegion()
  }

  setRegion = async () => {
    let { coords } = await this.getCurrentPosition()
    this.region = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  async componentDidMount() {
    const permission = await Permissions.request('location');
    if (permission !== 'authorized') {
      alert('Konum izni verilmedi.')
      return false;
    }
  }
  
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position)
      }),
        reject, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 1000
      }
    })
  }

  componentDidMount() {
    this.updateDate()
  }

  componentDidUpdate() {
    this.updateDate()
  }

  updateDate = async () => {
    let coordListData = await Util.retrieveData("coordList")
    let coordList = JSON.parse(coordListData)
    this.setState({ coordList })
  }

  handlePress = (index) => {
    ToastAndroid.show('Konumlar gösteriliyor', ToastAndroid.SHORT);
    let coords = this.state.coordList[index]
    this.setState({ markers: coords })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <MapView zoomControlEnabled style={styles.map}
          initialRegion={this.region}
          loadingEnabled={true}
          showsUserLocation={true}
        >{
            this.state.markers.map((marker, key) => (
              <Marker
                key={key}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={Util.formatDate(new Date(marker.date))}
                description={Util.formatFullDate(new Date(marker.date))}
              />
            ))
          }
        </MapView>

        <FlatList style={{ paddingTop: 5,flex:2}}
          data={this.state.coordList}
          renderItem={(data) => {
            let arr = data.item
            let lastIndex = arr.length - 1
            let firstDateString = arr[0].date
            let lastDateString = arr[lastIndex].date

            let firstDate = new Date(firstDateString)
            let lastDate = new Date(lastDateString)

            return (
              <TouchableOpacity style={{ backgroundColor:'#f6f5f5',padding:5}}onPress={() => this.handlePress(data.index)}>
                <Text style={styles.text}>{Util.formatDate(firstDate)}       ---       {Util.formatDate(lastDate)}</Text>
              </TouchableOpacity>
            );
          }
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    )
  }
}

RouteShow.navigationOptions = {
  title: 'Rota Göster',
};

const styles = StyleSheet.create({
  container: {
    flex: 15
  },
  map: {
    flex: 3,

  },
  text: {
    fontSize: 24,
    alignItems: "center",
    textAlign:"center",
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000'

  }
});