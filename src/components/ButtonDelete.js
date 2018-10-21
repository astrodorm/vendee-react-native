import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ButtonDone = (props) => {

        return (
            <TouchableOpacity onPress={() => props.funcDelete()}>
                    <View style={styles.shoppingListRemoveBtn}>
                        <Icon name="delete" size={22} color="#fff" />
                    </View>
            </TouchableOpacity>
        )
}

export default ButtonDone;