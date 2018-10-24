import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ScreenIntro from './src/screens/ScreenIntro';
import MainApp from './src/screens/MainApp'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/reducers'


const store = createStore(rootReducer)

console.log(store.getState())

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <AppStackNavigator />
            </Provider>
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

