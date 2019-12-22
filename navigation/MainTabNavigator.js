import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import RouteStart from '../screens/RouteStart';
import RouteShow from '../screens/RouteShow';
import About from '../screens/About';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RouteStartStack = createStackNavigator(
  {
    RouteStart: RouteStart,
  },
  config
);

RouteStartStack.navigationOptions = {
  tabBarLabel: 'Rota Başlat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-play'
      }
    />
  ),
};

RouteStartStack.path = '';

const RouteShowStack = createStackNavigator(
  {
    RouteShow: RouteShow,
  },
  config
);

RouteShowStack.navigationOptions = {
  tabBarLabel: 'Rota Göster',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} />
  ),
};

RouteShowStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: About,
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'Hakkında',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'ios-information-circle-outline'} />
  ),
};

AboutStack.path = '';

const tabNavigator = createBottomTabNavigator({
  RouteStartStack,
  RouteShowStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;
