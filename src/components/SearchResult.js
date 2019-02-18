import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, AsyncStorage } from 'react-native';
import SearchBar from '../components/SearchBar';
import { styles } from '../styles/styles';
import DeliveryPicker from '../components/DeliveryPicker';
import ProductItem from '../components/ProductItem';
import * as Animatable from 'react-native-animatable';
import ShippingListDetails from '../components/shoppingListDetails';
import { connect } from 'react-redux';
import ProductOptions from '../components/ProductOptions';
import {
    itemIncrementAction,
    addItemAction,
    itemSelectAction,
    incrementListItemAction,
    itemDecrementAction,
    decrementListItemAction,
    removeItemAction,
    updateTotalAction,
    updateConvenienceFeeAction,
    updateGrandTotalAction,
    createLostRequestAction
} from '../actions/actions';
import ShoppingListFloatingBtn from '../components/ShoppingListFloatingBtn';
import ShoppingListItem from '../components/ShoppingListItem';
import ShoppingListOptions from '../components/ShoppingListOptions';
import 'intl';
import 'intl/locale-data/jsonp/en';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import CheckoutButton from '../components/CheckoutButton';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modalbox';
import moment from 'moment';




const BASE_THUMBNAIL_URL = "https://api.yourvendee.com/upload";
const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";
const NO_IMAGE_URL = "https://vendee.sfo2.cdn.digitaloceanspaces.com/CATALOGUE/ASSETS/no-image.png";


class SearchResult extends Component {

    componentWillReceiveProps(nextProps) {
        console.log("Receiving SEARCHRESULT Props");
        console.log("nextProps.newproducts.length", nextProps.newproducts.length);
        console.log("nextProps.productsError", nextProps.productsError);

        // HIDE ERROR MESSAGES
        this.hideOfflineMerchantMessage();
        this.hideNoDataMessage();

        // CHECK PRODUCT LIST ERRORS
        // CHECK IF  NEARBY MERCHANT IS OFFLINE
        if (nextProps.productsError === "Request failed with status code 400") {
            this.showMerchantOfflineMerchant();
        } else {

            // CHECK IF NOTHING MATCHED THE USER'S REQUEST
            if (nextProps.newproducts.length === 0) {
                this.handleNoData();
            }

        }


        // nextProps.newproducts.length === 0 ? this.handleNoData() : this.hideNoDataMessage();
        // nextProps.productsError === "Request failed with status code 400" ? this.showMerchantOfflineMerchant() : this.hideOfflineMerchantMessage();

    }



    componentDidMount() {
        //RETRIEVE AND SET PASSWORD
        this.retrieveAndUserTokenData(USER_TOKEN_STORAGE_KEY)
    }

    constructor(props) {
        super(props);

        this.state = {
            isVisibleFBtnShoppingList: false,
            isVisibleFBtnQuantityPicker: false,
            activeSections: [],
            selectProductID: 0,
            selectedProductQuantity: 0,
            selectedProductCount: 0,
            isVisibleFBtnShoppingListQuantityPicker: false,
            isVisibleShoppingListDrawer: false,
            isVisibleNoDataMessage: false,
            userToken: "",
            errorMessage: "",
            isVisibleOfflineMerchantMessage: false
        }
    }


    //TRANSITION HANDLERS
    handleRefFBtnShoppingList = RefFBtnShoppingList => this.RefFBtnShoppingList = RefFBtnShoppingList;
    handleRefFBtnQuantityPicker = RefFBtnQuantityPicker => this.RefFBtnQuantityPicker = RefFBtnQuantityPicker;
    handleRefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker => this.RefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker;
    handleRefShoppingListDrawer = RefShoppingListDrawer => this.RefShoppingListDrawer = RefShoppingListDrawer;


