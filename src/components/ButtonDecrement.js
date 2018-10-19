import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonDecrement = (props) => {

        return (
            <TouchableOpacity onPress={() => props.funcDecrement()}>
                    <View style={styles.QuantityBtn}>
                        <Icon name="minus" size={22} color="#fff" />
                    </View>
            </TouchableOpacity>
        )
}

export default ButtonDecrement;