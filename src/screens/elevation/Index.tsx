import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const Index: React.FC = (): JSX.Element | null => {
  const totalRunElevationGain = useSelector(state => state.runElevationGain);
  const totalRideElevationGain = useSelector(state => state.rideElevationGain);
  const totalElevationGain = useSelector(state => state.totalElevation);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.headerText}>Elevation screen</Text>
          <Text style={styles.text}>
            Your total gained elevation: {totalElevationGain} km
          </Text>
          <Text style={styles.text}>
            Total running elevation: {totalRunElevationGain} km
          </Text>
          <Text style={styles.text}>
            Total cycling elevation: {totalRideElevationGain} km
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
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
