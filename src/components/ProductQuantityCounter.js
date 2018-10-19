import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

const ProductQuantityCounter = (props) => {

    return (
        <View style={styles.QuantitySection}>
            <Text style={styles.QuantityHeaderText}>QUANTITY</Text>
            <View>
                <Text style={styles.QuantityText}> {props.quantity} </Text>
            </View>
        </View>
    )
}

export default ProductQuantityCounter;