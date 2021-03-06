import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonDone = (props) => {

    return (
        <View>
            <TouchableOpacity onPress={() => props.onSelected()}>
                <View style={styles.AccordionHeader}>
                    <View>
                        <Text style={styles.AccordionHeaderTitle}>{props.title}</Text>
                        <Text style={styles.AccordionHeaderSubtitle}>{props.subtitle}</Text>
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Icon name="down" color="#4a4a4a" size={20} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonDone;