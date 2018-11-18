import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import ScreenSearch from './ScreenSearch';
import ScreenShoppingList from './ScreenShoppingList';
import ScreenProfile from './ScreenProfile';
import Icon from 'react-native-vector-icons/AntDesign';
import ScreenCategory from './ScreenCategory';


export default createBottomTabNavigator({
    Search: {
        screen: ScreenSearch,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" size={22} color={tintColor} />
            )
        }
    },

    Category: {
        screen: ScreenCategory,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="appstore-o" size={22} color={tintColor} />
            )
        }
    },

    ShoppingList: {
        screen: ScreenShoppingList,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="profile" size={22} color={tintColor} />
            )
        }
    },
    Profile: {
        screen: ScreenProfile,
        navigationOptions: {
            tabBarLabel: null,
            tabBarIcon: ({ tintColor }) => (
                <Icon name="user" size={22} color={tintColor} />
            )
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: "#EC2434",
            inactiveTintColor: "#011627",
            showLabel: false,            
        },
    });