import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { styles } from '../styles/styles'

class ScreenOnboardPhoneNumber extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>You are welcome to Vendee</Text>
            </View>
        )
    }
}

export default ScreenOnboardPhoneNumber;

