import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/styles';
import DeliveryPicker from '../components/DeliveryPicker';


class SearchResult extends Component {

    render() {
        return (
            <View style={styles.AppMain}>
                <Image style={styles.AppImage} source={require('../../assets/images/vendee-logo-grey.png')} />
                <Text>SearchResult Here</Text>
                <SearchBar />
                <DeliveryPicker />
            </View>
        )
    }
}

export default SearchResult;