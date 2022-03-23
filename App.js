import React, { useEffect } from 'react'
import { NativeBaseProvider, Center } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/ContactsScreen';
import AddContactScreen from './screens/AddContactScreen';
import EditContactScreen from './screens/EditContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';
import WatchListScreen from './screens/WatchListScreen';
import LocationHistoryScreen from './screens/LocationHistoryScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';
import SecurityMessageScreen from './screens/SecurityMessageScreen';
import InternalPasswordResetScreen from './screens/InternalPasswordResetScreen';
import NotificationsSettingsScreen from './screens/NotificationsSettingsScreen';
import SentSecurityMessageScreen from './screens/SentSecurityMessageScreen'
import MyLocationHistoryScreen from './screens/MyLocationHistoryScreen'
import MapScreen from './screens/MapScreen';
import ErrorScreen from './screens/ErrorScreen';
import WelcomeScreen from './screens/auth/WelcomeScreen'
import LoginScreen from './screens/auth/LoginScreen'
import SignupScreen from './screens/auth/SignupScreen'
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen'
import EnterRecoveryCodeScreen from './screens/auth/EnterRecoveryCodeScreen'
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen'
import { Ionicons } from '@expo/vector-icons';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import userInfoReducer from './store/reducers/user-info'
import { loadUserData, insertUserData } from './store/actions/user-info'
import { useDispatch, useSelector } from 'react-redux'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const SettingsStackNavigator = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name='Settings' options={{ title: 'Settings' }} component={SettingsScreen} />
      <Stack.Screen name='SecurityMessage' options={{ title: 'Security Message' }} component={SecurityMessageScreen} />
      <Stack.Screen name='InternalPasswordReset' options={{ title: 'Change Password' }} component={InternalPasswordResetScreen} />
      <Stack.Screen name='NotificationsSettings' options={{ title: 'Notifications Settings' }} component={NotificationsSettingsScreen} />
    </Stack.Navigator>
  )
}

const WatchListStackNavigator = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="WatchList">
      <Stack.Screen name='WatchList' options={{ title: 'Watch List' }}
        component={WatchListScreen} />
      <Stack.Screen name='LocationHistory' options={{ title: 'Location History' }}
        component={LocationHistoryScreen} />
    </Stack.Navigator>
  )
}

const ContactStackNavigator = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="AddContact">
      <Stack.Screen name='AddContact' options={{ title: 'Add Contact' }}
        component={AddContactScreen} />
      <Stack.Screen name='EditContact' options={{ title: 'Edit Contact' }}
        component={EditContactScreen} />
      <Stack.Screen name='ViewContact' component={ViewContactScreen} />
    </Stack.Navigator>
  )
}

const MainTabNavigator = () => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={
      ({ route }) => ({
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
        swipeEnabled: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'ios-home' : 'ios-home-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'ios-notifications' : 'notifications-outline';
              break;
            case 'Contacts':
              iconName = focused ? 'md-people' : 'md-people-outline';
              break;
            case 'WatchList':
              iconName = focused ? 'list-circle' : 'list-circle-outline';
              break;
            case 'Settings':
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })
    }>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" options={{ title: 'Contacts' }} component={ContactsScreen} />
      <Tab.Screen name="WatchList" options={{ title: 'Watch List' }} component={WatchListScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )

}
const AuthStackNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name='Welcome' options={{ headerShown: false }} component={WelcomeScreen} />
      <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name='Signup' options={{ headerShown: false }} component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' options={{ title: 'Recover Password' }} component={ForgotPasswordScreen} />
      <Stack.Screen name='EnterRecoveryCode' options={{ title: 'Recovery Code' }} component={EnterRecoveryCodeScreen} />
      <Stack.Screen name='ResetPassword' options={{ title: 'Reset Password' }} component={ResetPasswordScreen} />
      <Stack.Screen name='HomePage' options={{ headerShown: false }} component={MainTabNavigator} />
    </Stack.Navigator>
  )
}
//configure custom toast
const toastConfig = {
  default: ({ text1, props }) => (
    <Center _text={{
      color: "white",
      textAlign: 'center',
      bg: 'black',
      p: '3%',
      opacity: '0.8',
      borderRadius: 'md'
    }} w='100%'>
      {text1}
    </Center>
  )
};

function NavCenter() {

  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state) => state.userInfo.loggedInUserData); //get all user personal data
  const Stack = createNativeStackNavigator();

  useEffect(async () => {
    dispatch(loadUserData())
  }, [])

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthStackNavigator">
          {loggedInUserData == null ? (
            <Stack.Screen name='AuthStackNavigator' options={{ headerShown: false }} component={AuthStackNavigator} />
          ) : (
            <>
              <Stack.Screen name='MainTabNavigator' options={{ headerShown: false }} component={MainTabNavigator} />
              <Stack.Screen name='ContactStackNavigator' options={{ headerShown: false }} component={ContactStackNavigator} />
              <Stack.Screen name='WatchListStackNavigator' options={{ headerShown: false }} component={WatchListStackNavigator} />
              <Stack.Screen name='SettingsStackNavigator' options={{ headerShown: false }} component={SettingsStackNavigator} />
              <Stack.Screen name='SentSecurityMessage' component={SentSecurityMessageScreen} />
              <Stack.Screen name='MyLocationHistory' component={MyLocationHistoryScreen} />
              <Stack.Screen name='Map' component={MapScreen} />
              <Stack.Screen name='Error' component={ErrorScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </NativeBaseProvider>
  )
}
//setup redux
const rootReducer = combineReducers({
  userInfo: userInfoReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
      <NavCenter />
    </Provider>
  )
}