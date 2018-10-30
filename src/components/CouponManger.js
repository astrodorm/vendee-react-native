import React from 'react';
import { View, TextInput } from 'react-native';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';

const CouponManager = (props) => {

    return (
        <View>
            <TextInput placeholder="Enter coupon code here" />
            <ButtonPrimaryAccent title="APPLY COUPON" icon="tago" isActive={false} onSelected={this.AddAdress} />
        </View>
    )
}

export default CouponManager;