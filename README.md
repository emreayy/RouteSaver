# RouteSaver
### Kurulum

- Projeyi indirin ve proje dizinine aşağıdaki kurulumları yapın
- React Native 0.60+ kullanılmıştır.
- Linkleme işlemi otomatik yapılmaktadır.

 #### npm code

`$ npm install `

`$ npm install -g expo-cli`

`$ npm install -save react-native-maps`

`$ npm i @react-native-community/async-storage`

#### Önemli
##### Aldığım Hata:
error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with –verbose flag for more details.

##### Çözüm:
- Uygulama dizini içerisindeki node_modules\metro-config\src\defaults\blacklist.js dosyasını notepad ile açın

- Bu kod parçacığını bulun:
var sharedBlacklist = [
/node_modules[/\\]react[/\\]dist[/\\].*/,
/website\/node_modules\/.*/,
/heapCapture\/bundle\.js/,
/.*\/__tests__\/.*/
];

- Ardından bu kod parçacığı ile değiştirin 
var sharedBlacklist = [
/node_modules[\/\\]react[\/\\]dist[\/\\].*/,
/website\/node_modules\/.*/,
/heapCapture\/bundle\.js/,
/.*\/__tests__\/.*/
];

- Uygulamayı yeniden çalıştırın `$expo start` sorun çözülecektir.

## Ekran Çıktıları

<img src="https://www.imageupload.net/upload-image/2019/12/22/WhatsApp-Image-2019-12-22-at-20.36.02.jpg" width="250" height="500">

> Rota başlat sayfası

<img src="https://www.imageupload.net/upload-image/2019/12/22/WhatsApp-Image-2019-12-22-at-20.36.02-1.jpg" width="250" height="500">

> Rota göster sayfası

<img src="https://www.imageupload.net/upload-image/2019/12/22/WhatsApp-Image-2019-12-22-at-20.36.02-2.jpg" width="250" height="500">

> Hakkında sayfası
