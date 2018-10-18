import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/styles';
import DeliveryPicker from '../components/DeliveryPicker';
import FilterPicker from '../components/FilterPicker';
import ProductItem from '../components/ProductItem';
import Accordion from 'react-native-collapsible/Accordion';
import ProductQuantityPicker from './ProductQuantityPicker';


const SECTIONS = [
    {
        title: 'HEADER 111111',
        content: 'Quantiy header 11111 ipsum...'
    },
    {
        title: 'HEADER 22222',
        content: 'Quantity header 22222 ipsum...'
    }
];





class SearchResult extends Component {


    state = {
        activeSections: []
    };

    // _renderSectionTitle = section => {
    //     return (
    //         <View style={styles.content}>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // };

    _renderHeader = section => {
        return (
            <ProductItem />
        );
    };

    _renderContent = section => {
        return (
            <ProductQuantityPicker />
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };



    render() {
        return (
            <View style={styles.AppMain}>
                <View>
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
                        <Accordion
                            sections={SECTIONS}
                            activeSections={this.state.activeSections}
                            // renderSectionTitle={this._renderSectionTitle}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                            underlayColor="#efefef"
                        />
                    </View>
                </View>

                <View style={styles.BottomDrawer}>
                    <Text>shopping list here</Text>
                </View>
            </View>
        )
    }
}

export default SearchResult;