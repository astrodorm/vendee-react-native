import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
                <ScrollView>
                    <View style={styles.AppMain}>
                        <View>
                            <CardShoppingList />
                            <CardShoppingList />
                        </View>
                    </View>
                </ScrollView>
            </View>


        )
    }
}

export default ScreenShoppingList;