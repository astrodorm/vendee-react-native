import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { styles } from '../styles/styles';
import { connect } from 'react-redux';
import { fetchCategoryListAction, fetchCategoryProductsAction, itemSelectAction, itemIncrementAction, addItemAction, incrementListItemAction, itemDecrementAction, decrementListItemAction, removeItemAction } from '../actions/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import ProductItem from '../components/ProductItem';
import * as Animatable from 'react-native-animatable';
import ShippingListDetails from '../components/shoppingListDetails';
import ProductOptions from '../components/ProductOptions';
import ShoppingListFloatingBtn from '../components/ShoppingListFloatingBtn';
import ShoppingListItem from '../components/ShoppingListItem';
import ShoppingListOptions from '../components/ShoppingListOptions';
import 'intl';
import 'intl/locale-data/jsonp/en';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import CheckoutButton from '../components/CheckoutButton';
import DeliveryPicker from '../components/DeliveryPicker';



const BASE_THUMBNAIL_URL = "https://api.yourvendee.com/upload"


class ScreenCategory extends Component {

    componentDidMount() {

        this.props.dispatch(fetchCategoryListAction()).then(res => {
            this.hideCategoryLoadingTextIndicator()
        });
    }

    constructor(props) {
        super(props);

        this.state = {

            showCategoryProductItemsView: false,
            showCategoryListView: true,
            selectedCategoryItemID: 0,
            selectedCategoryName: "",
            isVisibleFBtnQuantityPicker: false,
            selectProductID: 0,
            selectedProductQuantity: 0,
            selectedProductCount: 0,
            isVisibleFBtnShoppingListQuantityPicker: false,
            isVisibleFBtnShoppingList: false,
            isVisibleShoppingListDrawer: false,
            isVisibleCategoryLoadingIndicator: true,
            isVisibleCategoryItemLoadingIndicator: true,
            newCategoryProducts: []

        }
    }


    //TRANSITION HANDLERS
    handleRefFBtnShoppingList = RefFBtnShoppingList => this.RefFBtnShoppingList = RefFBtnShoppingList;
    handleRefFBtnQuantityPicker = RefFBtnQuantityPicker => this.RefFBtnQuantityPicker = RefFBtnQuantityPicker;
    handleRefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker => this.RefFBtnShoppingListQuantityPicker = RefFBtnShoppingListQuantityPicker;
    handleRefShoppingListDrawer = RefShoppingListDrawer => this.RefShoppingListDrawer = RefShoppingListDrawer;


    _renderCategoriesListItem = ({ item }) => (

        <TouchableOpacity onPress={() => this.setStateSelectedCategoryItem(item._id, item.categoryName)}>
            <Text style={styles.CategoryItem}>{item.categoryName}</Text>
        </TouchableOpacity>
    );

    _renderProductItem = ({ item }) => (

        // USE getListByID() TO GET CURRENT QUANTITY OF PRODUCT ITEM SINCE EVERY
        //  PRODUCT DOES NOT HAVE QUANTITY IN RESPONSE DATA
        <ProductItem key={item._id} thumbnail={BASE_THUMBNAIL_URL + item.thumbnail} title={item.productName} price={item.price} isAdded={this.getIsAddedByID(item._id)} quantity={this.getListByID(item._id).quantity} onSelectItem={() => this.onSelectItem(item._id)} />
    );

    _renderShoppingListItem = ({ item }) => (

        <ShoppingListItem key={item.id} thumbnail={BASE_THUMBNAIL_URL + item.thumbnail} title={item.title} price={item.price} isAdded={true} quantity={item.quantity} onSelectItem={() => this.onSelectShoppingListItem(item.id, item.quantity)} />

    );

    onSelectShoppingListItem = (id, quantity) => {

        //CHECK IF QUANTITY PICKER IS VISIBLE
        let isVisibleFBtnShoppingListQuantityPicker = this.state.isVisibleFBtnShoppingListQuantityPicker;
        isVisibleFBtnShoppingListQuantityPicker ? this.animateShoppingListQuantityPicker() : this.showFbtnShoppingListQuantityPicker();

        //DISPATCH ACTION FOR ITEM SELECTED
        this.props.dispatch(itemSelectAction(id, quantity));

        //UPDATE STATE WITH SELECTED quantity AND id 
        this.setState({ selectProductID: id });
    }

    formatAmount = (amount) => {
        let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)

