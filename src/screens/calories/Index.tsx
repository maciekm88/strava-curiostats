import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet} from 'react-native';

const Index: React.FC = (): JSX.Element | null => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>Strava curiostats Calories SCREEN</Text>
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
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: 'orangered',
  },
});

export default Index;
