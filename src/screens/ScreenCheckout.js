import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import ShoppingListDetails from '../components/shoppingListDetails';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import AccordionHeader from '../components/AccordionHeader';
import AddressManager from '../components/AddressManager';
import TelephoneManager from '../components/TelephoneManager';
import PasswordManger from '../components/PasswordManager';
import CardManager from '../components/CardManager';
import CouponManger from '../components/CouponManger';


class ScreenCheckout extends Component {

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
            isVisibleCoupon: true
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
            case "password":
                this.setState({ isVisiblePassword: !this.state.isVisiblePassword });
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
                                <Icon style={styles.navigationButton} name="arrowleft" size={24} color="#0D284A" onPress={() => this.goBack()} />
                                <Text style={styles.AppCardHeader}>Checkout</Text>
                                <View>
                                    <AccordionHeader title="Address" subtitle="20 Chidi Okpala Close, Fidiso Estate" onSelected={() => { this.toggleView("address") }} />
                                    <Collapsible collapsed={this.state.isVisibleAddress}>
                                        <AddressManager />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Phone Number" subtitle="0706 818 1804" onSelected={() => { this.toggleView("phonenumber") }} />
                                    <Collapsible collapsed={this.state.isVisiblePhoneNumber}>
                                        <TelephoneManager />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Change Password" subtitle="********" onSelected={() => { this.toggleView("password") }} />
                                    <Collapsible collapsed={this.state.isVisiblePassword}>
                                        <PasswordManger />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Select Card" subtitle="**** 4678" onSelected={() => { this.toggleView("card") }} />
                                    <Collapsible collapsed={this.state.isVisibleCard}>
                                        <CardManager />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Use Coupon" subtitle="MYFIRSTORDER applied" onSelected={() => { this.toggleView("coupon") }} />
                                    <Collapsible collapsed={this.state.isVisibleCoupon}>
                                        <CouponManger />
                                    </Collapsible>
                                </View>
                                <View>
                                    <Text style={styles.AppCardSubtitle}>SHOPPING LIST DETAILS</Text>
                                    <ShoppingListDetails total="NGN 3,500.00" convenienceFee="NGN 75.00" deliveryFee="500.00" grandTotal="NGN 22,000.00" />
                                    <ButtonPrimaryAccent title="PLACE ORDER" icon="arrowright" isActive={true} onSelected={this.placeOrder} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default ScreenCheckout;