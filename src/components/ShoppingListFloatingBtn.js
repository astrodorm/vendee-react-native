import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';


const shoppingListFloatingBtn = (props) => {

    return (
        <View>
            <TouchableOpacity onPress={() => props.onPress()}>
                <View style={styles.FBtnShoppingList}>
                    <View style={styles.FBtnCountContainer}>
                        <Text style={styles.FBtnCount}> {props.count} </Text>
                    </View>
                    <Text style={styles.FBtnText}>view shopping list</Text>
                    <Icon name="arrowsalt" size={20} color={"#0D284A"} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default shoppingListFloatingBtn;