import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { styles } from '../styles/styles';


const MenuDefaultButton = (props) => {

    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={styles.MenuDefaultButton}>
                <Icon name={props.icon} size={22} color={"#F44950"} />
                <Text style={styles.MenuDefaultButtonText}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default MenuDefaultButton;