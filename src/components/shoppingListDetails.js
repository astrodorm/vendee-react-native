import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import 'intl';
import 'intl/locale-data/jsonp/en';


class shoppingListDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    formatAmount = (amount) => {

        let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(parseInt(amount))

        return formattedTotal
    }

    render() {
        return (
            <View style={styles.shoppingListAmountsContainer}>
                <View style={styles.shoppingListAmountDetails}>
                    <Text style={styles.shoppingListDetailsLabel}>Total</Text>
                    <Text style={styles.shoppingListDetailsPrice}>{this.formatAmount(this.props.total)}</Text>
                </View>
                <View style={styles.shoppingListAmountDetails}>
                    <Text style={styles.shoppingListDetailsLabel}>Convenience fee</Text>
                    <Text style={styles.shoppingListDetailsPrice}> {this.formatAmount(this.props.convenienceFee)}</Text>
                </View>
                <View style={styles.shoppingListAmountDetails}>
                    <Text style={styles.shoppingListDetailsLabel}>Delivery fee</Text>
                    <Text style={styles.shoppingListDetailsPrice}>{this.formatAmount(this.props.deliveryFee)}</Text>
                </View>
                <View style={styles.shoppingListAmountDetails}>
                    <Text style={styles.shoppingListDetailsBoldLabel}>Grand Total</Text>
                    <Text style={styles.shoppingListDetailsBoldPrice}> {this.formatAmount(this.props.grandTotal)}</Text>
                </View>
            </View>
        )
    }
}

export default shoppingListDetails;