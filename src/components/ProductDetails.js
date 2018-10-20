import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles'

const ProductDetails = (props) => {

    return (
        <View style={styles.ProductDetails}>
            <Text style={styles.ProductTitle}>{props.title}</Text>
            <Text style={styles.ProductPrice}> NGN {props.price}  </Text>
        </View>
    )
}

export default ProductDetails;