import React from 'react';
import { View } from 'react-native';
import ButtonPrimaryAccent from './ButtonPrimaryAccent';

const PasswordManager = (props) => {

    return (
        <View>
            <ButtonPrimaryAccent title="UPDATE PASSWORD" icon="form" isActive={false} onSelected={this.AddAdress} />
        </View>
    )
}

export default PasswordManager;