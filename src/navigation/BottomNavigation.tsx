import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

// import {Pressable, Text} from 'react-native';
// import {theme} from '../styles/styles';

const Tab = createBottomTabNavigator<BottomParamList>();

// const MenuButton = ({navigation}: {navigation: any}) => (
//   <Pressable accessibilityRole="button" onPress={() => navigation.openDrawer()}>
//     {/* <Image
//       source={require('../assets/placeholders/hamburger.jpg')}
//       style={{
//         width: 45,
//         height: 45,
//         borderRadius: 45 / 2,
//         marginRight: 23,
//       }}
//     /> */}
//     <Text>Menu</Text>
//   </Pressable>
// );

const BottomNavigation: React.FC = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      // swipeEnabled={true}
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {/* screenOptions={({navigation}) => ({
        headerRight: () => <MenuButton navigation={navigation} />,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Montserrat',
          fontWeight: '700',
          fontSize: 16,
          color: 'yellow',
          lineHeight: 26,
        },
        headerShown: false,
        })}> */}
      <Tab.Screen
        name="Calories"
        component={Calories}
        options={{
          headerStyle: {
            backgroundColor: 'maroon',
          },
          tabBarAccessibilityLabel: 'Calories screen',
        }}
      />

      <Tab.Screen
        name="Distance"
        component={Distance}
        options={{
          headerStyle: {
            backgroundColor: 'maroon',
          },
          tabBarAccessibilityLabel: 'Distance screen',
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerStyle: {
            backgroundColor: 'maroon',
          },
          tabBarAccessibilityLabel: 'Main screen',
        }}
      />
      <Tab.Screen
        name="Elevation"
        component={Elevation}
        options={{
          headerStyle: {
            backgroundColor: 'maroon',
          },
          tabBarAccessibilityLabel: 'Elevation screen',
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerStyle: {
            backgroundColor: 'maroon',
          },
          tabBarAccessibilityLabel: 'Map screen',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
