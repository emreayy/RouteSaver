import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Util from '../Util'

export default class RouteShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coordList: []
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

  handlePress = (index) => {
    let coords = this.state.coordList[index]
    console.log(coords)
  }

  render() {
    return (
      <View>
        <FlatList
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
                <Text>{Util.formatDate(firstDate)}-{Util.formatDate(lastDate)}</Text>
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
