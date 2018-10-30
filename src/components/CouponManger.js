import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
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