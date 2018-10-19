import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles'

const ProductDetails = (props) => {

    return (
        // <TouchableOpacity onPress={() => props.funcAddProduct()}>
        <View style={styles.ProductDetails}>
            <Text style={styles.ProductTitle}>{props.title}</Text>
            <Text style={styles.ProductPrice}> NGN {props.price}  </Text>
        </View>
        // </TouchableOpacity>
    )
}

export default ProductDetails;