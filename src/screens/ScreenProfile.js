import React, { Component } from 'react';
import { Text, View, ScrollView,AsyncStorage } from 'react-native';
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




class ScreenProfile extends Component {

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
            isVisibleName: true
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

    // placeOrder = () => {
    //     this.props.navigation.push('CheckoutMessage');
    // }

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
                    <ScrollView>
                        <View style={styles.AppCardContainer}>
                            <View style={styles.AppCard}>
                                <Text style={styles.AppCardHeader}>User Profile</Text>
                                <View style={styles.headingDivider}></View>
                                <Text>Hello, </Text>
                                <Text style={styles.username}>{this.props.user.customer.firstname} {this.props.user.customer.lastname}</Text>

                                <Text>email : {this.props.user.customer.email}</Text>
                                <Text>phone : {this.props.user.customer.phoneNumber}</Text>
                                <View style={styles.headingDivider}></View>


                                {/* <View>
                                    <AccordionHeader title="Names" subtitle="Michael Oshogbunu" onSelected={() => { this.toggleView("name") }} />
                                    <Collapsible collapsed={this.state.isVisibleName}>
                                        <NamesManager />
                                    </Collapsible>
                                </View> */}
                                {/* <View>
                                    <AccordionHeader title="Phone Number" subtitle="0706 818 1804" onSelected={() => { this.toggleView("phonenumber") }} />
                                    <Collapsible collapsed={this.state.isVisiblePhoneNumber}>
                                        <TelephoneManager />
                                    </Collapsible>
                                </View> */}
                                {/* <View>
                                    <AccordionHeader title="Address" subtitle="20 Chidi Okpala Close, Fidiso Estate" onSelected={() => { this.toggleView("password") }} />
                                    <Collapsible collapsed={this.state.isVisibleAddress}>
                                        <AddressManager/>
                                    </Collapsible>
                                </View> */}
                                {/* <View>
                                    <AccordionHeader title="Select Card" subtitle="**** 4678" onSelected={() => { this.toggleView("card") }} />
                                    <Collapsible collapsed={this.state.isVisibleCard}>
                                        <CardManager />
                                    </Collapsible>
                                </View> */}
                                <View>
                                    <ButtonPrimaryAccent title="LOGOUT" icon="logout" isActive={false} onSelected={this.logoutUser} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

//export default ScreenProfile;

const mapStateToProps = state => ({

    //  responseMessage: state.users.responseMessage,
    user: state.users.user,
    // isLoginUserError: state.users.isLoginUserError,
    // isLoginUserSuccess: state.users.isLoginUserSuccess,
    // isSigningInUser: state.users.isSigningInUser

})

export default connect(mapStateToProps)(ScreenProfile);