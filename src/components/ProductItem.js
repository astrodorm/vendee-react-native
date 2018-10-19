import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from '../styles/styles';

class ProductItem extends Component {

    render() {
        return (
            <View style={styles.ProductItem}>
                <View>
                    <Image style={styles.ProductImage} source={require('../../assets/images/nasco-corn-flakes-350g.png')} />
                </View>
                <View style={styles.ProductDetails}>
                    <Text style={styles.ProductTitle}>Nasco Cornflakes 350g</Text>
                    <Text style={styles.ProductPrice}>NGN 1,200 </Text>
                </View>
                <View>
                    <Text style={styles.ProductQuantity}>x3</Text>
                </View>
                <View>
                    <Icon name="pluscircleo" size={22} color="#0D284A">x3</Icon>
                </View>
            </View>
        )
    }

}

export default ProductItem;