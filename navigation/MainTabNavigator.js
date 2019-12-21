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
  tabBarLabel: 'RouteStart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
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
  tabBarLabel: 'RouteShow',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
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
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
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
