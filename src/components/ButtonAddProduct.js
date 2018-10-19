import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'


const ButtonAddProduct = (props) => {

    return (
        <TouchableOpacity onPress={() => props.funcAddProduct()}>
            <Icon name="pluscircleo" size={22} color={"#0D284A"}/>
        </TouchableOpacity>
    )
}

export default ButtonAddProduct;