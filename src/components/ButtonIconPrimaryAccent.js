import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonIconPrimaryAccent = (props) => {

    getIconColor = () => {

        let ActiveIconColor = "#FFF";
        let InactiveIconColor = "#F44950";

        props.isActive === true ? value = ActiveIconColor : value = InactiveIconColor;

        return value;
    }

    return (
        <View>
            <TouchableOpacity onPress={() => props.onSelected()}>
                <View style={[styles.ButtonIconPrimaryAccent, props.isActive ? styles.ButtonPrimaryAccentActive : null]}>
                    <Icon style={styles.ButtonIconPrimaryAccentIcon} name={props.icon} size={20} color={getIconColor()} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonIconPrimaryAccent;