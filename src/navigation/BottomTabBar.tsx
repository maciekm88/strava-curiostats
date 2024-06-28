import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTabBar = ({state, descriptors, navigation}: any) => {
  const icons = {
    Main: 'home',
    Calories: 'food',
    Distance: 'map-marker-distance',
    Elevation: 'elevation-rise',
    Map: 'map',
  };

  return (
    <SafeAreaView style={{backgroundColor: 'blanchedalmond'}}>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const icon = icons[label] || 'circle';

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={
                isFocused ? {selected: true} : {selected: false}
              }
              accessibilityLabel={options.tabBarAccessibilityLabel}
              accessibilityHint="Navigates to other screen"
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.container}>
              <View style={styles.buttonContainer}>
                <Icon
                  name={icon}
                  size={24}
                  color={isFocused ? 'yellow' : '#222'}
                />
                <Text style={{color: isFocused ? 'yellow' : '#222'}}>
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: Platform.OS === 'ios' ? 65 : 70,
    // height: 65,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: 'orangered',
    borderColor: 'navy',
    borderWidth: 1,
    borderRadius: 10,
    height: '75%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
