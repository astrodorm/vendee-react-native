import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { styles } from '../styles/styles';


const MenuPrimaryButton = (props) => {

    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={styles.MenuPrimaryButton}>
                <Icon name={props.icon} size={22} color={"#fff"} />
                <Text style={styles.MenuPrimaryText}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default MenuPrimaryButton;