        return formattedTotal
    }


    showFbtnShoppingListQuantityPicker = () => {
        //ANIMATE BUTTON
        this.RefFBtnShoppingListQuantityPicker.fadeInUp(400).then(endState => this.setState({ isVisibleFBtnShoppingListQuantityPicker: true }));
    }


    animateShoppingListQuantityPicker = () => {
        //SET OPACITY TO 1 FOR VISIBILTY 
        this.RefFBtnShoppingListQuantityPicker.transitionTo({ opacity: 1 });

        //ANIMATE BUTTON
        this.RefFBtnShoppingListQuantityPicker.pulse(400);
    }

    hideCategoryLoadingTextIndicator = () => {
        this.setState({ isVisibleCategoryLoadingIndicator: false })
    }

    hideCategoryItemLoadingTextIndicator = () => {
        this.setState({ isVisibleCategoryItemLoadingIndicator: false })
    }

    showCategoryItemLoadingTextIndicator = () => {
        this.setState({ isVisibleCategoryItemLoadingIndicator: true })
    }


    getIsAddedByID = (id) => {

        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);
        let list = listArray[index];
        list === undefined ? value = false : value = true

        return value;
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

    animateQuantityPicker = () => {
        //SET OPACITY TO 1 FOR VISIBILTY 
        this.RefFBtnQuantityPicker.transitionTo({ opacity: 1 });

        //ANIMATE BUTTON
        this.RefFBtnQuantityPicker.pulse(400);
    }

    showFbtnQuantityPicker = () => {

        this.setState({

            //CHANGE STATE TO true TO REFLECT VISIBILTY
            isVisibleFBtnQuantityPicker: true

        }, () => {

            //ANIMATE BUTTON
            this.RefFBtnQuantityPicker.fadeInUp(400);
        })

    }


    setStateSelectedCategoryItem = (id, categoryName) => {

        this.setState({ selectedCategoryItemID: id, selectedCategoryName: categoryName });
        this.showCategoryProducts();
        this.fetchProductsByCategories(id);
        this.showCategoryItemLoadingTextIndicator();
    }



    fetchProductsByCategories = (id) => {

        //CLEAR STORED PREVIOUS DATA
        this.setState({ newCategoryProducts: [] });

        this.props.dispatch(fetchCategoryProductsAction(id)).then(res => {

            // console.log(res);
            this.hideCategoryItemLoadingTextIndicator();

            //SET FRESH RETRIEVED DATA
            this.setState({ newCategoryProducts: this.props.newCategoryProducts })

        });

    }

    getShoppingListLength = () => {
        let listArray = [...this.props.newlists];
        let length = listArray.length;

        return length
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

    showShoppingListDrawer = () => {

        this.setState({

            //CHANGE STATE TO true TO REFLECT VISIBILTY
            isVisibleShoppingListDrawer: true

        }, () => {

            //ANIMATE BUTTON
            this.RefShoppingListDrawer.fadeInUp(400);
        })
    }

    hideShoppingListDrawer = () => {
        this.RefShoppingListDrawer.fadeOutDown(200).then(endState => {
            this.setState({ isVisibleShoppingListDrawer: false });
        });

    }


    doneWithProductOptions = () => {

        this.hideQuantityPickerShowFBtnShoppingList();

    }

    hideQuantityPickerShowFBtnShoppingList = () => {
        this.RefFBtnQuantityPicker.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnQuantityPicker: false });
        });

        this.showFbtnShoppingListButton()
        this.RefFBtnQuantityPicker.transitionTo({ opacity: 0 })
    }

    hideOnlyFbtnQuantityPicker = () => {
        this.RefFBtnQuantityPicker.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnQuantityPicker: false });
        });

        this.RefFBtnQuantityPicker.transitionTo({ opacity: 0 })
    }

    hideFbtnShoppingListButton = () => {
        this.RefFBtnShoppingList.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnShoppingList: false });
        });

        this.RefFBtnShoppingList.transitionTo({ opacity: 0 })
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

        let newproductsArray = [...this.props.newCategoryProducts];
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

    removeListItem = (id) => {
        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);

        this.props.dispatch(removeItemAction(index))
    }

    decrementListItem = (id) => {

        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity - 1;

        this.props.dispatch(decrementListItemAction(index, quantity))

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


    showCategoryProducts = () => {

        this.setState({ showCategoryProductItemsView: true, showCategoryListView: false })

    }

    showCategories = () => {

        this.state.isVisibleFBtnQuantityPicker === true ? this.hideOnlyFbtnQuantityPicker() : null;
        this.state.isVisibleFBtnShoppingListQuantityPicker === true ? this.hideFbtnShoppingListQuantityPicker() : null;
        this.state.isVisibleFBtnShoppingList === true ? this.hideFbtnShoppingListButton() : null;

        this.setState({ showCategoryProductItemsView: false, showCategoryListView: true })

    }

    hideFbtnShoppingListQuantityPicker = () => {
        this.RefFBtnShoppingListQuantityPicker.fadeOutDown(400).then(endState => {
            this.setState({ isVisibleFBtnShoppingListQuantityPicker: false });
        });

        this.RefFBtnShoppingListQuantityPicker.transitionTo({ opacity: 0 })
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

    getConvenienceFee = () => {

        let convenienceFee = 0;
        let total = this.getTotal();
        let maxConvenienceFee = this.props.newFees[0].maxConvenience;

        let calculatedConvenienceFee = Math.round(this.props.newFees[0].convenience * total)

        calculatedConvenienceFee > maxConvenienceFee ? convenienceFee = maxConvenienceFee : convenienceFee = calculatedConvenienceFee;

        return convenienceFee;

    }

    closeShoppingList = () => {
        this.refs.RefModalCategoryShoppingList.close()
    }

    deleteShoppingListItem = () => {

        let id = this.props.selectProductID;
        let listArray = [...this.props.newlists];
        let index = listArray.findIndex(x => x.id === id);

        this.props.dispatch(removeItemAction(index))

        this.hideFbtnShoppingListQuantityPicker();
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


    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.AppCardContainer}>
                        <Text style={styles.deliveryPickerLabel}>How would you like your items delivered ?</Text>
                        <DeliveryPicker isDelivery={this.props.isDelivery} isPickup={this.props.isPickup} />

                        <View style={styles.CategoryAppCard}>

                            {/* CATEGORY LIST VIEW */}

                            {
                                this.state.showCategoryListView &&

                                <View style={styles.cardPadding}>
                                    <Text style={styles.AppCardHeader}>All Categories</Text>
                                    <View style={styles.headingDivider}></View>
                                    {
                                        this.state.isVisibleCategoryLoadingIndicator &&
                                        <Text style={styles.loadingTextIndicator}>Loading...</Text>
                                    }
                                    <ScrollView contentContainerStyle={styles.scrollViewfullHeight} scrollEnabled={true}>
                                        <FlatList
                                            data={this.props.categories}
                                            extraData={this.props}
                                            keyExtractor={item => item._id}
                                            renderItem={this._renderCategoriesListItem}
                                        />
                                    </ScrollView>
                                </View>
                            }

                            {/* CATEGORY PRODUCT ITEMS VIEW */}

                            {
                                this.state.showCategoryProductItemsView &&
                                <View>

                                    <View style={styles.cardPadding}>
                                        <Icon style={styles.navigationButton} name="arrowleft" size={24} color="#0D284A" onPress={() => this.showCategories()} />
                                        <Text style={styles.AppCardHeader}>{this.state.selectedCategoryName}</Text>
                                    </View>
                                    {
                                        this.state.isVisibleCategoryItemLoadingIndicator &&
                                        <Text style={styles.loadingTextIndicator}>Loading...</Text>
                                    }
                                    <ScrollView contentContainerStyle={styles.scrollViewfullHeight} scrollEnabled={true}>
                                        <FlatList
                                            data={this.state.newCategoryProducts}
                                            extraData={this.props}
                                            keyExtractor={item => item._id}
                                            renderItem={this._renderProductItem}
                                        />
                                    </ScrollView>
                                </View>
                            }
                        </View>
                    </View>

                    {
                        this.state.isVisibleFBtnShoppingList &&

                        <Animatable.View style={styles.FBtnShoppingListContainer} ref={this.handleRefFBtnShoppingList}>
                            <ShoppingListFloatingBtn count={this.getShoppingListLength()} onPress={() => this.showShoppingListDrawer()} />
                        </Animatable.View>

                    }


                    {
                        this.state.isVisibleFBtnQuantityPicker &&

                        <Animatable.View style={styles.FBtnQuantityPickerContainer} ref={this.handleRefFBtnQuantityPicker}>
                            <ProductOptions onDecrement={this.decrementQuantity} quantity={this.props.selectProductQuantity} onIncrement={this.incrementQuantity} onDone={this.doneWithProductOptions} />
                        </Animatable.View>
                    }



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

            </View>
        )
    }
}


const mapStateToProps = state => ({

    categories: state.products.newCategories,
    newCategoryProducts: state.products.newCategoryProducts,
    newlists: state.lists.newlists,
    selectProductID: state.products.selectProductID,
    selectProductQuantity: state.products.selectProductQuantity,
    deliveryFee: state.delivery.deliveryFee,
    newFees: state.fees.newFees,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup,


})

export default connect(mapStateToProps)(ScreenCategory);