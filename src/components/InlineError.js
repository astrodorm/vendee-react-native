import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';


const ProductOptions = (props) => {

    return (
        <View style={styles.InlineError}>
            <Text style={styles.InlineErrorText}>{props.message}</Text>
        </View>
    )
}

export default ProductOptions;