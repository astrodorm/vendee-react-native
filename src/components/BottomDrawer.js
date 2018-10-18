import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';







class BottomDrawer extends Component {

    render() {
        return (

            <View>
                <View style={styles.BottomDrawerHeader}>
                    <View style={styles.BottomDrawerHeaderText}>
                        <Text style={styles.BottomDrawerTitle}>SHOPPING LIST</Text>
                        <Text style={styles.BottomDrawerCount}>5</Text>
                    </View>
                    <Icon name="upcircleo" size={22} color="#fff" />
                </View>
                <View style={styles.BottomDrawerContent}>
                    <Text>
                        Shopping List Here
                    </Text>
                </View>
            </View>

        )
    }
}

export default BottomDrawer