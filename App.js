import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ScreenIntro from './src/screens/ScreenIntro';
import MainApp from './src/screens/MainApp'

export default class App extends Component {

    render() {
        return (
            <AppStackNavigator />

        );
    }
}


const AppStackNavigator = createStackNavigator({
    Intro: {
        screen: ScreenIntro
    },
    MainAppScreen: {
        screen: MainApp
    }
},
    {
        headerMode: 'none',
    }

)

