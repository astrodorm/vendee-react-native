import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';


const shoppingListDetails = (props) => {

    return (
        <View style={styles.shoppingListAmountsContainer}>
            <View style={styles.shoppingListAmountDetails}>
                <Text style={styles.shoppingListDetailsLabel}>Total</Text>
                <Text style={styles.shoppingListDetailsPrice}>{props.total}</Text>
            </View>
            <View style={styles.shoppingListAmountDetails}>
                <Text style={styles.shoppingListDetailsLabel}>Convenience fee</Text>
                <Text style={styles.shoppingListDetailsPrice}> {props.convenienceFee}</Text>
            </View>
            <View style={styles.shoppingListAmountDetails}>
                <Text style={styles.shoppingListDetailsLabel}>Delivery fee</Text>
                <Text style={styles.shoppingListDetailsPrice}>{props.deliveryFee}</Text>
            </View>
            <View style={styles.shoppingListAmountDetails}>
                <Text style={styles.shoppingListDetailsBoldLabel}>Grand Total</Text>
                <Text style={styles.shoppingListDetailsBoldPrice}> {props.grandTotal}</Text>
            </View>
        </View>
    )
}

export default shoppingListDetails;