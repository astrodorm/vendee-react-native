import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ScreenIntro from './src/screens/ScreenIntro';
import MainApp from './src/screens/MainApp'
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/reducers';
import ScreenCheckout from './src/screens/ScreenCheckout';
import ScreenCheckoutMessage from './src/screens/ScreenCheckoutMessage';
import ScreenLogin from './src/screens/ScreenLogin';
import ScreenSplash from './src/screens/ScreenSplash';
import thunk from 'redux-thunk';
import { BackHandler } from 'react-native';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

//WORKS WITH ONLY 2 VARIABLES
//const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


//RESEARCH SAYS YOU CAN ONLY PASS IN TWO FUNCTIONS TO YOUR createStore METHOD
// const store = createStore(rootReducer, applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

console.log(store.getState())


//const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";



export default class App extends Component {

    componentWillMount() {
        //this.retrieveAndSetUserTokenBoolean(USER_TOKEN_STORAGE_KEY);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

       // this.props.navigation.navigate("MainAppScreen");

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        // this.goBack(); // works best when the goBack is async
        return true;
    }


    constructor(props) {
        super(props);

        this.state = {
            isTokenAvailable: false
        }
    }


    retrieveAndSetUserTokenBoolean = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ isTokenAvailable: true })

            }
        } catch (error) {
            // Error retrieving data
        }

    }



    render() {
        return (
            <Provider store={store}>
                <AppStackNavigator />
            </Provider>
        );
    }
}


const AppStackNavigator = createStackNavigator({

    Splash: {
        screen: ScreenSplash
    },
    Intro: {
        screen: ScreenIntro
    },
    MainAppScreen: {
        screen: MainApp
    },
    // Splash: {
    //     screen: ScreenSplash
    // },
    Checkout: {
        screen: ScreenCheckout
    },
    CheckoutMessage: {
        screen: ScreenCheckoutMessage
    },
    Login: {
        screen: ScreenLogin
    }
},
    {
        headerMode: 'none',
    }

)

