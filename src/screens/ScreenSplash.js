import React, { Component } from 'react';
import { Text, View, BackHandler, AsyncStorage, Image } from 'react-native';
import { styles } from '../styles/styles';




const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";


class ScreenCategory extends Component {


    componentDidMount() {
        this.retrieveAndSetUserTokenBoolean(USER_TOKEN_STORAGE_KEY);

    }


    constructor(props) {
        super(props);

        this.state = {}
    }


    navigateToMainApp = () => {

        setTimeout(() => {
            this.props.navigation.navigate("MainAppScreen");
        }, 2000);
    }

    navigateToIntro = () => {

        setTimeout(() => {
            this.props.navigation.navigate("Intro");
        }, 2000);
    }


    retrieveAndSetUserTokenBoolean = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                console.log("not empty");
                // this.props.navigation.navigate("MainAppScreen");
                this.navigateToMainApp();
            } else {
                this.navigateToIntro();
                // this.props.navigation.navigate("Intro");
                console.log("empty");

            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }

    }


    render() {
        return (
            <View style={styles.screensplash}>
                <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />

            </View>
        )
    }
}

export default ScreenCategory;