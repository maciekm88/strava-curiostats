import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Button, Alert, Image} from 'react-native';
import {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN,
  STRAVA_REDIRECT_URI,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import store from '../../redux/store';

export enum API_URL {
  AUTH_USER = 'https://www.strava.com/oauth/authorize?client_id=',
  USER_SCOPE = '&redirect_uri=myapp://oauthredirect&response_type=code&scope=activity:read',
  STRAVA_API = 'https://www.strava.com/oauth/token',
  ATHLETE_LINK = 'https://www.strava.com/api/v3/athlete',
  ATHLETE_STATS = 'https://www.strava.com/api/v3/athletes/',
}

const Index: React.FC = (): JSX.Element | null => {
  const [athleteData, setAthleteData] = useState({
    name: '',
    surname: '',
    profile: '',
  });
  const [totalRideDistance, setTotalRideDistance] = useState<number | null>();
  const [totalRunDistance, setTotalRunDistance] = useState<number | null>();
  const [totalDistance, setTotalDistance] = useState<number | null>();

  const fetchData = async () => {
    try {
      const response = await axios.post(API_URL.STRAVA_API, {
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      });

      const accessToken = response.data.access_token;
      console.log('accessToken: ', accessToken);

      //to change => should not store tokens in Async Storage due to security reasons
      await AsyncStorage.setItem('strava_token', accessToken);

      const stravaAthleteResponse = await axios.get(API_URL.ATHLETE_LINK, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('athleteResponse: ', stravaAthleteResponse.data);
      const {firstname, lastname, profile} = stravaAthleteResponse.data;
      setAthleteData({
        name: firstname,
        surname: lastname,
        profile: profile,
      });
      console.log('athlete DATAAAA: ', athleteData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchStravaUserStats = async (token: string) => {
    try {
      console.log('Fetching data with token:', token);
      const response = await axios.get(
        `https://www.strava.com/api/v3/athletes/9135838/stats?access_token=${token}`,
        // 'https://www.strava.com/api/v3/athletes/?access_token=${token}',
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // },
      );
      console.log('Strava API response:', response.data);
      const {all_ride_totals, all_run_totals} = response.data;
      const totalRide = Math.round(all_ride_totals.distance * 0.001);
      const totalRun = Math.round(all_run_totals.distance * 0.001);

      setTotalRideDistance(totalRide);
      setTotalRunDistance(totalRun);
      setTotalDistance(totalRide + totalRun);
      console.log(store.getState());
    } catch (error) {
      // if (error.response) {
      //   console.error('Error response:', error.response.data);
      //   console.error('Error status:', error.response.status);
      //   console.error('Error headers:', error.response.headers);
      // } else if (error.request) {
      //   console.error('Error request:', error.request);
      // } else {
      //   console.error('Error message:', error.message);
      // }
      Alert.alert('Error', 'Failed to fetch data from Strava');
    }
  };

  if (athleteData.name === '') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <Button title="Fetch User Data" onPress={fetchData} />
          <Button
            title="Fetch Strava User Stats"
            onPress={() => {
              AsyncStorage.getItem('strava_token').then(token => {
                if (token) {
                  fetchStravaUserStats(token);
                } else {
                  Alert.alert('No token found', 'Please authenticate first.');
                }
              });
            }}
          />
          <Text>Fetch data first!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <Text style={styles.text}>Map screen</Text>
        <Button title="Fetch User Data" onPress={fetchData} />
        <Button
          title="Fetch Strava User Stats"
          onPress={() => {
            AsyncStorage.getItem('strava_token').then(token => {
              if (token) {
                fetchStravaUserStats(token);
              } else {
                Alert.alert('No token found', 'Please authenticate first.');
              }
            });
          }}
        />

        <Text>
          Hello {athleteData.name} {athleteData.surname}!!
        </Text>
        <Image source={{uri: athleteData.profile}} style={styles.image} />
        <Text>
          Your total distance is {totalDistance} kilometers! Impressive!
        </Text>
        <Text>You rode {totalRideDistance} km</Text>
        <Text>and you ran {totalRunDistance} km!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blanchedalmond',
  },
  mapContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: 'orangered',
  },
});

export default Index;
