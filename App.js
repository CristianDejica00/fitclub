import { StatusBar } from 'expo-status-bar';
import React from 'react';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import BookingsScreen from './screens/Bookings';
import NotificationsScreen from './screens/Notifications';
import MembershipsScreen from './screens/Memberships';
import CheckinsScreen from './screens/Checkins';
import SettingsScreen from './screens/Settings';
import ServicesScreen from './screens/Services';
import VouchersScreen from './screens/Vouchers';
import TrainingScreen from './screens/Training';
import LocationsScreen from './screens/Locations';
import ClubRulesScreen from './screens/ClubRules';
import NewBookingsScreen from './screens/NewBooking';
import ChangePasswordScreen from './screens/ChangePassword';
import ChangeEmailScreen from './screens/ChangeEmail';
import TermsScreen from './screens/Terms';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }} initialRouteName='LoginScreen' >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="MembershipsScreen" component={MembershipsScreen} />
        <Stack.Screen name="CheckinsScreen" component={CheckinsScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
        <Stack.Screen name="VouchersScreen" component={VouchersScreen} />
        <Stack.Screen name="TrainingScreen" component={TrainingScreen} />
        <Stack.Screen name="LocationsScreen" component={LocationsScreen} />
        <Stack.Screen name="ClubRulesScreen" component={ClubRulesScreen} />
        <Stack.Screen name="NewBookingsScreen" component={NewBookingsScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
