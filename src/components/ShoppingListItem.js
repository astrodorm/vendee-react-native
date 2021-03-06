import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import 'intl';
import 'intl/locale-data/jsonp/en';


class ShoppingListItem extends Component {

    constructor(props) {
        super(props)
    }

    formatPrice = (amount) => {
        var formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)
        return formattedAmount;
    }

    render() {
        return (
            <View style={styles.ProductItem}>
                <Image style={styles.ProductImage} source={{ uri: this.props.thumbnail }} style={{ width: 50, height: 50 }} />
                <View style={styles.ProductDetails}>
                    <Text style={styles.ProductTitle}>{this.props.title}</Text>
                    <Text style={styles.ProductPrice}> {this.formatPrice(this.props.price)} </Text>

                </View>
                <TouchableOpacity onPress={() => this.props.onSelectItem()}>
                    <View style={[styles.AddProductTextContainer, this.props.isAdded ? styles.AddProductSelectedContainer : styles.AddProductUnselectedContainer]}>
                        {/* <Text style={[styles.AddProductText, this.props.isAdded ? styles.AddProductSelected : styles.AddProductUnselected]}> */}
                        <Text style={styles.AddProductText}>
                            {this.props.quantity}
                        </Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

}

export default ShoppingListItem;
