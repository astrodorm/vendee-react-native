import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import ShoppingListDetails from '../components/shoppingListDetails';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import CheckoutMessage from '../components/CheckoutMessage';
import AccordionHeader from '../components/AccordionHeader';
import AddressManager from '../components/AddressManager';
import TelephoneManager from '../components/TelephoneManager';
import PasswordManger from '../components/PasswordManager';
import CardManager from '../components/CardManager';
import CouponManger from '../components/CouponManger';
import NamesManager from '../components/NamesManager';


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
            isVisibleName : true
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

    placeOrder = () => {
        this.props.navigation.push('CheckoutMessage');
    }

    goBack = () => {
        this.props.navigation.goBack()
    }


    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <ScrollView>
                        <View style={styles.AppCardContainer}>
                            <View style={styles.AppCard}>
                                {/* <Icon style={styles.navigationButton} name="arrowleft" size={24} color="#0D284A" onPress={() => this.goBack()} /> */}
                                <Text style={styles.AppCardHeader}>User Profile</Text>
                                <View>
                                    <AccordionHeader title="Names" subtitle="Michael Oshogbunu" onSelected={() => { this.toggleView("name") }} />
                                    <Collapsible collapsed={this.state.isVisibleAddress}>
                                        <NamesManager isCheckboxVisible={false} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Phone Number" subtitle="0706 818 1804" onSelected={() => { this.toggleView("phonenumber") }} />
                                    <Collapsible collapsed={this.state.isVisiblePhoneNumber}>
                                        <TelephoneManager />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Address" subtitle="20 Chidi Okpala Close, Fidiso Estate" onSelected={() => { this.toggleView("password") }} />
                                    <Collapsible collapsed={this.state.isVisibleAddress}>
                                        <AddressManager isCheckboxVisible={false} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Select Card" subtitle="**** 4678" onSelected={() => { this.toggleView("card") }} />
                                    <Collapsible collapsed={this.state.isVisibleCard}>
                                        <CardManager />
                                    </Collapsible>
                                </View>
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

export default ScreenProfile;