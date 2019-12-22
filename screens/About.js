import React, { Component } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{flex:1}}>
        <Text style={styles.appName}> Uygulama Hakkında </Text>
         <Text style={styles.pageName}> Rota Başlat </Text>
            <Text style={{marginLeft:5}}> Start: Her 10 sn de bir konumunuzu alır. </Text>
            <Text style={{marginLeft:5}}> Stop: Konum almayı durdurur. </Text>
          <Text style={styles.pageName} > Rota Göster </Text>
            <Text style={{marginLeft:5}}> Başlangıç ve bitiş saatine göre son 3 kaydedilen konumunuzu görebilirsiniz. </Text>
            <Text style={{marginLeft:5}}> Show : Tıkladığınız saate göre konumunuzu gösterir. </Text>
     </View>
     <View style={{flex:1}}>
        <Text style={styles.appName}> Ben Kimim? </Text>
        <Text style={{marginLeft:5, marginTop:10}}> Kocaeli üniversitesinden yeni mezun olmuş 
          kariyerini mobile developer olarak ilerletmek isten 23 yaşında genç bir bilgisayar mühendisiyim.
          Şuana kadar geliştirdiğim projelere <Text style={styles.url} onPress={() => { Linking.openURL('https://github.com/emreayy');}}>
          buradan</Text> bakabilirsiniz. </Text>
          <Text style={{marginLeft:5, marginTop:10}}> Linkedin profilime <Text style={styles.url} onPress={() => { Linking.openURL('https://www.linkedin.com/in/ayemre/');}}>
          buradan</Text> ulaşabilirsiniz. </Text>
          <Text style={{marginLeft:5, marginTop:10}}> Aramak için <Text style={styles.url} onPress={() => { Linking.openURL(`tel:${5312183151}`)}}>
          tıklayınız.</Text>  </Text>
          <Text style={{marginLeft:5, marginTop:10}}> İletişim için <Text style={styles.url} onPress={() => { Linking.openURL('mailto:emre.ayy@yandex.com')}}>
          tıklayınız.</Text>  </Text>
        <Text style={styles.devName}> Emre AY </Text>
     </View>
    </View>
    );
  }
}

About.navigationOptions = {
  title: 'Hakkında',
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 1,
    backgroundColor: '#F0F0F0'
  },

  appName: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    fontSize: 36,
    color: '#000000',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  pageName: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    fontSize: 24,
    color: '#000111',
    },
  devName: {
    color: '#1a36af',
    justifyContent: 'flex-end',
    marginTop: 60,
    margin: 15,
    fontSize: 18,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});

