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
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modalbox';
//import Slider from 'react-native-slider';
import MenuPrimaryButton from '../components/MenuPrimaryButton';
import MenuDefaultButton from '../components/MenuDefaultButton';
import ShippingListDetails from '../components/shoppingListDetails';
import ButtonDelete from '../components/ButtonDelete';
import CounterComponent from '../components/CounterComponent';
import { connect } from 'react-redux';
import ProductOptions from '../components/ProductOptions';
import { itemIncrementAction, addItemAction, itemSelectAction, incrementListItemAction, itemDecrementAction, decrementListItemAction, removeItemAction } from '../actions/actions'




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
            //  products: [{ id: 1, title: "Nasco Cornflakes 350g", price: "1,234", quantity: 0, isSelected: false }, { id: 2, title: "Kellogs Cornflakes 70g", price: "9,870", quantity: 0, isSelected: false }],
            products: [],
            selectProductID: 0,
            selectedProductQuantity: 0,
            selectedProductCount: 0,
            isVisibleFBtnShoppingListQuantityPicker: false
            // showAddProductButton: true
        }
    }


    componentDidMount() {
        const prouductsData = this.props.products;
        // (this.props.navigation.state.params.activityId);
        this.setState({ products: prouductsData })
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
    handleRefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker => this.RefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker;

    // _renderHeader = section => {

    //     // console.log("_renderHeader")

    //     return (
    //         // <ProductItem />
    //         <View style={styles.ProductItem}>
    //             <AvatarProduct />
    //             <ProductDetails title="Nasco Cornflakes 350g" price="2,345" />
    //             {
    //                 this.state.showAddProductButton &&
    //                 <ButtonAddproduct funcAddProduct={this.onSelectItem} />
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


    _renderProductItem = ({ item }) => (
        // <View style={styles.ProductItem}>
        //     <AvatarProduct />
        //     <ProductDetails title={item.title} price={item.price} />
        //     <TouchableOpacity onPress={() => this.onSelectItem(item.id, item.quantity)}>
        //         <Text style={[styles.AddProductText, item.isSelected ? styles.AddProductSelected : styles.AddProductUnselected]}>
        //             {item.quantity}
        //         </Text>
        //     </TouchableOpacity>
        // </View>

        //../../assets/images/nasco-corn-flakes-350g.png

        <ProductItem thumbnail={item.thumbnail} title={item.title} price={item.price} isAdded={this.getIsAddedByID(item.id)} quantity={this.getListByID(item.id).quantity} onSelectItem={() => this.onSelectItem(item.id, item.quantity)} />
    );



    _renderShoppingListItem = ({ item }) => (
        <View style={styles.ProductItem}>
            <AvatarProduct />
            <ProductDetails title={item.title} price={item.price} />
            <TouchableOpacity onPress={() => this.EditShoppingListProduct(item.id, item.quantity)}>
                <Text style={[styles.AddProductText, item.isSelected ? styles.AddProductSelected : styles.AddProductUnselected]}>
                    {item.quantity}
                </Text>
            </TouchableOpacity>
        </View>
    );

    onSelectItem = (id) => {

        let quantity = this.getListByID(id).quantity;

        console.log("id >" + id);
        console.log("quantity >" + quantity);

        //CHECK IF QUANTITY PICKER IS VISIBLE
        let isVisibleFBtnQuantityPicker = this.state.isVisibleFBtnQuantityPicker;
        isVisibleFBtnQuantityPicker ? this.animateQuantityPicker() : this.showFbtnQuantityPicker();

        // this.animateQuantityPicker();

        this.props.dispatch(itemSelectAction(id, quantity));

        //UPDATE STATE WITH SELECTED quantity AND id 
        this.setState({ selectProductID: id });

        // this.setState({ products : this.props.products})

    }

    getListByID = (id) => {

        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);
        let list = listArray[index];

        //SET INITIAL OBJECT TO HAVE A QUANTITY OF ZERO IF ITS INDEX IS NOT FOUND IN LIST ARRAY
        let initialValue = { quantity: 0 }
        list === undefined ? value = initialValue : value = list

        return value;

    }

    getIsAddedByID = (id) => {

        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);
        let list = listArray[index];
        list === undefined ? value = false : value = true

        return value;
    }

    EditShoppingListProduct = (id, quantity) => {

        //CHECK IF QUANTITY PICKER IS VISIBLE
        let isVisibleFBtnShoppingListQuantityPicker = this.state.isVisibleFBtnShoppingListQuantityPicker;
        isVisibleFBtnShoppingListQuantityPicker ? this.animateShoppingListQuantityPicker() : this.showFbtnShoppingListQuantityPicker();

        //UPDATE STATE WITH SELECTED quantity AND id 
        this.setState({ selectProductID: id, selectedProductQuantity: quantity });

    }

    animateShoppingListQuantityPicker = () => {
        //SET OPACITY TO 1 FOR VISIBILTY 
        this.RefFBtnShoppingListQuantityPicker.transitionTo({ opacity: 1 });

        //ANIMATE BUTTON
        this.RefFBtnShoppingListQuantityPicker.pulse(400);
    }

    showFbtnShoppingListQuantityPicker = () => {
        //ANIMATE BUTTON
        this.RefFBtnShoppingListQuantityPicker.fadeInUp(400).then(endState => this.setState({ isVisibleFBtnShoppingListQuantityPicker: true }));

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

        let id = this.props.selectProductID;

        this.props.dispatch(itemIncrementAction());

        this.getListByID(id).quantity === 0 ? this.addItem(id) : this.incrementListItem(id)

        //INCREMENT QUANTITY
        // let id = this.state.selectProductID;
        // let quantitiesArray = [...this.state.products];
        // let listArray = [...props.lists];
        // let index = listArray.findIndex(x => x.id === id);

        // listArray[index].quantity += 1;
        //quantitiesArray[index].isSelected = true;
        // this.setState({ products: quantitiesArray, selectedProductQuantity: quantitiesArray[index].quantity });

        // this.props.dispatch(itemIncrementAction())

        console.log("incrementQuantity id > " + id);
        //console.log("incrementQuantity > index : " + index);

    }

    addItem = (id) => {
        console.log("addItem id > " + id)

        this.props.dispatch(addItemAction(id));
    }

    incrementListItem = (id) => {

        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity + 1;
        console.log("incrementListItem index > " + index, "incrementListItem quantity > " + quantity);

        this.props.dispatch(incrementListItemAction(index, quantity))
    }

    decrementQuantity = () => {
        // SHOW SHOPPING LIST FLOATING BUTTON IF NOT VISIBLE
        // let isVisibleFBtnShoppingList = this.state.isVisibleFBtnShoppingList;
        // isVisibleFBtnShoppingList ? null : this.showFbtnShoppingListButton();

        let id = this.props.selectProductID;
        // this.removeListItem(id);
        //  this.sayMyName()

        // this.getListByID(id).quantity === 0 ? this.addItem(id) : this.incrementListItem(id)


        // let quantity = this.props.selectProductQuantity;

        //  quantity === 0 ? null : this.props.dispatch(itemDecrementAction());

        //CHECK FOR LIST QUANTITY IS EQUAL TO ONE BECAUSE THAT IS BEFORE IT IS 
        //DECREMENTED TO ZERO AND THEN REMOVE THAT ARRAY OBJECTFROM LIST

        if (this.getListByID(id).quantity === 1) {

            this.removeListItem(id);
            this.props.dispatch(itemDecrementAction());
            this.decrementListItem(id);
            console.log("decrementQuantity > " + id);
        }

        if (this.getListByID(id).quantity > 1) {

            this.props.dispatch(itemDecrementAction());
            this.decrementListItem(id);
            console.log("decrementQuantity > " + id);

        }



        //this.props.dispatch(itemDecrementAction());
        //this.props.dispatch(decrementListItemAction());

        // this.decrementListItem(id)



        // this.getListByID(id).quantity === 0 ? this.removeListItem(id) : this.props.dispatch(itemDecrementAction());


        //DECREMENT QUANTITY
        //let quantity = this.state.selectedProductQuantity;
        // let id = this.state.selectProductID;
        // let quantitiesArray = [...this.state.products];
        // let index = quantitiesArray.findIndex(x => x.id === id);
        // let count = quantitiesArray[index].quantity;

        // count <= 1 ? quantitiesArray[index].isSelected = false : null;

        // count === 0 ? quantitiesArray[index].quantity = 0 : quantitiesArray[index].quantity -= 1;

        //this.setState({ products: quantitiesArray, selectedProductQuantity: quantitiesArray[index].quantity });


    }

    sayMyName = () => {
        console.log("sayMyName")
    }

    decrementListItem = (id) => {

        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity - 1;

        this.props.dispatch(decrementListItemAction(index, quantity))

    }

    removeListItem = (id) => {
        console.log("removeListItem > " + id);
        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);
        //let quantity = listArray[index].quantity - 1;

        this.props.dispatch(removeItemAction(index))
    }

    AcceptQuantity = () => {

        this.hideFbtnQuantityPicker();

        let products = [...this.state.products];
        const selectedProductsArray = products.filter(product => product.isSelected === true);
        let selectedProductCountValue = selectedProductsArray.length;

        this.setState({ selectedProductCount: selectedProductCountValue });
    }

    deleteShoppingListItem = () => {

        let id = this.state.selectProductID;
        let products = [...this.state.products];
        let index = products.findIndex(x => x.id === id);
        let selectedProductsArray = products.filter(product => product.isSelected === true);
        let selectedProductCountValue = selectedProductsArray.length - 1;
        products[index].isSelected = false;
        products[index].quantity = 0;

        this.setState({ products: products, selectedProductCount: selectedProductCountValue });

        this.hideFbtnShoppingListQuantityPicker();
    }

    hideFbtnShoppingListQuantityPicker = () => {
        this.RefFBtnShoppingListQuantityPicker.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnShoppingListQuantityPicker: false });
        });

        // this.showFbtnShoppingListButton()
        this.RefFBtnShoppingListQuantityPicker.transitionTo({ opacity: 0 })
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

    getShoppingListItems = () => {
        let products = [...this.state.products];
        const selectedProductsArray = products.filter(product => product.isSelected === true);
        return selectedProductsArray;
    }



    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.AppSearchResultMain}>
                        <SearchBar />
                        <DeliveryPicker />
                        {/* <CounterComponent /> */}
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
                                data={this.props.products}
                                extraData={this.props}
                                keyExtractor={item => item.id}
                                renderItem={this._renderProductItem}
                            />
                            {/* <Button title="Basic modal"  style={styles.btn} /> */}

                        </View>
                    </View>

                    <Animatable.View style={styles.FBtnShoppingListContainer} ref={this.handleRefFBtnShoppingList}>
                        {/* TODO ADD {this.state.selectedProductCount} AS PARAM TO TEXT FIELD */}
                        {/* <FloatingButtonShoppingList /> */}
                        <TouchableOpacity onPress={() => this.refs.RefModalShoppingList.open()}>
                            <View style={styles.FBtnShoppingList}>
                                <ShoppingListCounter count={this.state.selectedProductCount} />
                                <Text style={styles.FBtnText}>view shopping list</Text>
                                <Icon name="arrowsalt" size={20} color={"#0D284A"} />
                            </View>
                        </TouchableOpacity>


                    </Animatable.View>

                    <Animatable.View style={styles.FBtnQuantityPickerContainer} ref={this.handleRefFBtnQuantityPicker}>
                        {/* <View style={styles.FBtnQuantityPicker}>
                            <ButtonDecrement funcDecrement={this.decrementQuantity} />
                            <ProductQuantityCounter quantity={this.getListByID(this.state.selectProductID).quantity} />
                            <ButtonIncrement funcIncrement={this.incrementQuantity} />
                            <ButtonDone funcDone={this.AcceptQuantity} />
                        </View> */}
                        <ProductOptions onDecrement={this.decrementQuantity} quantity={this.props.selectProductQuantity} onIncrement={this.incrementQuantity} onDone={this.AcceptQuantity} />
                    </Animatable.View>

                </View>

                {/* SHOPPING LIST MODAL */}
                <Modal
                    style={[styles.modal, styles.shoppingListModalContainer]}
                    position={"bottom"}
                    ref={"RefModalShoppingList"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    onClosingState={this.hideFbtnShoppingListQuantityPicker}
                >
                    <View style={styles.shoppingListHeader}>
                        <Icon name="minus" size={56} color={"#efefef"} />
                    </View>
                    <View style={styles.ShoppingListModalContainer}>
                        <View style={styles.shoppingListDetails}>
                            <Text style={styles.shoppingListLabel}>Shopping List</Text>
                        </View>
                        <ShippingListDetails total="3,550" convenienceFee="75" deliveryFee="500" grandTotal="4,520" />

                        {/* SHOPPING LIST OPTIONS */}
                        <View style={styles.shoppingListOptions}>
                            <MenuPrimaryButton label="MAKE PAYMENT" icon="creditcard" />
                            <MenuDefaultButton label="SAVE FOR LATER" icon="save" />
                        </View>

                        {/* SELECTED PRODUCT ITEM LIST */}
                        <View>
                            <FlatList
                                data={this.getShoppingListItems()}
                                extraData={this.state}
                                keyExtractor={item => item.id}
                                renderItem={this._renderShoppingListItem}
                            />
                        </View>
                    </View>
                    <Animatable.View style={styles.FBtnShoppingListQuantityPickerContainer} ref={this.handleRefFBtnShoppingListQuantityPicker}>
                        <View style={styles.FBtnQuantityPicker}>
                            <ButtonDecrement funcDecrement={this.decrementQuantity} />
                            <ProductQuantityCounter quantity={this.state.selectedProductQuantity} />
                            <ButtonIncrement funcIncrement={this.incrementQuantity} />
                            <ButtonDelete funcDelete={this.deleteShoppingListItem} />
                        </View>
                    </Animatable.View>
                </Modal>
            </View>

        )
    }
}

//export default SearchResult;

const mapStateToProps = state => ({
    products: state.products.products,
    lists: state.lists.lists,
    selectProductID: state.products.selectProductID,
    selectProductQuantity: state.products.selectProductQuantity,
    count: state.products.count
})

export default connect(mapStateToProps)(SearchResult);
