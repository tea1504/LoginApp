/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './Login';
import Home from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {store} from './store/Store';
import Filter from './Filter';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = ({route}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        tabBarItemStyle: {
          height: 50,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Danh sách"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Theo dõi & giám sát"
        component={View}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="tv" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Biểu đồ"
        component={View}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="adjust" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={View}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={View}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Main"
            component={Main}
          />
          <Stack.Screen name="Filter" component={Filter} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