    _renderProductItem = ({ item }) => (

        // USE getListByID() TO GET CURRENT QUANTITY OF PRODUCT ITEM SINCE EVERY
        //  PRODUCT DOES NOT HAVE QUANTITY IN RESPONSE DATA
        // <ProductItem key={item.} thumbnail={BASE_THUMBNAIL_URL + item.thumbnail} title={item.productName} price={item.price} isAdded={this.getIsAddedByID(item._id)} quantity={this.getListByID(item._id).quantity} onSelectItem={() => this.onSelectItem(item._id)} />

        <ProductItem key={item.ITEMCODE} thumbnail={this.getImagePath(item.image)} title={this.convertToSentenceCase(item.DESCRIPTION)} price={item.SELLINGPRICE} isAdded={this.getIsAddedByID(item.ITEMCODE)} quantity={this.getListByID(item.ITEMCODE).quantity} onSelectItem={() => this.onSelectItem(item.ITEMCODE)} />
    );

    getImagePath = (imageURL) => {

        //DEFAULT IMAGE PATH IS TO PLACHEOLDER IMAGE
        let imagePath = NO_IMAGE_URL;

        if (imageURL !== "" && imageURL !== undefined) {

            imagePath = imageURL;

        }

        return imagePath;
    }

    retrieveAndUserTokenData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ userToken: value })

            }
        } catch (error) {
            // Error retrieving data
        }

    }

    convertToSentenceCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    handleNoData = () => {

        let userToken = this.state.userToken;
        let searchParam = this.props.searchText;
        let status = "PENDING"

        this.setState({ isVisibleNoDataMessage: true });

        if (userToken !== "null") {

            console.log("Identifiable account. Tracking enabled.")

            this.props.dispatch(createLostRequestAction(userToken, searchParam, status)).then(res => {

                console.log("Success creating Lost Request");
                console.log(res);

            }).catch(err => {

                console.log("failed to create lost request");
                console.log(err);
            });

        } else {
            console.log("Anonymous account. Tracking disabled.")
        }

    }

    showMerchantOfflineMerchant = () => {

        // let userToken = this.state.userToken;
        // let searchParam = this.props.searchText;
        // let status = "PENDING"

        this.setState({ isVisibleOfflineMerchantMessage: true });

        // this.props.dispatch(createLostRequestAction(userToken, searchParam, status)).then(res => {

        //     console.log("Success creating Lost Request")

        // }).catch(err => {

        //     console.log("failed to create lost request");
        // });

    }

    hideOfflineMerchantMessage = () => {
        this.setState({ isVisibleOfflineMerchantMessage: false });

    }

    hideNoDataMessage = () => {

        this.setState({ isVisibleNoDataMessage: false })
    }


    _renderShoppingListItem = ({ item }) => (

        <ShoppingListItem key={item.id} thumbnail={item.thumbnail} title={this.convertToSentenceCase(item.title)} price={item.price} isAdded={true} quantity={item.quantity} onSelectItem={() => this.onSelectShoppingListItem(item.id, item.quantity)} />

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

        // console.log("DUPLICATE FOUND")
        // console.log(list);

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

        this.setState({

            //CHANGE STATE TO true TO REFLECT VISIBILTY
            isVisibleFBtnShoppingList: true

        }, () => {

            //ANIMATE BUTTON
            this.RefFBtnShoppingList.fadeInUp(400);
        })

    }

    incrementQuantity = () => {

        let id = this.props.selectProductID;

        // console.log("id");
        // console.log(id);

        // DISPATCH ACTION TO INCREMENT selectProductQuantity VALUE
        this.props.dispatch(itemIncrementAction());

        // this.validateMaxOrderQuantity(id) === true ? this.props.dispatch(itemIncrementAction()) : null;


        // GET THE QUANTITY OF THE LIST ITEM, IF ZERO, THEN ADD NEW ITEM WITH
        // DEFAULT QUANTITY AS 1 OR INCREMENT THE selectProductQuantity VALUE
        this.getListByID(id).quantity === 0 ? this.addItem(id) : this.incrementListItem(id)

        // console.log("this.getListByID(id).quantity");
        // console.log(this.getListByID(id).quantity);
    }

    addItem = (id) => {

        let newproductsArray = [...this.props.newproducts];
        let index = newproductsArray.findIndex(x => x.ITEMCODE === id);
        let thumbnail = this.getImagePath(newproductsArray[index].image);
        //  let thumbnail = "http://oja.ng/wp-content/uploads/2018/05/nasco-corn-flakes-350g.jpg";
        let title = newproductsArray[index].DESCRIPTION;
        let price = newproductsArray[index].SELLINGPRICE;


        //DISPATCH ACTION TO ADD A NEW ITEM WITH DEFAULT QUANTITY VALUE AS 1
        this.props.dispatch(addItemAction(id, thumbnail, title, price));
    }

    incrementListItem = (id) => {

        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity + 1;


        //DISPATCH ACTION TO INCREMENT THE VALUE OF THE QUANTITY AN ITEM IN THE LIST ARRAY
        // this.props.dispatch(incrementListItemAction(index, quantity))

        this.validateMaxOrderQuantity(id) === true ? this.props.dispatch(incrementListItemAction(index, quantity)) : null;

    }

    validateMaxOrderQuantity = (id) => {


        let listArray = [...this.props.newlists];
        let listIndex = listArray.findIndex(x => x.id === id);

        // GET THE QUANTITY OF ITEMS IN THE SHOPPING LIST
        let quantity = listArray[listIndex].quantity + 1;

        let newproductsArray = [...this.props.newproducts];
        let productIndex = newproductsArray.findIndex(x => x.ITEMCODE === id);

        // GET THE STOCK OF ITEMS IN THE PRODUCTS LIST
        let stock = newproductsArray[productIndex].QUANTITY;

        console.log("stock", stock);
        console.log("quantity", quantity);
        let isValidOrderQuantity = true;
        if (quantity > stock) {

            isValidOrderQuantity = false;
            this.showErrorDialog("There are only " + stock + " of this item left in stock. Select " + stock + " of it or less.");
        }
        // quantity > stock ? showErrorDialog("There are only" + stock + "of this item left in stock. Select " + stock + " of it or less.") : null;

        return isValidOrderQuantity;
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

        return total;

    }

    formatAmount = (amount) => {
        let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)

        return formattedTotal
    }

    getGrandTotal = () => {

        let convenienceFee = this.getConvenienceFee();
        let deliveryFee = this.getDeliveryFee();
        let total = this.getTotal();
        let grandTotal = 0;

        grandTotal = parseInt(total) + parseInt(convenienceFee) + parseInt(deliveryFee);

        return grandTotal;
    }


    getDeliveryFee = () => {

        let convenienceFee = this.getConvenienceFee();
        let deliveryFee = 0;
        let finalDeliveryFee = 0;
        let total = this.getTotal();
        let initialTotal = 0;
        let maxDeliveryFee = this.props.newFees[0].maxDelivery;
        let minDeliveryFee = this.props.newFees[0].minDelivery;

        initialTotal = parseInt(total) + parseInt(convenienceFee);

        let calculatedDeliveryFee = Math.round(this.props.newFees[0].delivery * parseInt(initialTotal))

        deliveryFee = calculatedDeliveryFee;

        calculatedDeliveryFee > maxDeliveryFee ? deliveryFee = maxDeliveryFee : null;

        minDeliveryFee > calculatedDeliveryFee ? deliveryFee = minDeliveryFee : null;

        this.props.isPickup === true ? finalDeliveryFee = 0 : null;

        this.props.isDelivery === true ? finalDeliveryFee = deliveryFee : null;

        return finalDeliveryFee;


    }

    getConvenienceFee = () => {

        let convenienceFee = 0;
        let total = this.getTotal();
        let maxConvenienceFee = this.props.newFees[0].maxConvenience;

        let calculatedConvenienceFee = Math.round(this.props.newFees[0].convenience * total)

        calculatedConvenienceFee > maxConvenienceFee ? convenienceFee = maxConvenienceFee : convenienceFee = calculatedConvenienceFee;

        return convenienceFee;

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

    hideShoppingListDrawer = () => {
        this.RefShoppingListDrawer.fadeOutDown(200).then(endState => {
            this.setState({ isVisibleShoppingListDrawer: false });
        });

    }

    showShoppingListDrawer = () => {

        this.setState({

            //CHANGE STATE TO true TO REFLECT VISIBILTY
            isVisibleShoppingListDrawer: true

        }, () => {

            //ANIMATE BUTTON
            this.RefShoppingListDrawer.fadeInUp(400);
        })
    }

    showErrorDialog = (message) => {
        //SET ERROR MESSAGE
        this.setState({ errorMessage: message });

        //SHOW ERROR DIALOG
        this.refs.RefModalError.open()
    }

    closeErrorModal = () => {
        this.refs.RefModalError.close()
    }

    getOpeningTime = () => {
        let openingTime = "";
        let dayofTheWeek = moment().format('dddd');
        dayofTheWeek === "Sunday" ? openingTime = "1:30 PM" : openingTime = "9:30 AM"

        return openingTime;
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

                            {
                                this.state.isVisibleNoDataMessage &&
                                <View style={styles.NoDataMessageContainer}>
                                    <Text style={styles.NoDataMessageText}>Nothing matched your request</Text>
                                    <Text style={styles.NoDataMessageText}>Try viewing all  <Icon name="appstore-o" size={22} color={"#0D284A"} />  Categories</Text>
                                </View>

                            }

                            {
                                this.state.isVisibleOfflineMerchantMessage &&
                                <View style={styles.NoDataMessageContainer}>
                                    <Text style={styles.NoDataMessageText}><Icon name="disconnect" size={22} color={"#0D284A"} /></Text>
                                    <Text style={styles.NoDataMessageText}>All merchants are offline.</Text>
                                    <Text style={styles.NoDataMessageText}>Try again by {this.getOpeningTime()}</Text>
                                </View>

                            }

                            <ScrollView contentContainerStyle={styles.scrollview} scrollEnabled={true}>
                                <FlatList
                                    data={this.props.newproducts}
                                    extraData={this.props}
                                    keyExtractor={item => item.ITEMCODE}
                                    renderItem={this._renderProductItem}
                                />
                            </ScrollView>
                        </View>
                    </View>
                    {
                        this.state.isVisibleFBtnShoppingList &&

                        <Animatable.View style={styles.FBtnShoppingListContainer} ref={this.handleRefFBtnShoppingList}>
                            <ShoppingListFloatingBtn count={this.getShoppingListLength()} onPress={() => this.showShoppingListDrawer()} />
                        </Animatable.View>
                    }


                    <Animatable.View style={styles.FBtnQuantityPickerContainer} ref={this.handleRefFBtnQuantityPicker}>
                        <ProductOptions onDecrement={this.decrementQuantity} quantity={this.props.selectProductQuantity} onIncrement={this.incrementQuantity} onDone={this.doneWithProductOptions} />
                    </Animatable.View>


                    {/* SHOPPING LIST MODAL */}
                    {
                        this.state.isVisibleShoppingListDrawer &&

                        <Animatable.View style={styles.shoppingListDrawerContainer} ref={this.handleRefShoppingListDrawer}>
                            <View style={styles.shoppingListDrawer}>

                                <View style={styles.ShoppingListModalContainer}>
                                    <View style={styles.shoppingListDetails}>
                                        <Text style={styles.shoppingListLabel}>Shopping List</Text>
                                    </View>
                                    <ShippingListDetails total={this.getTotal()} convenienceFee={this.getConvenienceFee()} deliveryFee={this.getDeliveryFee()} grandTotal={this.getGrandTotal()} />

                                    {/* SHOPPING LIST OPTIONS */}
                                    <View style={styles.shoppingListOptions}>
                                        <ButtonPrimaryAccent title="CLOSE" icon="close" isActive={false} onSelected={this.hideShoppingListDrawer} />
                                        <CheckoutButton />
                                    </View>

                                    {/* SELECTED PRODUCT ITEM LIST */}
                                    <View style={styles.shoppingListItemContainer}>
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
                            </View>
                        </Animatable.View>

                    }
                </View>
                <Modal
                    style={[styles.modalCheckout]}
                    position={"center"}
                    ref={"RefModalError"}
                    backdrop={true}
                    swipeToClose={true}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={true}
                >
                    <Text style={styles.errorHeader}>You are almost there but not yet!.</Text>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    <View style={styles.headingDivider}></View>
                    <ButtonPrimaryAccent title="CLOSE" isActive={false} onSelected={this.closeErrorModal} />

                </Modal>

            </View>

        )
    }
}


const mapStateToProps = state => ({
    products: state.products.products,
    productsError: state.products.errorProductMessage,
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
    deliveryFee: state.delivery.deliveryFee,
    newFees: state.fees.newFees,
    searchText: state.products.searchText
})

export default connect(mapStateToProps)(SearchResult);
