import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async getAccessToken() {
    return AsyncStorage.getItem('accessToken');
  },

  async saveTokens(accessToken: string, refreshToken: string) {
    await AsyncStorage.multiSet([
      ['accessToken', accessToken],
      ['refreshToken', refreshToken],
    ]);
  },

  async logout() {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  },

  // async getMe() {
  //   const response = await api.get('/users/me');
  //   return response.data;
  // },
};
