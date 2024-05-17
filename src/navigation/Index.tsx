import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//types
import {RootStackParamList} from '../types/navigation';

//Components
import BottomNavigation from './BottomNavigation';
// import DrawerNavigation from './DrawerNavigation';
// import Login from '../components/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Index: React.FC = (): JSX.Element | null => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomNavigation"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          {/* <Stack.Screen
            name="Drawer"
            component={DrawerNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Login" component={Login} /> */}
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            options={{headerShown: false}}
          />

          {/* <Stack.Group
            screenOptions={({route}) => ({
              title: route.params.title,
            })}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Index;
