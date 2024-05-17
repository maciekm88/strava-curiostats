import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';

//types
import {BottomParamList} from '../types/navigation';

//Components
import BottomTabBar from './BottomTabBar';
import Main from '../screens/main/Index';
import Calories from '../screens/calories/Index';
import Distance from '../screens/distance/Index';
import Map from '../screens/map/Index';
import Elevation from '../screens/elevation/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<BottomParamList>();

const BottomNavigation: React.FC = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      swipeEnabled={true}
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={() => ({
        headerShown: true,
        headerRight: () => (
          <Pressable
            accessibilityRole="button"
            style={{marginRight: 20}}
            onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={24} color="pink" />
          </Pressable>
        ),
      })}>
      <Tab.Screen
        name="Calories"
        component={Calories}
        options={{
          headerStyle: {
            backgroundColor: 'orangered',
          },
          tabBarAccessibilityLabel: 'Calories screen',
        }}
      />

      <Tab.Screen
        name="Distance"
        component={Distance}
        options={{
          headerStyle: {
            backgroundColor: 'orangered',
          },
          tabBarAccessibilityLabel: 'Distance screen',
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerStyle: {
            backgroundColor: 'orangered',
          },
          tabBarAccessibilityLabel: 'Main screen',
        }}
      />
      <Tab.Screen
        name="Elevation"
        component={Elevation}
        options={{
          headerStyle: {
            backgroundColor: 'orangered',
          },
          tabBarAccessibilityLabel: 'Elevation screen',
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerStyle: {
            backgroundColor: 'orangered',
          },
          tabBarAccessibilityLabel: 'Map screen',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
