import React, { Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { withNavigation } from 'react-navigation';

class CheckoutButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Checkout') }}>
                    <View style={[styles.ButtonPrimaryAccent, styles.ButtonPrimaryAccentActive]}>
                        <Icon style={styles.ButtonSecondaryAccentIcon} name="creditcard" size={24} color="#fff" />
                        <Text style={[styles.ButtonPrimaryAccentText, styles.ButtonPrimaryAccentActiveText]} > CHECKOUT </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


export default withNavigation(CheckoutButton);
