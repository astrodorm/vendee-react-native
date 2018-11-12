import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/styles';



class CardShoppingList extends Component {

    constructor(props) {
        super(props)
    }

    formatPrice = (amount) => {
        var formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)
        return formattedAmount;
    }

    render() {
        return (
            <View style={styles.CardShoppingListContainer}>
                <View style={styles.CardShoppingListHeader}>
                    <Text style={styles.CardShoppingListTime}>{this.props.relativeTime}</Text>
                </View>
                <View style={styles.CardShoppingListProductContainer}>
                    <Image style={styles.CardShoppingProductImage} source={{ uri: this.props.thumbnail }} style={{ width: 50, height: 50 }} />
                    <View style={styles.CardShoppingProductDetails}>
                        <Text style={styles.ProductTitle}>{this.props.title}</Text>
                        <Text style={styles.productSubtitle}>PARCEL ID : {this.props.parcelID} </Text>
                        <Text style={styles.productSubtitle}>PRICE : {this.formatPrice(this.props.price)} </Text>
                        <Text style={styles.productSubtitle}>QUANTITY : {this.props.quantity} </Text>
                    </View>
                    <View style={styles.cardShoppingListStatusContainer}>
                        <Text style={styles.CardShoppingListStatus}>{this.props.orderStatus}</Text>
                        {/* <Text style={styles.parcelID}>{this.props.parcelID}</Text> */}
                    </View>
                </View>
            </View>
        )
    }

}

export default CardShoppingList;
