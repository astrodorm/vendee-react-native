import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from '../styles/styles';

const BASE_THUMBNAIL_URL = "https://api.yourvendee.com/upload";
const NO_IMAGE_URL = "https://vendee.sfo2.cdn.digitaloceanspaces.com/CATALOGUE/ASSETS/no-image.png";


class CardShoppingList extends Component {

    constructor(props) {
        super(props)
    }

    formatPrice = (amount) => {
        var formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)
        return formattedAmount;
    }

    convertToSentenceCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    getImagePath = (imageURL) => {

        //DEFAULT IMAGE PATH IS TO PLACHEOLDER IMAGE
        let imagePath = NO_IMAGE_URL;

        if (imageURL !== "" && imageURL !== undefined) {

            imagePath = imageURL;

        }

        return imagePath;
    }

    _renderShoppingListItem = ({ item }) => (
        <View style={styles.CardShoppingListProductItemContainer}>
            <Image style={styles.CardShoppingProductImage} source={{ uri: this.getImagePath(item.thumbnail) }} style={{ width: 50, height: 50 }} />
            <View style={styles.CardShoppingProductDetails}>
                <Text style={styles.ProductTitle}>{this.convertToSentenceCase(item.productName)}</Text>
                <Text style={styles.productSubtitle}>PRICE : {this.formatPrice(item.price)} </Text>
                <Text style={styles.productSubtitle}>QUANTITY : {item.quantity} </Text>
            </View>
        </View>

    );

    render() {
        return (
            <View style={styles.CardShoppingListContainer}>
                <View style={styles.CardShoppingListHeader}>
                    <Text style={styles.CardShoppingListTime}>{this.props.relativeTime}</Text>
                    <Text style={styles.CardShoppingListTime}>Shipping Method: {this.props.shippingMethod}</Text>
                    <Text style={styles.CardShoppingListTime}>Time Slot: {this.props.deliveryTime}</Text>
                    <Text style={styles.CardShoppingListTime}>{this.props.merchantNameAddress}</Text>
                </View>
                <View style={styles.CardShoppingListProductContainer}>
                    <View style={styles.CardShoppingListInfo}>
                        <Text style={styles.productSubtitle}>PARCEL ID : #{this.props.parcelID} </Text>
                        <Text style={styles.CardShoppingListStatus}>{this.props.orderStatus}</Text>
                    </View>
                    <FlatList
                        data={this.props.productsArray}
                        extraData={this.props}
                        keyExtractor={item => item._id}
                        renderItem={this._renderShoppingListItem}
                    />
                </View>

            </View>
        )
    }

}

export default CardShoppingList;
