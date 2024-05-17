import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
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
    <SafeAreaView>
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
              accessibilityHint="Nawiguje do innego ekranu aplikacji"
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
                {/* <Text style={{color: isFocused ? 'yellow' : '#222'}}>
                  {label}
                </Text> */}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: 70,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: 'orangered',
    borderColor: 'black',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 15,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
