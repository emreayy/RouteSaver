import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Util from '../Util'

export default class RouteShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coordList: [ ]
    }
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

  render() {
    return (
      <View>
        <FlatList
          data={this.state.coordList}
            renderItem={(data) => {
              let arr = data.item
              let lastIndex = arr.length - 1
              let firstDate = arr[0].date
              let lastDate = arr[lastIndex].date

              return (
                <TouchableOpacity onPress={() => null}>

                <Text>{firstDate + " - "+ lastDate}</Text>

                </TouchableOpacity>
              );
            }
          }

          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}
