import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../styles/styles'

class ButtonSecondary extends Component {


    render() {

        let title = "SIGN IN"

        return (
            <View>
                <TouchableOpacity style={styles.buttonSecondary}>
                    <Text style={styles.buttonSecondaryLight}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ButtonSecondary;