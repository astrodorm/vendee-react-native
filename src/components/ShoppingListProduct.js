import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/styles';


class ShoppingListProduct extends Component {

    constructor(props) {
        super(props)
    }

    formatPrice = (amount) => {
        var formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)
        return formattedAmount;
    }

    render() {
        return (
            <View style={styles.CardShoppingProductItem}>
                <Image style={styles.CardShoppingProductImage} source={{ uri: this.props.thumbnail }} style={{ width: 50, height: 50 }} />
                <View style={styles.CardShoppingProductDetails}>
                    <Text style={styles.ProductTitle}>{this.props.title}</Text>
                    <Text style={styles.ProductPrice}> {this.formatPrice(this.props.price)} X {this.props.quantity} </Text>
                </View>
            </View>
        )
    }

}

export default ShoppingListProduct;
