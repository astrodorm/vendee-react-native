import React, { Component } from 'react';
import { View, AsyncStorage, Image } from 'react-native';
import { styles } from '../styles/styles';
import { fetchFeesAction, isNearbyMerchantAction } from '../actions/actions';
import { connect } from 'react-redux';
import InlineError from '../components/InlineError';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';




const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";


class ScreenCategory extends Component {


    componentDidMount() {

        // this.fetchFees();
        //this.isNearbyMerchant();
        this.getCurrentLocation();



    }


    constructor(props) {
        super(props);

        this.state = {
            isVisibleFeesError: false,
            isVisibleMerchantError: false,
            staticNearbyMerchantLng: 3.5088230000000067,
            staticNearbyMerchantLat: 6.4438698,
            isVisibleGeolocationError: false
        }
    }

    fetchFees = () => {

        this.hideFeesError();

        this.props.dispatch(fetchFeesAction()).then(res => {
            console.log(res);
            this.hideFeesError();
            this.retrieveAndSetUserTokenBoolean(USER_TOKEN_STORAGE_KEY);

        }).catch(err => {
            console.log("err");
            console.log(err);
            this.showFeesError();

        });

    }

    isNearbyMerchant = (lng, lat) => {
        this.hideMerchantError();
        this.hideGeolocationError();


        this.props.dispatch(isNearbyMerchantAction(lng, lat)).then(res => {

            this.hideMerchantError();
            console.log(res);
            console.log("res.nearby", res.nearby);
            res.nearby === true ? this.fetchFees() : this.showMerchantError();
            //this.retrieveAndSetUserTokenBoolean(USER_TOKEN_STORAGE_KEY);
            // this.showMerchantError();
        }).catch(err => {
            console.log(err);
            this.showGeolocationError();

        });
    }

    getCurrentLocation = () => {

        console.log("Getting current location");
        this.hideMerchantError();
        this.hideGeolocationError();

        navigator.geolocation.getCurrentPosition(
            (position) => {

                console.log("latitude:", position.coords.latitude);
                console.log("longitude:", position.coords.longitude);

                this.isNearbyMerchant(position.coords.longitude, position.coords.latitude);
            },
            (error) => {
                console.log("error:", error.message);
                this.showGeolocationError();
            },
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    showFeesError = () => {
        this.setState({ isVisibleFeesError: true })
    }

    showMerchantError = () => {
        this.setState({ isVisibleMerchantError: true })
    }

    showGeolocationError = () => {
        this.setState({ isVisibleGeolocationError: true })
    }

    hideFeesError = () => {
        this.setState({ isVisibleFeesError: false })
    }

    hideMerchantError = () => {
        this.setState({ isVisibleMerchantError: false })
    }

    hideGeolocationError = () => {
        this.setState({ isVisibleGeolocationError: false })
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

                this.navigateToMainApp();

            } else {

                this.navigateToIntro();

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
                <View style={styles.headingDivider}></View>
                {this.state.isVisibleFeesError &&
                    <View>
                        <InlineError message={"Check your internet connection and try again."} />
                        <View style={styles.headingDivider}></View>
                        <ButtonPrimaryAccent title="RETRY" icon="reload1" isActive={true} onSelected={this.fetchFees} />
                    </View>
                }

                {this.state.isVisibleMerchantError &&
                    <View>
                        <InlineError message={"There are no nearby merchants. Vendee is currently available in Jakande, Lagos. By continuing, you agree that your address for pickup or delivery would be in Jakande, Lagos."} />
                        <View style={styles.headingDivider}></View>
                        <ButtonPrimaryAccent title="CHANGE LOCATION AND CONTINUE" icon="arrowright" isActive={true} onSelected={() => this.isNearbyMerchant(this.state.staticNearbyMerchantLng, this.state.staticNearbyMerchantLat)} />
                    </View>
                }
                {this.state.isVisibleGeolocationError &&
                    <View>
                        <InlineError message={"To use the app, please turn on your Location in the Settings menu of your device. Also, check that YourVendee is allowed to access your location and that you are connected to the internet."} />
                        <View style={styles.headingDivider}></View>
                        <ButtonPrimaryAccent title="TRY AGAIN" icon="reload1" isActive={true} onSelected={() => this.getCurrentLocation()} />
                    </View>
                }
            </View>
        )
    }
}


const mapStateToProps = state => ({


})

export default connect(mapStateToProps)(ScreenCategory);