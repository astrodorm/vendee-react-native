import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/styles';
import DeliveryPicker from '../components/DeliveryPicker';
import FilterPicker from '../components/FilterPicker';
import ProductItem from '../components/ProductItem';
import Accordion from 'react-native-collapsible/Accordion';
import ProductQuantityPicker from './ProductQuantityPicker';
import BottomDrawer from '../components/BottomDrawer';
import * as Animatable from 'react-native-animatable';


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


Animatable.initializeRegistryWithDefinitions({
    animateOpenDrawer: {
        from: {
            height: 80,
            bottom: 80,
        },
        to: {
            height: 300,
            bottom: 300
        }
    },
    animateCloseDrawer: {
        from: {
            height: 300,
            bottom: 300,
        },
        to: {
            height: 80,
            bottom: 80
        }
    }
});





class SearchResult extends Component {


    RefBottomDrawer = ref => this.RefBottomDrawer = ref;

    openBottomDrawer = () => {
        this.RefBottomDrawer.animate('animateOpenDrawer', 600)
    }


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
                <View style={styles.AppSearchResultMain}>
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
                <Animatable.View ref={this.RefBottomDrawer} style={styles.BottomDrawer}>
                    {/* <View > */}
                        <TouchableOpacity onPress={() => this.openBottomDrawer()}>
                            <BottomDrawer />
                        </TouchableOpacity>
                    {/* </View> */}
                </Animatable.View>

            </View>
        )
    }
}

export default SearchResult;