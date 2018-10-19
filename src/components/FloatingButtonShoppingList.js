import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../styles/styles'

class FloatingButtonShoppingList extends Component{
    render(){
        return(
            <View style={styles.FBtnShoppingList}>
                <Text style={styles.FBtnCount}>5</Text>
                <Text style={styles.FBtnText}>view shopping list</Text>
                <Icon name="arrowsalt" size={20} color={"#FFDDBB"}/>
            </View>
        )
    }
}

export default FloatingButtonShoppingList;