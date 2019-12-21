import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import Util from '../Util'
import MapView, { Marker } from 'react-native-maps'
import { SafeAreaView } from 'react-navigation'

export default class RouteShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [
        {
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
          },
          title: 'Evim',
          description: 'Açıklama'
        },
        {
          latlng: {
            latitude: 37.78925,
            longitude: -122.4324,
          },
          title: 'Evim2',
          description: 'Açıklama2'
        },
        {
          latlng: {
            latitude: 37.79025,
            longitude: -122.4324,
          },
          title: 'Evim3',
          description: 'Açıklama3'
        },
      ],
      coordList: []
    }
  }

  async componentDidMount() {
    const permission = await Permissions.request('location');
    if (permission !== 'authorized') {
      alert('Konum izni verilmedi.')
      return false;
    }
    const { coords } = await this.getCurrentPosition();
    this.setState({
      region: {
        ...this.state.region,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
    });
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
    let coords = this.state.coordList[index]
    console.log(coords)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <MapView style={styles.map}
          region={this.state.region}
          loadingEnabled={true}
          showsUserLocation={true}
        >{
            this.state.markers.map((marker, key) => (
              <Marker
                key={key}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))
          }
        </MapView>

        <FlatList style={{paddingTop:5}}
          data={this.state.coordList}
          renderItem={(data) => {
            let arr = data.item
            let lastIndex = arr.length - 1
            let firstDateString = arr[0].date
            let lastDateString = arr[lastIndex].date

            let firstDate = new Date(firstDateString)
            let lastDate = new Date(lastDateString)

            return (
              <TouchableOpacity onPress={() => this.handlePress(data.index)}>
                <Text style={styles.text}>{Util.formatDate(firstDate)}-{Util.formatDate(lastDate)} 
                  <Text style={{}}> > </Text></Text> 
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
    flex: 10
  },
  map: {
    flex: 9,
    
  },
  text: {
    fontSize: 24,
    paddingLeft: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#000000'

  }
});