import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';

class FilterPicker extends Component {

    render() {
        return (
            <View style={styles.AppFilterPickerContainer}>
                <Text style={styles.AppDeliveryPickerText}> SORT BY </Text>
            </View>
        )
    }
}

export default FilterPicker;