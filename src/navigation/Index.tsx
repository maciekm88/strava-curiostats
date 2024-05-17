import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//types
import {RootStackParamList} from '../types/navigation';

//Components
import BottomNavigation from './BottomNavigation';
import DrawerNavigation from './DrawerNavigation';

//Screens
import Contact from '../screens/contact/Index';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Index: React.FC = (): JSX.Element | null => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{
              headerBackTitleVisible: false, // This will hide the "Drawer" text on iOS
            }}
          />
          <Stack.Group
            screenOptions={({route}) => ({
              title: route.params.title,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Index;
