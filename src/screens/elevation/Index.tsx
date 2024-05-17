import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet} from 'react-native';

const Index: React.FC = (): JSX.Element | null => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.text}>Elevation screen</Text>
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
    color: 'orangered',
  },
});

export default Index;
