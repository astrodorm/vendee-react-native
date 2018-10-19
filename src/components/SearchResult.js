import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, Button } from 'react-native';
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
import ButtonAddproduct from '../components/ButtonAddProduct';
import AvatarProduct from '../components/AvatarProduct';
import ProductDetails from '../components/ProductDetails';
import ButtonDone from '../components/ButtonDone';


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
            isVisibleFBtnQuantityPicker: false,
            activeSections: [],
            quantities: [0, 0],
            products: [{ id: 1, name: "product1", quantity: 10 }, { id: 2, name: "product2", quantity: 20 }]
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
    handleRefFBtnQuantityPicker = RefFBtnQuantityPicker => this.RefFBtnQuantityPicker = RefFBtnQuantityPicker;

    _renderHeader = section => {

        // console.log("_renderHeader")

        return (
            // <ProductItem />
            <View style={styles.ProductItem}>
                <AvatarProduct />
                <ProductDetails title="Nasco Cornflakes 350g" price="2,345" />
                <ButtonAddproduct funcAddProduct={this.AddProduct} />
            </View>
        );
    };



    // _renderContent = ({ item }) => {

    //     let renderContentCount = 0;

    //     console.log("_renderContent")
    //     return (
    //         // <ProductQuantityPicker animateFBtn={this.animateShoppingListButton} quantity="300"/>

    //         <View style={styles.QuantityPickerContainer}>
    //             <ButtonDecrement funcDecrement={this.decrementQuantity} />
    //             <ProductQuantityCounter quantity={this.state.quantities[0]} />
    //             <ProductQuantityCounter quantity={this.state.products[0].quantity} />
    //             <ButtonIncrement funcIncrement={this.incrementQuantity} />
    //         </View>

    //     );
    // };

    // _updateSections = activeSections => {
    //     this.setState({ activeSections });
    // };


    _renderItem = ({ item }) => (
        <View style={styles.ProductItem}>
            <AvatarProduct />
            <ProductDetails title="Nasco Cornflakes 350g" price="2,345" />
            <ButtonAddproduct funcAddProduct={() => this.AddProduct(item.quantity)} />
        </View>

    );

    AddProduct = (quantity) => {

        //CHANGE STATE TO true TO REFLECT VISIBILTY
        this.setState({ isVisibleFBtnQuantityPicker: true });

        //ANIMATE BUTTON
        this.RefFBtnQuantityPicker.fadeInUp(400);

        console.log("show quantity picker to AddProduct ");
        console.log("AddProduct > : quantity is " + quantity);

    }


    letUsKnow = (id) => {
        console.log("id > " + id);
    }


    showFbtnShoppingListButton = () => {

        //CHANGE STATE TO true TO REFLECT VISIBILTY
        this.setState({ isVisibleFBtnShoppingList: true });

        //ANIMATE BUTTON
        this.RefFBtnShoppingList.fadeInUp(400);

        console.log("showFbtnShoppingListButton")
    }

    incrementQuantity = (index) => {
        // SHOW SHOPPING LIST FLOATING BUTTON IF NOT VISIBLE
        let isVisibleFBtnShoppingList = this.state.isVisibleFBtnShoppingList;
        isVisibleFBtnShoppingList ? null : this.showFbtnShoppingListButton();

        //INCREMENT QUANTITY
        let quantitiesArray = [...this.state.products];
        quantitiesArray[0].quantity += 1;
        this.setState({ products: quantitiesArray });

        console.log("incrementQuantity");
    }

    decrementQuantity = (index) => {
        // SHOW SHOPPING LIST FLOATING BUTTON IF NOT VISIBLE
        let isVisibleFBtnShoppingList = this.state.isVisibleFBtnShoppingList;
        isVisibleFBtnShoppingList ? null : this.showFbtnShoppingListButton();

        //DECREMENT QUANTITY
        let quantitiesArray = [...this.state.products];
        let count = quantitiesArray[0].quantity

        count === 0 ? quantitiesArray[0].quantity = 0 : quantitiesArray[0].quantity -= 1;

        this.setState({ products: quantitiesArray });

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
                        {/* <Accordion
                            sections={this.state.products}
                            activeSections={this.state.activeSections}
                            // renderSectionTitle={this._renderSectionTitle}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                            underlayColor="#efefef"
                        /> */}
                        <FlatList
                            data={this.state.products}
                            extraData={this.state}
                            keyExtractor={item => item.id}
                            renderItem={this._renderItem}
                        />
                    </View>
                </View>

                <Animatable.View style={styles.FBtnShoppingListContainer} ref={this.handleRefFBtnShoppingList}>
                    <FloatingButtonShoppingList />
                </Animatable.View>
                <Animatable.View style={styles.FBtnQuantityPickerContainer} ref={this.handleRefFBtnQuantityPicker}>
                    {/* <FloatingButtonShoppingList /> */}
                    <View style={styles.FBtnQuantityPicker}>
                        <ButtonDecrement />
                        <ProductQuantityCounter quantity="5" />
                        <ButtonIncrement />
                        <ButtonDone />
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

export default SearchResult;