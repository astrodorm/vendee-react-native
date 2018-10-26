import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonSecondaryAccent = (props) => {

    getIconColor = () => {

        let ActiveIconColor = "#8DCC21";
        let InactiveIconColor = "#0D284A";

        props.isActive === true ? value = ActiveIconColor : value = InactiveIconColor;

        return value;
    }

    return (
        <View>
            <TouchableOpacity onPress={() => props.onSelected()}>
                <View style={[styles.ButtonSecondaryAccent, props.isActive ? styles.ButtonSecondaryAccentActive : null]}>
                    <Icon style={styles.ButtonSecondaryAccentIcon} name={props.icon} size={24} color={getIconColor()} />
                    <Text style={[styles.ButtonSecondaryAccentText, props.isActive ? styles.ButtonSecondaryAccentActiveText : null]} >{props.title} </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonSecondaryAccent;