import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ScreenIntro from './src/screens/ScreenIntro';
import ScreenOnboardPhoneNumber from './src/screens/ScreenOnboardPhoneNumber';

export default class App extends Component {
    render() {
        return (
            <AppStackNavigator />

        );
    }
}


const AppStackNavigator = createStackNavigator({
    Intro: ScreenIntro,
    OnboardPhoneNumber: ScreenOnboardPhoneNumber

})

