import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';


const ProductOptions = (props) => {

    return (
        <View style={styles.FBtnQuantityPicker}>
            <TouchableOpacity onPress={() => props.onDecrement()}>
                <View style={styles.QuantityBtn}>
                    <Icon name="minus" size={22} color="#fff" />
                </View>
            </TouchableOpacity>
            <View>
                <Text style={styles.QuantityText}> {props.quantity} </Text>
            </View>
            <TouchableOpacity onPress={() => props.onIncrement()}>
                <View style={styles.QuantityBtn}>
                    <Icon name="plus" size={22} color="#fff" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onDone()}>
                <View style={styles.QuantityBtn}>
                    <Icon name="check" size={22} color="#fff" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProductOptions;