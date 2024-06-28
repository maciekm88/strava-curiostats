import React, {useState} from 'react';
import {Button, Alert, StyleSheet, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN,
  STRAVA_REDIRECT_URI,
} from '@env';
import {authorize} from 'react-native-app-auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {setTotalDistances, setElevationStats} from '../../redux/actions';

export enum API_URL {
  AUTH_USER = 'https://www.strava.com/oauth/authorize?client_id=',
  USER_SCOPE = '&redirect_uri=myapp://oauthredirect&response_type=code&scope=activity:read_all',
  STRAVA_API = 'https://www.strava.com/oauth/token',
  ATHLETE_LINK = 'https://www.strava.com/api/v3/athlete',
  ATHLETE_STATS = 'https://www.strava.com/api/v3/athletes/',
  ACTIVITIES_LINK = 'https://www.strava.com/api/v3/athlete/activities',
}

const MainScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [athleteData, setAthleteData] = useState({
    name: '',
    surname: '',
    id: '',
    profile: '',
  });
  // const [totalRideDistance, setTotalRideDistance] = useState<number | null>();
  // const [biggestRideDistance, setBiggestRideDistance] = useState<
  //   number | null
  // >();
  // const [totalRunDistance, setTotalRunDistance] = useState<number | null>();
  // const [totalDistance, setTotalDistance] = useState<number | null>();
  // const [totalElevationGain, setTotalElevationGain] = useState<number | null>();
  // const [totalRunElevationGain, setTotalRunElevationGain] = useState<
  //   number | null
  // >();
  // const [totalBikeElevationGain, setTotalBikeElevationGain] = useState<
  //   number | null
  // >();

  const curiostatsLogo = require('../../assets/images/curiostats256.png');

  // Strava devs AUTHENTICATION DOCS
  // https://developers.strava.com/docs/authentication/
  // still trying to find workaround with oauth using react-native-app-auth
  const authenticateWithStrava = async () => {
    const config = {
      clientId: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
      // redirectUrl: 'com.myapp://oauthredirect',
      redirectUrl: STRAVA_REDIRECT_URI,
      serviceConfiguration: {
        authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
        // tokenEndpoint: 'https://www.strava.com/oauth/token',
        tokenEndpoint:
          'https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}',
        revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
      },
      skipCodeExchange: true,
      scopes: ['activity:read'],
    };
    try {
      const result = await authorize(config);
      console.warn('Authentication result:', result);
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

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
      // to change => should not store tokens in Async Storage due to security reasons
      // use rn-secure-storage
      await AsyncStorage.setItem('strava_token', accessToken);

      const stravaAthleteResponse = await axios.get(API_URL.ATHLETE_LINK, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('athleteResponse: ', stravaAthleteResponse.data);
      const {firstname, lastname, id, profile} = stravaAthleteResponse.data;

      // dispatch(setAthleteData(stravaAthleteResponse.data));

      setAthleteData({
        name: firstname,
        surname: lastname,
        id: id,
        profile: profile,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Strava API v3 reference:
  //https://developers.strava.com/docs/reference/

  const fetchStravaUserStats = async (token: string) => {
    try {
      console.log('Fetching data with token:', token);
      const response = await axios.get(
        `https://www.strava.com/api/v3/athletes/${athleteData.id}/stats?access_token=${token}`,
      );
      console.log('Strava API response:', response.data);
      const {all_ride_totals, all_run_totals, biggest_ride_distance} =
        response.data;
      const biggestBikeDistance = (biggest_ride_distance * 0.001).toFixed(2);
      const totalRide = Math.round(all_ride_totals.distance * 0.001);
      const totalRun = Math.round(all_run_totals.distance * 0.001);
      const runElevationGain = (all_run_totals.elevation_gain * 0.001).toFixed(
        2,
      );
      const rideElevationGain = (
        all_ride_totals.elevation_gain * 0.001
      ).toFixed(2);
      const totalElevation = (
        parseFloat(runElevationGain) + parseFloat(rideElevationGain)
      ).toFixed(2);

      dispatch(
        setTotalDistances(
          totalRide,
          totalRun,
          totalRide + totalRun,
          biggestBikeDistance,
        ),
      );

      dispatch(
        setElevationStats(runElevationGain, rideElevationGain, totalElevation),
      );

      // setTotalRideDistance(totalRide);
      // setTotalRunDistance(totalRun);
      // setTotalDistance(totalRide + totalRun);
      // setBiggestRideDistance(biggestBikeDistance);
      // setTotalRunElevationGain(runElevationGain);
      // setTotalBikeElevationGain(rideElevationGain);
      // setTotalElevationGain(totalElevation);
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

  return (
    <SafeAreaView style={styles.container}>
      {!athleteData.name && !athleteData.surname ? (
        <Text style={styles.text}>curiostats</Text>
      ) : (
        <Text style={styles.text}>
          Hi {athleteData.name} {athleteData.surname}
        </Text>
      )}
      {athleteData.id === '' ? (
        <Image source={curiostatsLogo} style={styles.image} />
      ) : (
        <Image source={{uri: athleteData.profile}} style={styles.image} />
      )}
      <Button
        title="Authenticate with Strava"
        onPress={authenticateWithStrava}
      />
      <Button title="Fetch Data" onPress={fetchData} color="red" />
      <Button
        title="Fetch Strava User Stats"
        onPress={() => {
          // to change => should not store tokens in Async Storage due to security reasons
          AsyncStorage.getItem('strava_token').then(token => {
            if (token) {
              fetchStravaUserStats(token);
            } else {
              Alert.alert('No token found', 'Please authenticate first.');
            }
          });
        }}
        color="navy"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blanchedalmond',
  },
  text: {
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'orangered',
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default MainScreen;
