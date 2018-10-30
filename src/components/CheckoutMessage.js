import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';


class CheckoutMessage extends Component {


    placeOrder = () => {
        console.log("placeOrder")
    }

    gotoShoppingList = () => {
        this.props.navigation.push('MainAppScreen');
    }


    render() {
        return (
            <View>
                <View style={styles.introCards}>
                    <View style={styles.centerView}>
                        <Image style={styles.introSucessImage} source={require('../../assets/images/icon-good.png')} />
                    </View>
                    <View style={styles.centerView}>
                        <Text style={styles.introCardHeader}>Success !!</Text>
                        <Text style={styles.introCardSubtitle}>We have received your order</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.gotoShoppingList}>
                        <Text style={styles.introCardButton}> VIEW ORDER DETAILS </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

export default CheckoutMessage;