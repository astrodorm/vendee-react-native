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
import ShoppingListCounter from '../components/ShoppingListCounter';


// const SECTIONS = [
//     {
//         title: 'HEADER 111111',
//         content: 'Quantiy header 11111 ipsum...'
//     },
//     {
//         title: 'HEADER 22222',
//         content: 'Quantity header 22222 ipsum...'
//     }
// ];





class SearchResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisibleFBtnShoppingList: false,
            isVisibleFBtnQuantityPicker: false,
            activeSections: [],
            quantities: [0, 0],
            products: [{ id: 1, title: "Nasco Cornflakes 350g", price: "1,234", quantity: 0, isSelected: false }, { id: 2, title: "Kellogs Cornflakes 70g", price: "9,870", quantity: 0, isSelected: false }],
            selectedProductID: 0,
            selectedProductQuantity: 0,
            selectedProductCount:0
            // showAddProductButton: true
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

    // _renderHeader = section => {

    //     // console.log("_renderHeader")

    //     return (
    //         // <ProductItem />
    //         <View style={styles.ProductItem}>
    //             <AvatarProduct />
    //             <ProductDetails title="Nasco Cornflakes 350g" price="2,345" />
    //             {
    //                 this.state.showAddProductButton &&
    //                 <ButtonAddproduct funcAddProduct={this.AddProduct} />
    //             }
    //             {
    //                 !this.state.showAddProductButton &&
    //                 <Text>NAN</Text>
    //             }
    //         </View>
    //     );
    // };



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
            <ProductDetails title={item.title} price={item.price} />
            {/* <View style={[styles.AddProductText, item.isSelected ? styles.AddProductSelected : styles.AddProductUnselected]}>
            <ButtonAddproduct funcAddProduct={() => this.AddProduct(item.id, item.quantity)} quantity={item.quantity} />
            </View> */}

            <TouchableOpacity onPress={() => this.AddProduct(item.id, item.quantity)}>
                <Text style={[styles.AddProductText, item.isSelected ? styles.AddProductSelected : styles.AddProductUnselected]}>
                    {item.quantity}
                </Text>
            </TouchableOpacity>
        </View>

    );

    AddProduct = (id, quantity) => {

        //CHECK IF QUANTITY PICKER IS VISIBLE
        let isVisibleFBtnQuantityPicker = this.state.isVisibleFBtnQuantityPicker;
        isVisibleFBtnQuantityPicker ? this.animateQuantityPicker() : this.showFbtnQuantityPicker();


        //UPDATE STATE WITH SELECTED quantity AND id 
        this.setState({ selectedProductID: id, selectedProductQuantity: quantity });



        console.log("show quantity picker to AddProduct ");
        console.log("AddProduct > : quantity is " + quantity);
        console.log("AddProduct > : id is " + id);


    }


    showFbtnQuantityPicker = () => {
        //ANIMATE BUTTON
        this.RefFBtnQuantityPicker.fadeInUp(400).then(endState => this.setState({ isVisibleFBtnQuantityPicker: true }));


    }

    animateQuantityPicker = () => {
        //SET OPACITY TO 1 FOR VISIBILTY 
        this.RefFBtnQuantityPicker.transitionTo({ opacity: 1 });

        //ANIMATE BUTTON
        this.RefFBtnQuantityPicker.pulse(400);
    }


    showFbtnShoppingListButton = () => {

        //CHANGE STATE TO true TO REFLECT VISIBILTY
        this.setState({ isVisibleFBtnShoppingList: true });

        //ANIMATE BUTTON
        this.RefFBtnShoppingList.fadeInUp(400);

        console.log("showFbtnShoppingListButton")
    }

    incrementQuantity = () => {
        // SHOW SHOPPING LIST FLOATING BUTTON IF NOT VISIBLE
        // let isVisibleFBtnShoppingList = this.state.isVisibleFBtnShoppingList;
        // isVisibleFBtnShoppingList ? null : this.showFbtnShoppingListButton();



        //INCREMENT QUANTITY
        let id = this.state.selectedProductID;
        let quantitiesArray = [...this.state.products];
        let index = quantitiesArray.findIndex(x => x.id === id);

        quantitiesArray[index].quantity += 1;
        quantitiesArray[index].isSelected = true;
        this.setState({ products: quantitiesArray, selectedProductQuantity: quantitiesArray[index].quantity });

        console.log("incrementQuantity");
        console.log("incrementQuantity > index : " + index);

    }

    decrementQuantity = () => {
        // SHOW SHOPPING LIST FLOATING BUTTON IF NOT VISIBLE
        // let isVisibleFBtnShoppingList = this.state.isVisibleFBtnShoppingList;
        // isVisibleFBtnShoppingList ? null : this.showFbtnShoppingListButton();




        //DECREMENT QUANTITY
        //let quantity = this.state.selectedProductQuantity;
        let id = this.state.selectedProductID;
        let quantitiesArray = [...this.state.products];
        let index = quantitiesArray.findIndex(x => x.id === id);
        let count = quantitiesArray[index].quantity;

        count <= 1 ? quantitiesArray[index].isSelected = false : null;

        count === 0 ? quantitiesArray[index].quantity = 0 : quantitiesArray[index].quantity -= 1;

        this.setState({ products: quantitiesArray, selectedProductQuantity: quantitiesArray[index].quantity });

        console.log("decrementQuantity");
    }

    AcceptQuantity = () => {

        this.hideFbtnQuantityPicker();
        let products = [...this.state.products];
       // let index = quantitiesArray.findIndex(x => x.id === id);
        const selectedProductsArray = products.filter(product => product.isSelected === true );
        let selectedProductCountValue = selectedProductsArray.length;
       // shoes.filter(shoe => shoe.color === "black");
       this.setState({ selectedProductCount: selectedProductCountValue });


    }

    hideFbtnQuantityPicker = () => {
        this.RefFBtnQuantityPicker.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnQuantityPicker: false });

        });

        this.showFbtnShoppingListButton()
        this.RefFBtnQuantityPicker.transitionTo({ opacity: 0 })
    }

    hideFbtnShoppingList = () => {
        this.RefFBtnShoppingList.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnShoppingList: false });
        });

        this.showFbtnQuantityPicker()
        this.RefFBtnShoppingList.transitionTo({ opacity: 0 })


        // //CHANGE STATE TO true TO REFLECT VISIBILTY
        // this.setState({ isVisibleFBtnShoppingList: true });

        // //ANIMATE BUTTON
        // this.RefFBtnShoppingList.fadeInUp(400);



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
                {/* TODO ADD {this.state.selectedProductCount} AS PARAM TO TEXT FIELD */}
                    <FloatingButtonShoppingList />
                    {/* <View>
                        <ShoppingListCounter count={this.state.selectedProductCount}/>
                    </View> */}

                </Animatable.View>
                <Animatable.View style={styles.FBtnQuantityPickerContainer} ref={this.handleRefFBtnQuantityPicker}>
                    {/* <FloatingButtonShoppingList /> */}
                    <View style={styles.FBtnQuantityPicker}>
                        <ButtonDecrement funcDecrement={this.decrementQuantity} />
                        <ProductQuantityCounter quantity={this.state.selectedProductQuantity} />
                        <ButtonIncrement funcIncrement={this.incrementQuantity} />
                        <ButtonDone funcDone={this.AcceptQuantity} />
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

export default SearchResult;