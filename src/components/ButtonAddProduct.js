import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const ButtonAddProduct = (props) => {

    return (
        <TouchableOpacity onPress={() => props.funcAddProduct()}>
            <Text>
                {props.quantity}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonAddProduct;