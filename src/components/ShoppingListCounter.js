import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

const ShoppingListCounter = (props) => {

    return (
        <View>
            <Text style={styles.FBtnCount}>
                {props.count}
            </Text>
        </View>
    )
}

export default ShoppingListCounter;