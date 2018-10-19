import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

const ProductQuantityCounter = (props) => {

    return (
        <View>
            <Text style={styles.QuantityText}> {props.quantity} </Text>
        </View>
    )
}

export default ProductQuantityCounter;