import React, { Component } from 'react';
import { Text, View, ScrollView, AsyncStorage, BackHandler } from 'react-native';
import { styles } from '../styles/styles';
import Collapsible from 'react-native-collapsible';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import AccordionHeader from '../components/AccordionHeader';
import AddressManager from '../components/AddressManager';
import TelephoneManager from '../components/TelephoneManager';
import CardManager from '../components/CardManager';
import NamesManager from '../components/NamesManager';
import { connect } from 'react-redux';


const ADDRESS_STORAGE_KEY = "ADDRESS";
const OAUTH = "OAUTH";
const PHONE_STORAGE_KEY = "PHONE";
const CARD_NUMBER_STORAGE_KEY = "CARD_NUMBER";
const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";
const EMAIL_STORAGE_KEY = "EMAIL";




class ScreenProfile extends Component {

    componentWillMount() {
        this.retrieveAndSetEmail(EMAIL_STORAGE_KEY);
    }


    constructor(props) {
        super(props)

        this.state = {
            showCheckoutMessage: false,
            showPlaceOrderComponent: true,
            activeSections: [],
            isVisibleAddress: true,
            isVisiblePhoneNumber: true,
            isVisiblePassword: true,
            isVisibleCard: true,
            isVisibleCoupon: true,
            isVisibleName: true,
            email: ""
        }
    }

    retrieveAndSetEmail = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ email: value });

            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }


    toggleView = (tag) => {

        switch (tag) {
            case "address":
                this.setState({ isVisibleAddress: !this.state.isVisibleAddress });
                break;
            case "phonenumber":
                this.setState({ isVisiblePhoneNumber: !this.state.isVisiblePhoneNumber });
                break;
            case "name":
                this.setState({ isVisibleName: !this.state.isVisibleName });
                break;
            case "card":
                this.setState({ isVisibleCard: !this.state.isVisibleCard });
                break;
            case "coupon":
                this.setState({ isVisibleCoupon: !this.state.isVisibleCoupon });
                break;
            default:
                this.setState({ isVisibleAddress: !this.state.isVisibleAddress });
                break;
        }
    }


    goBack = () => {
        this.props.navigation.goBack()
    }

    logoutUser = () => {

        this.removeStorage(ADDRESS_STORAGE_KEY).then(
            this.removeStorage(OAUTH)
        ).then(
            this.removeStorage(PHONE_STORAGE_KEY)
        ).then(
            this.removeStorage(CARD_NUMBER_STORAGE_KEY)
        ).then(
            this.removeStorage(USER_TOKEN_STORAGE_KEY)
        ).then(
            this.removeStorage(EMAIL_STORAGE_KEY)
        ).then(
            this.navigateToLandingScreen()
        )

    }

    navigateToLandingScreen = () => {
        this.props.navigation.navigate('Intro');
    }

    removeStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }





    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                        <View style={styles.AppCardContainer}>
                            <View style={styles.AppCard}>
                                <Text style={styles.AppCardHeader}>User Profile</Text>
                                <View style={styles.headingDivider}></View>
                                <Text>Hello, </Text>
                                <Text>{this.state.email}</Text>
                                <View style={styles.headingDivider}></View>
                                <View>
                                    <ButtonPrimaryAccent title="LOGOUT" icon="logout" isActive={false} onSelected={this.logoutUser} />
                                </View>
                                <Text>Need help?. Email: hello@yourvendee.com</Text>
                            </View>
                        </View>
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({

    user: state.users.user,

})

export default connect(mapStateToProps)(ScreenProfile);