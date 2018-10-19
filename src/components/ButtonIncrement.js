import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonIncrement = (props) => {

        return (
            <TouchableOpacity onPress={() => props.funcIncrement()}>
                    <View style={styles.QuantityBtn}>
                        <Icon name="plus" size={22} color="#fff" />
                </View>
            </TouchableOpacity>
        )
}

export default ButtonIncrement;