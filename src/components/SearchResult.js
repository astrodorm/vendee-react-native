import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/styles';
import DeliveryPicker from '../components/DeliveryPicker';
import ProductItem from '../components/ProductItem';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modalbox';
import ShippingListDetails from '../components/shoppingListDetails';
import { connect } from 'react-redux';
import ProductOptions from '../components/ProductOptions';
import { itemIncrementAction, addItemAction, itemSelectAction, incrementListItemAction, itemDecrementAction, decrementListItemAction, removeItemAction, updateTotalAction, updateConvenienceFeeAction, updateGrandTotalAction } from '../actions/actions';
import ShoppingListFloatingBtn from '../components/ShoppingListFloatingBtn';
import ShoppingListItem from '../components/ShoppingListItem';
import ShoppingListOptions from '../components/ShoppingListOptions';
import 'intl';
import 'intl/locale-data/jsonp/en';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import CheckoutButton from '../components/CheckoutButton';

const BASE_THUMBNAIL_URL = "https://api.yourvendee.com/upload"


class SearchResult extends Component {

    componentWillReceiveProps(nextProps) {

    }

    constructor(props) {
        super(props);

        this.state = {
            isVisibleFBtnShoppingList: false,
            isVisibleFBtnQuantityPicker: false,
            activeSections: [],
            // quantities: [0, 0],
            // products: [],
            selectProductID: 0,
            selectedProductQuantity: 0,
            selectedProductCount: 0,
            isVisibleFBtnShoppingListQuantityPicker: false
        }
    }


    // componentDidMount() {
    //     const prouductsData = this.props.products;
    //     this.setState({ products: prouductsData })

    // }


    //TRANSITION HANDLERS
    handleRefFBtnShoppingList = RefFBtnShoppingList => this.RefFBtnShoppingList = RefFBtnShoppingList;
    handleRefFBtnQuantityPicker = RefFBtnQuantityPicker => this.RefFBtnQuantityPicker = RefFBtnQuantityPicker;
    handleRefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker => this.RefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker;


    _renderProductItem = ({ item }) => (

        // USE getListByID() TO GET CURRENT QUANTITY OF PRODUCT ITEM SINCE EVERY
        //  PRODUCT DOES NOT HAVE QUANTITY IN RESPONSE DATA
        <ProductItem key={item._id} thumbnail={BASE_THUMBNAIL_URL + item.thumbnail} title={item.productName} price={item.price} isAdded={this.getIsAddedByID(item._id)} quantity={this.getListByID(item._id).quantity} onSelectItem={() => this.onSelectItem(item._id)} />
    );



    _renderShoppingListItem = ({ item }) => (

        <ShoppingListItem key={item.id} thumbnail={BASE_THUMBNAIL_URL + item.thumbnail} title={item.title} price={item.price} isAdded={true} quantity={item.quantity} onSelectItem={() => this.onSelectShoppingListItem(item.id, item.quantity)} />

    );

    onSelectItem = (id) => {

        let quantity = this.getListByID(id).quantity;

        //CHECK IF QUANTITY PICKER IS VISIBLE
        let isVisibleFBtnQuantityPicker = this.state.isVisibleFBtnQuantityPicker;
        isVisibleFBtnQuantityPicker ? this.animateQuantityPicker() : this.showFbtnQuantityPicker();

        //DISPATCH ACTION FOR ITEM SELECTED
        this.props.dispatch(itemSelectAction(id, quantity));

        //UPDATE STATE WITH SELECTED quantity AND id 
        this.setState({ selectProductID: id });

    }

    onSelectShoppingListItem = (id, quantity) => {

        //CHECK IF QUANTITY PICKER IS VISIBLE
        let isVisibleFBtnShoppingListQuantityPicker = this.state.isVisibleFBtnShoppingListQuantityPicker;
        isVisibleFBtnShoppingListQuantityPicker ? this.animateShoppingListQuantityPicker() : this.showFbtnShoppingListQuantityPicker();

        //DISPATCH ACTION FOR ITEM SELECTED
        this.props.dispatch(itemSelectAction(id, quantity));

        //UPDATE STATE WITH SELECTED quantity AND id 
        this.setState({ selectProductID: id });
    }

    getListByID = (id) => {

        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);
        let list = listArray[index];

