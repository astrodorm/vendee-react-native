import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/styles';
import DeliveryPicker from '../components/DeliveryPicker';
import FilterPicker from '../components/FilterPicker';
import ProductItem from '../components/ProductItem';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import FloatingButtonShoppingList from '../components/FloatingButtonShoppingList';
import ButtonIncrement from '../components/ButtonIncrement';
import ButtonDecrement from '../components/ButtonDecrement';
import ProductQuantityCounter from '../components/ProductQuantityCounter';


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

    constructor(props) {
        super(props);

        this.state = {
            isVisibleFBtnShoppingList: false,
            activeSections: []

        }
    }

    // state = {
    //     activeSections: []
    // };

    // _renderSectionTitle = section => {
    //     return (
    //         <View style={styles.content}>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // };

    //TRANSITION HANDLERS
    handleRefFBtnShoppingList = RefFBtnShoppingList => this.RefFBtnShoppingList = RefFBtnShoppingList;

    _renderHeader = section => {
        return (
            <ProductItem />
        );
    };

    _renderContent = section => {
        return (
            // <ProductQuantityPicker animateFBtn={this.animateShoppingListButton} quantity="300"/>
            <View style={styles.QuantityPickerContainer}>
                <ButtonDecrement funcDecrement={this.decrementQuantity} />
                <ProductQuantityCounter quantity="7" />
                <ButtonIncrement funcIncrement={this.incrementQuantity} />
            </View>

        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    showFbtnShoppingListButton = () => {

        //CHANGE STATE TO true TO REFLECT VISIBILTY
        this.setState({ isVisibleFBtnShoppingList: true });

        //ANIMATE BUTTON
        this.RefFBtnShoppingList.fadeInUp(400);

        console.log("showFbtnShoppingListButton")
    }

    incrementQuantity = () => {
        // SHOW SHOPPING LIST FLOATING BUTTON IF NOT VISIBLE
        let isVisibleFBtnShoppingList = this.state.isVisibleFBtnShoppingList;
        isVisibleFBtnShoppingList ? null : this.showFbtnShoppingListButton();

        //INCREMENT QUANTITY
        console.log("incrementQuantity");
    }

    decrementQuantity = () => {
        // SHOW SHOPPING LIST FLOATING BUTTON IF NOT VISIBLE
        let isVisibleFBtnShoppingList = this.state.isVisibleFBtnShoppingList;
        isVisibleFBtnShoppingList ? null : this.showFbtnShoppingListButton();

        //DECREMENT QUANTITY
        console.log("decrementQuantity");
    }

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

                <Animatable.View style={styles.FBtnViewContainer} ref={this.handleRefFBtnShoppingList}>
                    <FloatingButtonShoppingList />
                </Animatable.View>
            </View>
        )
    }
}

export default SearchResult;