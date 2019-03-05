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
import Modal from 'react-native-modalbox';
import moment from 'moment';

const BASE_THUMBNAIL_URL = "https://api.yourvendee.com/upload";
const NO_IMAGE_URL = "https://vendee.sfo2.cdn.digitaloceanspaces.com/CATALOGUE/ASSETS/no-image.png";
const PAGE_LIMIT = 50;


class ScreenCategory extends Component {

    componentDidMount() {

        this.props.dispatch(fetchCategoryListAction()).then(res => {
            this.hideCategoryLoadingTextIndicator()
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log("Receiving PRODUCTS CATEGORY Props");
        //  console.log("nextProps.newproducts.length", nextProps.newproducts.length);
        console.log("nextProps.productsError", nextProps.errorCategoryProductMessage);

        // HIDE ERROR MESSAGES
        this.hideOfflineMerchantMessage();
        this.hideCategoryItemLoadingTextIndicator();

        // this.hideNoDataMessage();

        // CHECK PRODUCT LIST ERRORS
        // CHECK IF  NEARBY MERCHANT IS OFFLINE
        if (nextProps.errorCategoryProductMessage === "Request failed with status code 400") {
            this.showMerchantOfflineMerchant();
        }
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
            newCategoryProducts: [],
            newCategoryProductCount: 0,
            errorMessage: "",
            isVisibleOfflineMerchantMessage: false,
            isVisibleCategoryPagination: false,
            isVisiblePaginationControl: false,
            //categoryID :"",
            cursor: 0,
            categoryProductPageIndex: 1


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
        <ProductItem key={item.ITEMCODE} thumbnail={this.getImagePath(item.image)} title={this.convertToSentenceCase(item.DESCRIPTION)} price={item.SELLINGPRICE} isAdded={this.getIsAddedByID(item.ITEMCODE)} quantity={this.getListByID(item.ITEMCODE).quantity} onSelectItem={() => this.onSelectItem(item.ITEMCODE)} />
    );

    _renderShoppingListItem = ({ item }) => (

        <ShoppingListItem key={item.id} thumbnail={item.thumbnail} title={this.convertToSentenceCase(item.title)} price={item.price} isAdded={true} quantity={item.quantity} onSelectItem={() => this.onSelectShoppingListItem(item.id, item.quantity)} />

    );

    getImagePath = (imageURL) => {

        //DEFAULT IMAGE PATH IS TO PLACHEOLDER IMAGE
        let imagePath = NO_IMAGE_URL;

        if (imageURL !== "" && imageURL !== undefined) {

            imagePath = imageURL;

        }

        return imagePath;
    }

    getPagination = () => {
        let size = this.state.newCategoryProductCount;
        let pages = 0;
        let limit = PAGE_LIMIT;
        let pageIndex = this.state.categoryProductPageIndex;
        //  let cursor = this.state.cursor;
        let pagination = {}

        pages = Math.round(size / limit);
        // console.log("pages", pages);

        if (pages === 0) {

            pagination.end = 1
        } else {
            pagination.end = pages;
        }

        // if (cursor === 0) {
        pagination.start = pageIndex;
        //  }

        // if (pagination.start === pagination.end) {

        //     console.log("Last Page")
        //     //REMOVE NEXT PAGINATION CONTROL

        //     // pageIndex = Math.round(size / cursor);
        //     // console.log("pageIndex", pageIndex);
        //     // console.log("size", size);
        //     // console.log("cursor", cursor);
        // } else {
        //     pageIndex++
        //     this.setState({ categoryProductPageIndex: pageIndex }, () => {
        //         pagination.start = pageIndex
        //     })
        // }



        // if (pagination.start === pagination.end) {
        //     console.log("Last Page")
        //     //REMOVE NEXT BUTTON
        // }

        console.log("pagination", pagination)

        return pagination

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

        //MANIPULATE VIEWS
        this.setState({ selectedCategoryItemID: id, selectedCategoryName: categoryName });
        this.showCategoryProducts();
        this.showCategoryItemLoadingTextIndicator();
        this.hideCategoryPagination();
        this.resetPageIndex();

        //MAKE SURE TO MANIPULATE VIEW BEFORE FETCHING DATA
        this.fetchProductsByCategories(id);

    }

    hideCategoryPagination = () => {
        this.setState({ isVisibleCategoryPagination: false })
    }

    showCategoryPagination = () => {
        this.setState({ isVisibleCategoryPagination: true })
    }

    hidePaginationControl = () => {
        this.setState({ isVisiblePaginationControl: false })
    }

    showPaginationControl = () => {
        this.setState({ isVisiblePaginationControl: true })
    }

    resetPageIndex = () => {
        this.setState({ categoryProductPageIndex: 1 })
    }

    nextCategoryProductItems = () => {
        let startAt = this.state.cursor + PAGE_LIMIT;
        let id = this.state.selectedCategoryItemID;
        let pageIndex = this.state.categoryProductPageIndex;

        if (pageIndex === this.getPagination().end) {
            console.log("Last Page");
            //REMOVE NEXT PAGINATION CONTROL
        } else {
            pageIndex++
            this.setState({ categoryProductPageIndex: pageIndex }, () => {
                this.fetchProductsByCategories(id, startAt);
            })
        }
    }

    fetchProductsByCategories = (id, startAt = 0) => {

        // let startAt = 0;
        let size = PAGE_LIMIT;

        //CLEAR STORED PREVIOUS DATA
        this.setState({ newCategoryProducts: [] });
        this.setState({ newCategoryProductCount: 0 });

        //SHOW LOADING INDICATOR
        this.showCategoryItemLoadingTextIndicator();

        //USE CALLBACK TO ENSURE CURSOR IS SET BEFORE REQUESTING FOR A PAGE. THIS HELPS FOR PAGINATION
        this.setState({ cursor: startAt }, () => {

            console.log("startAt", startAt);
            console.log("cursor state", this.state.cursor);

            this.props.dispatch(fetchCategoryProductsAction(id, startAt, size)).then(res => {

                // console.log(res);

                console.log("res", res);
                this.hideCategoryItemLoadingTextIndicator();
                this.showCategoryPagination();

                // ALWAYS STORE COUNT FOR PAGINATION BEFORE SHOWING PAGINATION CONTROLS AND DISPLAYING DATA
                this.setState({ newCategoryProductCount: res.count }, () => {

                    // ONLY SHOW PAGINATION CONTROL IF NUMBER OF PAGE(S) IS GREATER THAN 1
                    this.getPagination().end > 1 ? this.showPaginationControl() : null;

                    console.log("pagination end", this.getPagination().end);

                    //SET NEW DATA
                    //this.setState({ newCategoryProducts: this.props.newCategoryProducts })
                    this.setState({ newCategoryProducts: res.data });
                });

            });


        });
        this.hideCategoryPagination();
        this.hidePaginationControl();


        // console.log("id", id);



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
        let index = newproductsArray.findIndex(x => x.ITEMCODE === id);
        //let thumbnail = "http://oja.ng/wp-content/uploads/2018/05/nasco-corn-flakes-350g.jpg";
        let thumbnail = this.getImagePath(newproductsArray[index].image);
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
        //this.props.dispatch(incrementListItemAction(index, quantity))

        this.validateMaxOrderQuantity(id) === true ? this.props.dispatch(incrementListItemAction(index, quantity)) : null;

    }


    validateMaxOrderQuantity = (id) => {


        let listArray = [...this.props.newlists];
        let listIndex = listArray.findIndex(x => x.id === id);

        // GET THE QUANTITY OF ITEMS IN THE SHOPPING LIST
        let quantity = listArray[listIndex].quantity + 1;

        let newCategoryProductsArray = [...this.props.newCategoryProducts];
        let categoryProductIndex = newCategoryProductsArray.findIndex(x => x.ITEMCODE === id);

        // GET THE STOCK OF ITEMS IN THE PRODUCTS LIST
        let stock = newCategoryProductsArray[categoryProductIndex].QUANTITY;

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

        this.hideCategoryItemLoadingTextIndicator();
        this.hideOfflineMerchantMessage();

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

    convertToSentenceCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
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

    showErrorDialog = (message) => {
        //SET ERROR MESSAGE
        this.setState({ errorMessage: message });

        //SHOW ERROR DIALOG
        this.refs.RefModalError.open()
    }

    closeErrorModal = () => {
        this.refs.RefModalError.close()
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
                                        <View style={styles.categoryMenuBar}>
                                            <Icon style={styles.navigationButton} name="arrowleft" size={24} color="#0D284A" onPress={() => this.showCategories()} />
                                            {this.state.isVisiblePaginationControl &&
                                                <View style={styles.paginationComponent}>
                                                    <TouchableOpacity style={styles.paginationButton}>
                                                        <Text style={styles.paginationButtonText}>Prev</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.paginationButton} onPress={() => this.nextCategoryProductItems()}>
                                                        <Text style={styles.paginationButtonText}>Next</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                        <Text style={styles.AppCardHeader}>{this.state.selectedCategoryName}</Text>
                                        {
                                            this.state.isVisibleCategoryPagination &&
                                            <Text style={styles.paginationTitle}>Showing page {this.getPagination().start} of {this.getPagination().end}</Text>

                                        }
                                    </View>
                                    {
                                        this.state.isVisibleCategoryItemLoadingIndicator &&
                                        <Text style={styles.loadingTextIndicator}>Loading...</Text>
                                    }
                                    {
                                        this.state.isVisibleOfflineMerchantMessage &&
                                        <View style={styles.NoDataMessageContainer}>
                                            <Text style={styles.NoDataMessageText}><Icon name="disconnect" size={22} color={"#0D284A"} /></Text>
                                            <Text style={styles.NoDataMessageText}>All merchants are offline.</Text>
                                            <Text style={styles.NoDataMessageText}>Try again by {this.getOpeningTime()}</Text>
                                        </View>

                                    }
                                    <ScrollView contentContainerStyle={styles.scrollViewfullHeight} scrollEnabled={true}>
                                        <FlatList
                                            data={this.state.newCategoryProducts}
                                            extraData={this.props}
                                            keyExtractor={item => item.ITEMCODE}
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

    categories: state.products.newCategories,
    newCategoryProducts: state.products.newCategoryProducts,
    errorCategoryProductMessage: state.products.errorCategoryProductMessage,
    newlists: state.lists.newlists,
    selectProductID: state.products.selectProductID,
    selectProductQuantity: state.products.selectProductQuantity,
    deliveryFee: state.delivery.deliveryFee,
    newFees: state.fees.newFees,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup,


})

export default connect(mapStateToProps)(ScreenCategory);