        //SET INITIAL OBJECT TO HAVE A QUANTITY OF ZERO IF ITS UID IS NOT FOUND IN LIST ARRAY
        let initialValue = { quantity: 0 }
        list === undefined ? value = initialValue : value = list

        return value;

    }

    getIsAddedByID = (id) => {

        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);
        let list = listArray[index];
        list === undefined ? value = false : value = true

        return value;
    }

    getShoppingListLength = () => {
        let listArray = [...this.props.newlists];
        let length = listArray.length;

        return length
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

    }

    incrementQuantity = () => {

        let id = this.props.selectProductID;

        // DISPATCH ACTION TO INCREMENT selectProductQuantity VALUE
        this.props.dispatch(itemIncrementAction());


        // GET THE QUANTITY OF THE LIST ITEM, IF ZERO, THEN ADD NEW ITEM WITH
        // DEFAULT QUANTITY AS 1 OR INCREMENT THE selectProductQuantity VALUE
        this.getListByID(id).quantity === 0 ? this.addItem(id) : this.incrementListItem(id)

    }

    addItem = (id) => {

        let newproductsArray = [...this.props.newproducts];
        let index = newproductsArray.findIndex(x => x._id === id);
        let thumbnail = newproductsArray[index].thumbnail;
        let title = newproductsArray[index].productName;
        let price = newproductsArray[index].price;


        //DISPATCH ACTION TO ADD A NEW ITEM WITH DEFAULT QUANTITY VALUE AS 1
        this.props.dispatch(addItemAction(id, thumbnail, title, price));
    }

    incrementListItem = (id) => {

        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity + 1;


        //DISPATCH ACTION TO INCREMENT THE VALUE OF THE QUANTITY AN ITEM IN THE LIST ARRAY
        this.props.dispatch(incrementListItemAction(index, quantity))
    }

    decrementQuantity = () => {

        let id = this.props.selectProductID;

        //CHECK THE LIST ARRAY QUANTITY IS EQUAL TO ONE BECAUSE THAT IS BEFORE IT IS 
        //DECREMENTED TO ZERO. SO REMOVE THAT OBJECT FROM THE LIST ARRAY.

        if (this.getListByID(id).quantity === 1) {

            this.removeListItem(id);
            this.props.dispatch(itemDecrementAction());

        }

        if (this.getListByID(id).quantity > 1) {

            this.props.dispatch(itemDecrementAction());
            this.decrementListItem(id);

        }

    }


    decrementListItem = (id) => {

        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity - 1;

        this.props.dispatch(decrementListItemAction(index, quantity))

    }

    removeListItem = (id) => {
        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);

        this.props.dispatch(removeItemAction(index))
    }

    doneWithProductOptions = () => {

        this.hideFbtnQuantityPicker();

    }

    deleteShoppingListItem = () => {

        let id = this.props.selectProductID;
        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);

        this.props.dispatch(removeItemAction(index))

        this.hideFbtnShoppingListQuantityPicker();
    }

    hideFbtnShoppingListQuantityPicker = () => {
        this.RefFBtnShoppingListQuantityPicker.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnShoppingListQuantityPicker: false });
        });

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

    }

    getShoppingListItems = () => {

        let listArray = [...this.props.newlists];
        return listArray;

    }


    getTotal = () => {
        let listArray = [...this.props.newlists];
        let total = 0;

        listArray.forEach(function (item) {

            multipliedValue = parseInt(item.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);

        })

        let formattedTotal = this.formatAmount(total);

        return formattedTotal;

    }

    formatAmount = (amount) => {
        let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)

        return formattedTotal
    }

    getGrandTotal = () => {

        let convenienceFee = 0;
        let deliveryFee = this.props.deliveryFee;
        let listArray = [...this.props.newlists];
        let total = 0;
        let grandTotal = 0;

        listArray.forEach(function (item) {

            multipliedValue = parseInt(item.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);

        })

        convenienceFee = (5 / 100) * total;
        grandTotal = parseInt(total) + parseInt(convenienceFee) + parseInt(deliveryFee)

        let formattedGrandTotal = this.formatAmount(grandTotal);

        return formattedGrandTotal;
    }

    getConvenienceFee = () => {

        let convenienceFee = 0;
        let listArray = [...this.props.newlists];
        let total = 0;

        listArray.forEach(function (item) {

            multipliedValue = parseInt(item.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);

        })

        convenienceFee = (5 / 100) * total;

        let formattedConvenienceFee = this.formatAmount(parseInt(convenienceFee));

        return formattedConvenienceFee;

    }

    closeShoppingList = () => {
        this.refs.RefModalShoppingList.close()
    }

    gotoCheckoutScreen = () => {

        this.props.navigation.navigate("Checkout");

    }

    setShoppingListValue = () => {

        //DISPATCH TOTAL FEE TO REDUX STORE
        this.props.dispatch(updateTotalAction(this.getTotal()));

        //DISPATCH CONVENIENCE FEE TO REDUX STORE
        this.props.dispatch(updateConvenienceFeeAction(this.getConvenienceFee()))

        //DISPATCH GRAND TOTAL FEE TO REDUX STORE
        this.props.dispatch(updateGrandTotalAction(this.getGrandTotal()))

    }




    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.AppSearchResultMain}>
                        <SearchBar showDeliveryModal={false} />
                        <DeliveryPicker isDelivery={this.props.isDelivery} isPickup={this.props.isPickup} />
                        <View style={styles.AppSearchResultDisplayContainer}>
                            <Text style={styles.AppCardTitle}>SEARCH RESULT</Text>
                            <ScrollView contentContainerStyle={styles.scrollview} scrollEnabled={true}>
                                <FlatList
                                    data={this.props.newproducts}
                                    extraData={this.props}
                                    keyExtractor={item => item._id}
                                    renderItem={this._renderProductItem}
                                />
                            </ScrollView>
                        </View>
                    </View>

                    <Animatable.View style={styles.FBtnShoppingListContainer} ref={this.handleRefFBtnShoppingList}>
                        <ShoppingListFloatingBtn count={this.getShoppingListLength()} onPress={() => this.refs.RefModalShoppingList.open()} />
                    </Animatable.View>

                    <Animatable.View style={styles.FBtnQuantityPickerContainer} ref={this.handleRefFBtnQuantityPicker}>
                        <ProductOptions onDecrement={this.decrementQuantity} quantity={this.props.selectProductQuantity} onIncrement={this.incrementQuantity} onDone={this.doneWithProductOptions} />
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
                    </View>
                    <View style={styles.ShoppingListModalContainer}>
                        <View style={styles.shoppingListDetails}>
                            <Text style={styles.shoppingListLabel}>Shopping List</Text>
                        </View>
                        <ShippingListDetails total={this.getTotal()} convenienceFee={this.getConvenienceFee()} deliveryFee={this.props.deliveryFee} grandTotal={this.getGrandTotal()} />

                        {/* SHOPPING LIST OPTIONS */}
                        <View style={styles.shoppingListOptions}>
                            <ButtonPrimaryAccent title="CLOSE" icon="close" isActive={false} onSelected={this.closeShoppingList} />
                            <CheckoutButton />
                        </View>

                        {/* SELECTED PRODUCT ITEM LIST */}
                        <View>
                            <ScrollView contentContainerStyle={styles.scrollview} scrollEnabled={true}>
                                <FlatList
                                    data={this.props.newlists}
                                    extraData={this.props}
                                    keyExtractor={item => item.id}
                                    renderItem={this._renderShoppingListItem}
                                />
                            </ScrollView>
                        </View>
                    </View>
                    <Animatable.View style={styles.FBtnShoppingListQuantityPickerContainer} ref={this.handleRefFBtnShoppingListQuantityPicker}>
                        <ShoppingListOptions onDecrement={this.decrementQuantity} quantity={this.props.selectProductQuantity} onIncrement={this.incrementQuantity} onDelete={this.deleteShoppingListItem} />
                    </Animatable.View>
                </Modal>
            </View>

        )
    }
}


const mapStateToProps = state => ({
    products: state.products.products,
    newproducts: state.products.newproducts,
    lists: state.lists.lists,
    newlists: state.lists.newlists,
    selectProductID: state.products.selectProductID,
    selectProductQuantity: state.products.selectProductQuantity,
    count: state.products.count,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup,
    listTotal: state.lists.listTotal,
    convenienceFee: state.lists.convenienceFee,
    grandTotal: state.lists.grandTotal,
    deliveryFee: state.delivery.deliveryFee
})

export default connect(mapStateToProps)(SearchResult);
