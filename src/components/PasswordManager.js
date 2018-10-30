import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonPrimaryAccent from './ButtonPrimaryAccent';

const PasswordManager = (props) => {

    return (
        <View>
            <ButtonPrimaryAccent title="CHANGE PASSWORD" icon="form" isActive={false} onSelected={this.AddAdress} />
        </View>
    )
}

export default PasswordManager;