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
                <View>
                    <Text>Product name here</Text>
                </View>
                <View>
                    <Text>
                        PLUS SIGN
                </Text>
                </View>
            </View>
        )
    }

}

export default ProductItem;