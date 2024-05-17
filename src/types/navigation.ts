import {DrawerScreenProps} from '@react-navigation/drawer';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>;
  Login: undefined;
};

export type DrawerParamList = {
  BottomNavigation: NavigatorScreenParams<BottomParamList>;
};

export type BottomParamList = {
  Main: undefined;
  Calories: undefined;
  Distance: undefined;
  Elevation: undefined;
  Map: undefined;
};

export type BottomScreenNavigation = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'BottomNavigation'>,
  NativeStackScreenProps<RootStackParamList, 'Drawer'>
>;

export type DrawerScreenNavigation = NativeStackScreenProps<
  RootStackParamList,
  'Drawer'
>;

export type LoginScreenNavigation = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
