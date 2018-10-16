import React, { Component } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';


class SearchBar extends Component {

    render() {
        return (
            <View style={styles.AppSearchBar}>
                <TextInput style={styles.AppSearchBarTextInput} placeholder="What do you want to buy"></TextInput>
                <Icon style={styles.AppSearchBarIcon} name="right" size={22} color="#EC2434" />
            </View>
        )
    }
}

export default SearchBar;
