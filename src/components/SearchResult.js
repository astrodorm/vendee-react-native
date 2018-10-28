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
import { itemIncrementAction, addItemAction, itemSelectAction, incrementListItemAction, itemDecrementAction, decrementListItemAction, removeItemAction } from '../actions/actions';
import ShoppingListFloatingBtn from '../components/ShoppingListFloatingBtn';
import ShoppingListItem from '../components/ShoppingListItem';
import ShoppingListOptions from '../components/ShoppingListOptions';
import 'intl';
import 'intl/locale-data/jsonp/en';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import CheckoutButton from '../components/CheckoutButton';



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
    //     );
    // };



    // _renderContent = ({ item }) => {

    //     let renderContentCount = 0;

    //     console.log("_renderContent")
    //     return (
    //         // <ProductQuantityPicker animateFBtn={this.animateShoppingListButton} quantity="300"/>
    //     );
    // };

    // _updateSections = activeSections => {
    //     this.setState({ activeSections });
    // };


    _renderProductItem = ({ item }) => (

        // USE getListByID() TO GET CURRENT QUANTITY OF PRODUCT ITEM SINCE EVERY
        //  PRODUCT DOES NOT HAVE QUANTITY IN RESPONSE DATA
        <ProductItem thumbnail={item.thumbnail} title={item.title} price={item.price} isAdded={this.getIsAddedByID(item.id)} quantity={this.getListByID(item.id).quantity} onSelectItem={() => this.onSelectItem(item.id, item.quantity)} />
    );



    _renderShoppingListItem = ({ item }) => (

        <ShoppingListItem thumbnail={item.thumbnail} title={item.title} price={item.price} isAdded={true} quantity={this.getListByID(item.id).quantity} onSelectItem={() => this.onSelectShoppingListItem(item.id, item.quantity)} />

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
        // console.log("onSelectShoppingListItem id > " + id);
        // console.log("onSelectShoppingListItem quantity > " + quantity);

        //CHECK IF QUANTITY PICKER IS VISIBLE
        let isVisibleFBtnShoppingListQuantityPicker = this.state.isVisibleFBtnShoppingListQuantityPicker;
        isVisibleFBtnShoppingListQuantityPicker ? this.animateShoppingListQuantityPicker() : this.showFbtnShoppingListQuantityPicker();

        //DISPATCH ACTION FOR ITEM SELECTED
        this.props.dispatch(itemSelectAction(id, quantity));

        //UPDATE STATE WITH SELECTED quantity AND id 
        this.setState({ selectProductID: id });
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

    getShoppingListLength = () => {
        let listArray = [...this.props.lists];
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

        // console.log("showFbtnShoppingListButton")
    }

    incrementQuantity = () => {

        let id = this.props.selectProductID;

        // DISPATCH ACTION TO INCREMENT selectProductQuantity VALUE
        this.props.dispatch(itemIncrementAction());

        // GET THE QUANTITY OF THE LIST ITEM, IF ZERO, THEN ADD NEW ITEM WITH
        // DEFAULT QUANTITY AS 1 OR INCREMENT THE selectProductQuantity VALUE
        this.getListByID(id).quantity === 0 ? this.addItem(id) : this.incrementListItem(id)

        //console.log("incrementQuantity id > " + id);
        //console.log("incrementQuantity > index : " + index);

    }

    addItem = (id) => {
        // console.log("addItem id > " + id)

        //DISPATCH ACTION TO ADD A NEW ITEM WITH DEFAULT QUANTITY VALUE AS 1
        this.props.dispatch(addItemAction(id));
    }

    incrementListItem = (id) => {

        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity + 1;
        //console.log("incrementListItem index > " + index, "incrementListItem quantity > " + quantity);

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
            this.decrementListItem(id);
            // console.log("decrementQuantity > " + id);
            //this.hideFbtnShoppingListQuantityPicker()
        }

        if (this.getListByID(id).quantity > 1) {

            this.props.dispatch(itemDecrementAction());
            this.decrementListItem(id);
            // console.log("decrementQuantity > " + id);

        }

    }


    decrementListItem = (id) => {

        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);
        let quantity = listArray[index].quantity - 1;

        this.props.dispatch(decrementListItemAction(index, quantity))

    }

    removeListItem = (id) => {
        // console.log("removeListItem > " + id);
        let listArray = [...this.props.lists];
        let index = listArray.findIndex(x => x.id === id);

        this.props.dispatch(removeItemAction(index))
    }

    doneWithProductOptions = () => {

        this.hideFbtnQuantityPicker();

    }

    deleteShoppingListItem = () => {

        let id = this.props.selectProductID;
        let listArray = [...this.props.lists];
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
        let listArray = [...this.props.lists];
        let productArray = [...this.props.products];
        let selectedItems = [];

        listArray.forEach(function (item) {
            let productIndex = productArray.findIndex(x => x.id === item.id);
            product = productArray[productIndex];
            product.quantity = item.quantity;
            selectedItems.push(product);
            //console.dir(product)

        });

        // console.log(products)
        return selectedItems

    }


    getTotal = () => {
        let listArray = [...this.props.lists];
        let productArray = [...this.props.products];

        let total = 0;

        listArray.forEach(function (item) {
            let productIndex = productArray.findIndex(x => x.id === item.id);
            product = productArray[productIndex];
            multipliedValue = parseInt(product.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);
            //selectedItems.push(product);
        })
        // console.log(total)


        let formattedTotal = this.formatAmount(total);

        return formattedTotal;

    }

    formatAmount = (amount) => {
        let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)

        return formattedTotal
    }

    getGrandTotal = () => {

        let convenienceFee = 0;
        let deliveryFee = 500;
        let listArray = [...this.props.lists];
        let productArray = [...this.props.products];

        let total = 0;
        let grandTotal = 0;

        listArray.forEach(function (item) {
            let productIndex = productArray.findIndex(x => x.id === item.id);
            product = productArray[productIndex];
            multipliedValue = parseInt(product.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);
            //selectedItems.push(product);
            convenienceFee += (5 / 100) * total;
            grandTotal = parseInt(total) + parseInt(convenienceFee) + parseInt(deliveryFee)
        })

        let formattedGrandTotal = this.formatAmount(grandTotal);

        return formattedGrandTotal;
    }

    getConvenienceFee = () => {

        let convenienceFee = 0;
        // let deliveryFee = 500;
        let listArray = [...this.props.lists];
        let productArray = [...this.props.products];

        let total = 0;
        //let grandTotal = 0;

        listArray.forEach(function (item) {
            let productIndex = productArray.findIndex(x => x.id === item.id);
            product = productArray[productIndex];
            multipliedValue = parseInt(product.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);
            //selectedItems.push(product);
            convenienceFee += (5 / 100) * total;
            // grandTotal = parseInt(total) + parseInt(convenienceFee) + parseInt(deliveryFee)
        })

        let formattedConvenienceFee = this.formatAmount(parseInt(convenienceFee));

        return formattedConvenienceFee;

    }

    closeShoppingList = () => {
        this.refs.RefModalShoppingList.close()
    }

    gotoCheckoutScreen = () => {
        // this.props.navigation.navigate("Category");
        // this.props.navigation.push('Checkout');
        this.props.navigation.navigate("Checkout");

        console.log("ScreenResult : gotoCheckoutScreen")

    }




    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.AppSearchResultMain}>
                        <SearchBar />
                        <DeliveryPicker isDelivery={this.props.isDelivery} isPickup={this.props.isPickup} />
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
                        <Icon name="minus" size={56} color={"#efefef"} />
                    </View>
                    <View style={styles.ShoppingListModalContainer}>
                        <View style={styles.shoppingListDetails}>
                            <Text style={styles.shoppingListLabel}>Shopping List</Text>
                        </View>
                        <ShippingListDetails total={this.getTotal()} convenienceFee={this.getConvenienceFee()} deliveryFee="500" grandTotal={this.getGrandTotal()} />

                        {/* SHOPPING LIST OPTIONS */}
                        <View style={styles.shoppingListOptions}>
                            <ButtonPrimaryAccent title="CLOSE" icon="close" isActive={false} onSelected={this.closeShoppingList} />
                            {/* <ButtonPrimaryAccent title="CHECKOUT" icon="creditcard" isActive={true} onSelected={this.gotoCheckoutScreen} /> */}
                            {/* <Button title="second love" onPress={() => this.props.navigation.navigate('Checkout')} /> */}
                            <CheckoutButton />
                            {/* <ButtonPrimaryAccent title="MAKE PAYMENT" icon="creditcard" isActive={false} /> */}

                            {/* <ButtonPrimaryAccent label="MAKE PAYMENT" icon="creditcard"/>

                            <MenuPrimaryButton label="MAKE PAYMENT" icon="creditcard" />
                            <MenuDefaultButton label="SAVE FOR LATER" icon="save" /> */}
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
                        <ShoppingListOptions onDecrement={this.decrementQuantity} quantity={this.props.selectProductQuantity} onIncrement={this.incrementQuantity} onDelete={this.deleteShoppingListItem} />
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
    count: state.products.count,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup
})

export default connect(mapStateToProps)(SearchResult);
