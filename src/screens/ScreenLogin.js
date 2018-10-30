import React, { Component } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';



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

    placeOrder = () => {
        console.log("placeOrder")
    }



    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.LoginScreen}>
                        <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />
                        <Text style={styles.introHeader}>Sign In</Text>
                        <TextInput placeholder="username"></TextInput>
                        <TextInput placeholder="password"></TextInput>
                        <ButtonPrimaryAccent title="SIGN IN" icon="login" isActive={true} onSelected={this.placeOrder} />
                    </View>
                </View>
            </View>
        );
    }
}

export default ScreenProfile;