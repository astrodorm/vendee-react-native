import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { connect } from 'react-redux';
import { selectDeliveryMethod } from '../actions/actions';


class DeliveryPicker extends Component {

    constructor(props) {
        super(props)
    }

    selectDelivery = () => {
        this.props.dispatch(selectDeliveryMethod(true, false, 500));
    }

    selectPickup = () => {
        this.props.dispatch(selectDeliveryMethod(false, true, 0));
    }

    render() {
        return (
            <View style={styles.AppDeliveryPickerContainer}>
                <TouchableOpacity onPress={() => this.selectDelivery()}>
                    <View style={[styles.DeliveryPicker, this.props.isDelivery ? styles.ActiveDeliveryPicker : null]}>
                        <View style={[styles.DeliveryPickerCheckbox, this.props.isDelivery ? styles.ActiveDeliveryPickerCheckbox : null]}></View>
                        <Text style={[styles.DeliveryPickerText, this.props.isDelivery ? styles.ActiveDeliveryPickerText : null]}>Deliver it to me </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectPickup()}>
                    <View style={[styles.DeliveryPicker, this.props.isPickup ? styles.ActiveDeliveryPicker : null]}>
                        <View style={[styles.DeliveryPickerCheckbox, this.props.isPickup ? styles.ActiveDeliveryPickerCheckbox : null]}></View>
                        <Text style={[styles.DeliveryPickerText, this.props.isPickup ? styles.ActiveDeliveryPickerText : null]}>I will pick it up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}



const mapStateToProps = state => ({

    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup

})

export default connect(mapStateToProps)(DeliveryPicker);
