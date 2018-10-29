import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
import CardShoppingList from '../components/CardShoppingList';


class ScreenShoppingList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showCheckoutMessage: true,
            showPlaceOrderComponent: false
        }
    }



    placeOrder = () => {
        console.log("placeOrder")
    }


    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <CardShoppingList />
                    <CardShoppingList />
                </View>
            </View>
        )
    }
}

export default ScreenShoppingList;