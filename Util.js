import {AsyncStorage} from 'react-native'

export default class Util {

    static storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
        }
    }

    static retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
        }
    }

}