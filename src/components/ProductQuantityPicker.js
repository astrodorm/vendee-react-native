import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

class ProductQuantityPicker extends Component {
    render() {
        return (
            <View style={styles.QuantityPickerContainer}>
                <View style={styles.QuantityPlus}>
                    <Icon name="plus" size={22} color="#fff" />
                </View>
                <View style={styles.QuantitySection}>
                    <Text style={styles.QuantityHeaderText}>QUANTITY</Text>
                    <View>
                        <Text style={styles.QuantityText}> 3 </Text>
                    </View>
                </View>
                <View style={styles.QuantityMinus}>
                    <Icon name="minus" size={22} color="#fff" />
                </View>
            </View>
        )
    }
}

export default ProductQuantityPicker;