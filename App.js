import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ScreenIntro from './src/screens/ScreenIntro';
import MainApp from './src/screens/MainApp'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/reducers';
import ScreenCheckout from './src/screens/ScreenCheckout';
import ScreenCheckoutMessage from './src/screens/ScreenCheckoutMessage';


const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
    },
    Checkout: {
        screen: ScreenCheckout
    },
    CheckoutMessage: {
        screen: ScreenCheckoutMessage
    }
},
    {
        headerMode: 'none',
    }

)

