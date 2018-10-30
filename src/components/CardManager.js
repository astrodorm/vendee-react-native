import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonPrimaryAccent from './ButtonPrimaryAccent';

const CardManager = (props) => {

    return (
        <View>
            <View style={styles.cards}>
                <View style={styles.CardContainer}>
                    <Image style={styles.cardIcon} source={require('../../assets/images/mastercard-48.png')} />
                    <Text style={styles.cardNumber}>... 6643</Text>
                    <Text style={styles.cardOwner}>TIMMY MICKY</Text>
                </View>
                <View style={styles.CardContainer}>
                    <Image style={styles.cardIcon} source={require('../../assets/images/mastercard-48.png')} />
                    <Text style={styles.cardNumber}>... 6643</Text>
                    <Text style={styles.cardOwner}>TIMMY MICKY</Text>
                </View>
            </View>
            <ButtonPrimaryAccent title="ADD CARD" icon="form" isActive={false} onSelected={this.AddAdress} />
        </View>
    )
}

export default CardManager;