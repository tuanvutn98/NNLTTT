import AsyncStorage from '@react-native-community/async-storage';
export const API_URL = 'https://regconitionplant.herokuapp.com';
//export const API_URL = 'http://192.168.1.181:4000';

export const auth = {
  async isAuthenticated() {
    if (typeof window == 'undefined') return false;
    if (await AsyncStorage.getItem('jwt')) {
      const value = JSON.parse(await AsyncStorage.getItem('jwt'));
      return value;
    } else return false;
  },

  async isSignIn() {
    if (typeof window == 'undefined') return false;
    if (await AsyncStorage.getItem('jwt')) {
      const value = JSON.parse(await AsyncStorage.getItem('jwt'));  
      if(value){
          return true;
      }
      else{
          return false;
      }
    } else return false;
  },

  async getAvatar() {
    if (await AsyncStorage.getItem('avatar')) {
      const value = JSON.parse(await AsyncStorage.getItem('avatar'));
      return value;
    } else return false;
  },

  async getName() {
    if (typeof window == 'undefined') return false;
    if (await AsyncStorage.getItem('fullName')) {
      const value = JSON.parse(await AsyncStorage.getItem('fullName'));
      return value;
    } else return false;
  },

  async setAvatar(avatar) {
    await AsyncStorage.setItem('avatar', JSON.stringify(avatar));
  },

  async removeStorage() {
    await AsyncStorage.removeItem('jwt');
    await AsyncStorage.removeItem('avatar');
    await AsyncStorage.removeItem('fullName');
    await AsyncStorage.removeItem('isAuthenticated');
  },

  async authenticate(jwt) {
    await AsyncStorage.setItem('jwt', JSON.stringify(jwt));
    await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true));
    if (jwt.user.fullName) {
      await AsyncStorage.setItem('fullName', JSON.stringify(jwt.user.fullName));
    }
    if (jwt.user.avatar) {
      await AsyncStorage.setItem('avatar', JSON.stringify(jwt.user.avatar));
    }
  },

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      strTime
    );
  },
};
