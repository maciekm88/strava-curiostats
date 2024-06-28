import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const Index: React.FC = (): JSX.Element | null => {
  const totalRideDistance = useSelector(state => state.totalRideDistance);
  const totalRunDistance = useSelector(state => state.totalRunDistance);
  const totalDistance = useSelector(state => state.totalDistance);
  const biggestBikeDistance = useSelector(state => state.biggestBikeDistance);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.headerText}>Distance stats</Text>
          <Text style={styles.text}>Total Distance: {totalDistance} km</Text>
          <Text style={styles.text}>
            Total Ride Distance: {totalRideDistance} km
          </Text>
          <Text style={styles.text}>
            Total Run Distance: {totalRunDistance} km
          </Text>
          <Text style={styles.text}>
            Biggest Bike Distance: {biggestBikeDistance} km
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blanchedalmond',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'orangered',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: 'navy',
  },
});

export default Index;
