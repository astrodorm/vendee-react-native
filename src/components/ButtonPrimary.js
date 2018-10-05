import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../styles/styles'

class ButtonPrimary extends Component {


    render() {

        let title = "SIGN UP"

        return (
            <View>
                <TouchableOpacity style={styles.buttonPrimary}>
                    <Text style={styles.buttonPrimary}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ButtonPrimary;