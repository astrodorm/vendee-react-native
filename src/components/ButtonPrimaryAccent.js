import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonPrimaryAccent = (props) => {

    getIconColor = () => {

        let ActiveIconColor = "#FFF";
        let InactiveIconColor = "#F44950";

        props.isActive === true ? value = ActiveIconColor : value = InactiveIconColor;

        return value;
    }

    return (
        <View>
            <TouchableOpacity onPress={() => props.onSelected()}>
                <View style={[styles.ButtonPrimaryAccent, props.isActive ? styles.ButtonPrimaryAccentActive : null]}>
                    <Icon style={styles.ButtonSecondaryAccentIcon} name={props.icon} size={24} color={getIconColor()} />
                    <Text style={[styles.ButtonPrimaryAccentText, props.isActive ? styles.ButtonPrimaryAccentActiveText : null]} >{props.title} </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonPrimaryAccent;