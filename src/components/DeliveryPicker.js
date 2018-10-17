import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles'

class DeliveryPicker extends Component {

    render() {
        return (
            <View style={styles.AppDeliveryPickerContainer}>
                <View style={styles.ActiveDeliveryPicker}>
                    <View style={styles.ActiveDeliveryPickerCheckbox}></View>
                    <Text style={styles.ActiveDeliveryPickerText}>Deliver it to me </Text>
                </View>
                <View style={styles.DeliveryPicker}>
                    <Text style={styles.DeliveryPickerText}>I will pick it up</Text>
                </View>
            </View>
        )
    }
}


export default DeliveryPicker;
