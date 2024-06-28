import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';

//components
import BottomNavigation from './BottomNavigation';

//types
import {
  BottomScreenNavigation,
  DrawerParamList,
  ContactScreenNavigation,
} from '../types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent: React.FC<{
  navigation: BottomScreenNavigation['navigation'];
}> = ({navigation}): JSX.Element | null => {
  type ContactScreenNavigationProp = ContactScreenNavigation['navigation'];

  const nav = useNavigation<ContactScreenNavigationProp>();

  const handleContactPress = (): void => {
    nav.navigate('Contact', {});
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContainer}>
        <Pressable
          onPress={() => navigation.closeDrawer()}
          style={styles.backButton}>
          <Text>Go back</Text>
        </Pressable>
        <Pressable onPress={handleContactPress} style={styles.contactButton}>
          <Text>Contact</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation: React.FC = (): JSX.Element | null => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        swipeEnabled: true,
        drawerStyle: {
          backgroundColor: 'blanchedalmond',
          width: '40%',
        },
      }}>
      <Drawer.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginTop: 5,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'gray',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  contactButton: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'orangered',
    marginHorizontal: 10,
  },
});

export default DrawerNavigation;
