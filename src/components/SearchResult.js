import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/styles';
import DeliveryPicker from '../components/DeliveryPicker';
import FilterPicker from '../components/FilterPicker';
import ProductItem from '../components/ProductItem';

class SearchResult extends Component {

    render() {
        return (
            <View style={styles.AppMain}>
                {/* <Image style={styles.AppImage} source={require('../../assets/images/vendee-logo-grey.png')} /> */}
                <SearchBar />
                <DeliveryPicker />
                <View style={styles.AppSearchResultHeader}>
                    <View>
                        <Text style={styles.AppCardTitle}>SEARCH RESULT</Text>
                    </View>
                    <View>
                        <FilterPicker />
                    </View>
                </View>
                <View style={styles.AppSearchResultDisplayContainer}>
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </View>
            </View>
        )
    }
}

export default SearchResult;