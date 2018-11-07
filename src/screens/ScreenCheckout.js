import React, { Component } from 'react';
import { Text, View, ScrollView, Button, TextInput, AsyncStorage } from 'react-native';
import { styles } from '../styles/styles';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import ShoppingListDetails from '../components/shoppingListDetails';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import AccordionHeader from '../components/AccordionHeader';
import AddressManager from '../components/AddressManager';
import TelephoneManager from '../components/TelephoneManager';
import PasswordManger from '../components/PasswordManager';
import CardManager from '../components/CardManager';
import CouponManger from '../components/CouponManger';
import { connect } from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Modal from 'react-native-modalbox';
import { toggleAddModalAddressManager, toggleAddModalTelephoneManager, toggleAddModalCardManager } from '../actions/actions';


const ADDRESS_STORAGE_KEY = "ADDRESS";
const PHONE_STORAGE_KEY = "PHONE";


class ScreenCheckout extends Component {


    componentWillReceiveProps(nextProps) {

        // console.log("nextProps.newproducts");
        // console.log(nextProps.newproducts);
        // console.log("this.props.newproducts")
        // console.log(this.props.newproducts)
        console.log(nextProps.isVisibleAddAddressManager)
        nextProps.isVisibleAddAddressManager === true ? this.openAddDialog() : null;
        console.log(nextProps.isVisibleAddTelephoneManager)
        nextProps.isVisibleAddTelephoneManager === true ? this.openAddDialog() : null;
        console.log(nextProps.isVisibleAddCardManager)
        nextProps.isVisibleAddCardManager === true ? this.openAddDialog() : null;

        //this.showAddDialog()
    }


    componentDidMount() {

        //RETRIEVE STORED ADDRESS AND SET STATE
        this.retrieveAndSetAddressData(ADDRESS_STORAGE_KEY);


        //RETRIEVE STORED PHONE NUMBER AND SET STATE
        this.retrieveAndSetPhoneData(PHONE_STORAGE_KEY);


        // console.log("componentDidMount")
        // console.log(storedAddress);
        // console.dir(storedAddress)
    }



    constructor(props) {
        super(props)

        this.state = {
            showCheckoutMessage: false,
            showPlaceOrderComponent: true,
            activeSections: [],
            isVisibleAddress: true,
            isVisiblePhoneNumber: true,
            isVisiblePassword: true,
            isVisibleCard: true,
            isVisibleCoupon: true,
            modalAddButtonTitle: "",
            address: "Enter Address",
            phoneNumber: "Enter Phone Number",
            last4digits: "**** XXXX",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCVC: ""

        }
    }



    getTotal = () => {
        let listArray = [...this.props.newlists];
        //let productArray = [...this.props.products];
        let total = 0;

        listArray.forEach(function (item) {
            // let productIndex = productArray.findIndex(x => x.id === item.id);
            // product = productArray[productIndex];
            multipliedValue = parseInt(item.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);
        })

        let formattedTotal = this.formatAmount(total);

        // this.props.dispatch(updateTotalAction(formattedTotal))


        return formattedTotal;

    }



    getGrandTotal = () => {

        let convenienceFee = 0;
        let deliveryFee = 500;
        let listArray = [...this.props.newlists];
        //let productArray = [...this.props.products];

        let total = 0;
        let grandTotal = 0;

        listArray.forEach(function (item) {
            // let productIndex = productArray.findIndex(x => x.id === item.id);
            // product = productArray[productIndex];
            multipliedValue = parseInt(item.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);
            // convenienceFee += (5 / 100) * total;
            // grandTotal = parseInt(total) + parseInt(convenienceFee) + parseInt(deliveryFee)
        })

        convenienceFee = (5 / 100) * total;
        grandTotal = parseInt(total) + parseInt(convenienceFee) + parseInt(deliveryFee)

        let formattedGrandTotal = this.formatAmount(grandTotal);

        // this.props.dispatch(updateGrandTotalAction(formattedGrandTotal))

        return formattedGrandTotal;
    }


    getConvenienceFee = () => {

        let convenienceFee = 0;
        let listArray = [...this.props.newlists];
        // let productArray = [...this.props.products];

        let total = 0;

        listArray.forEach(function (item) {
            // let productIndex = productArray.findIndex(x => x.id === item.id);
            // product = productArray[productIndex];
            multipliedValue = parseInt(item.price) * parseInt(item.quantity);
            total += parseInt(multipliedValue);
            // convenienceFee += (5 / 100) * total;

        })

        convenienceFee = (5 / 100) * total;


        let formattedConvenienceFee = this.formatAmount(parseInt(convenienceFee));

        // this.props.dispatch(updateConvenienceFeeAction(formattedConvenienceFee))


        return formattedConvenienceFee;

    }

    formatAmount = (amount) => {
        let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount)

        return formattedTotal
    }


    toggleView = (tag) => {

        switch (tag) {
            case "address":
                this.setState({ isVisibleAddress: !this.state.isVisibleAddress });
                break;
            case "phonenumber":
                this.setState({ isVisiblePhoneNumber: !this.state.isVisiblePhoneNumber });
                break;
            case "password":
                this.setState({ isVisiblePassword: !this.state.isVisiblePassword });
                break;
            case "card":
                this.setState({ isVisibleCard: !this.state.isVisibleCard });
                break;
            case "coupon":
                this.setState({ isVisibleCoupon: !this.state.isVisibleCoupon });
                break;
            default:
                this.setState({ isVisibleAddress: !this.state.isVisibleAddress });
                break;
        }
    }

    placeOrder = () => {
        this.props.navigation.push('CheckoutMessage');
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    openAddDialog = () => {
        this.refs.RefModalCheckoutDetails.open()
    }

    closeAddDialog = () => {
        this.refs.RefModalCheckoutDetails.close()
    }

    setManagersVisibility = () => {
        console.log("setManagerVisibility")
        this.props.dispatch(toggleAddModalAddressManager(false));
        this.props.dispatch(toggleAddModalTelephoneManager(false));
        this.props.dispatch(toggleAddModalCardManager(false));
    }

    handleAddress = (text) => {

        this.setState({ address: text })

    }

    handlePhone = (text) => {

        this.setState({ phoneNumber: text })

    }


    handleCardNumber = (text) => {

        this.setState({ phoneNumber: text })

    }



    handleMonth = (text) => {

        this.setState({ phoneNumber: text })

    }


    handleYear = (text) => {

        this.setState({ phoneNumber: text })

    }


    handleCVC = (text) => {

        this.setState({ phoneNumber: text })

    }

    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
        }
    }

    retrieveAndSetAddressData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ address: value })

            }
        } catch (error) {
            // Error retrieving data
        }

    }



    retrieveAndSetPhoneData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ phoneNumber: value })

            }
        } catch (error) {
            // Error retrieving data
        }

    }


    retrieveAndSetPhoneData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ phoneNumber: value })

            }
        } catch (error) {
            // Error retrieving data
        }

    }

    updateAddress = () => {
        let address = this.state.address;
        this.storeData(ADDRESS_STORAGE_KEY, address);
        console.log("updateAddress");

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetAddressData(ADDRESS_STORAGE_KEY);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }


    updatePhoneNumber = () => {
        let phoneNumber = this.state.phoneNumber;
        this.storeData(PHONE_STORAGE_KEY, phoneNumber);
        console.log("updatePhoneNumber");

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetPhoneData(PHONE_STORAGE_KEY);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }



    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <ScrollView>
                        <View style={styles.AppCardContainer}>
                            <View style={styles.AppCard}>
                                <Icon style={styles.navigationButton} name="arrowleft" size={24} color="#0D284A" onPress={() => this.goBack()} />
                                <Text style={styles.AppCardHeader}>Checkout</Text>
                                <View>
                                    <AccordionHeader title="Address" subtitle={this.state.address} onSelected={() => { this.toggleView("address") }} />
                                    <Collapsible collapsed={this.state.isVisibleAddress}>
                                        <AddressManager address={this.state.address} />
                                    </Collapsible>
                                    {/* <Button title="open dialog" onPress={() => this.openAddDialog()} /> */}
                                </View>
                                <View>
                                    <AccordionHeader title="Phone Number" subtitle={this.state.phoneNumber} onSelected={() => { this.toggleView("phonenumber") }} />
                                    <Collapsible collapsed={this.state.isVisiblePhoneNumber}>
                                        <TelephoneManager phoneNumber={this.state.phoneNumber} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Change Password" subtitle="********" onSelected={() => { this.toggleView("password") }} />
                                    <Collapsible collapsed={this.state.isVisiblePassword}>
                                        <PasswordManger />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Select Card" subtitle={this.state.last4digits} onSelected={() => { this.toggleView("card") }} />
                                    <Collapsible collapsed={this.state.isVisibleCard}>
                                        <CardManager last4digits={this.state.last4digits} />
                                    </Collapsible>
                                </View>
                                {/* <View>
                                    <AccordionHeader title="Use Coupon" subtitle="MYFIRSTORDER applied" onSelected={() => { this.toggleView("coupon") }} />
                                    <Collapsible collapsed={this.state.isVisibleCoupon}>
                                        <CouponManger isCheckboxVisible={true} />
                                    </Collapsible>
                                </View> */}
                                <View>
                                    <Text style={styles.AppCardSubtitle}>SHOPPING LIST DETAILS</Text>
                                    <ShoppingListDetails total={this.getTotal()} convenienceFee={this.getConvenienceFee()} deliveryFee="500.00" grandTotal={this.getGrandTotal()} />
                                    <ButtonPrimaryAccent title="PLACE ORDER" icon="arrowright" isActive={true} onSelected={this.placeOrder} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    style={[styles.modalCheckout]}
                    position={"center"}
                    ref={"RefModalCheckoutDetails"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={true}
                    onClosed={this.setManagersVisibility}
                >
                    {
                        this.props.isVisibleAddAddressManager &&
                        <View style={styles.modalCheckoutContent}>
                            <View>
                                <TextInput style={styles.textInput} placeholder="Enter Address" onChangeText={this.handleAddress} />
                                <Text>To make delivery quicker, be as descriptive as possible</Text>
                            </View>

                            <View style={styles.buttonGroup}>
                                <ButtonPrimaryAccent title="UPDATE ADDRESS" isActive={true} onSelected={this.updateAddress} />
                                <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closeAddDialog} />
                            </View>
                        </View>
                    }
                    {
                        this.props.isVisibleAddTelephoneManager &&
                        <View>
                            <View>
                                <TextInput style={styles.textInput} placeholder="Enter Phone Number" onChangeText={this.handlePhone} />
                            </View>
                            <View style={styles.buttonGroup}>
                                <ButtonPrimaryAccent title="UPDATE PHONE" isActive={true} onSelected={this.updatePhoneNumber} />
                                <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closeAddDialog} />
                            </View>
                        </View>
                    }
                    {
                        this.props.isVisibleAddCardManager &&
                        <View>
                            <View>
                                <TextInput style={styles.textInput} placeholder="Card Number" onChangeText={this.handleCardNumber} />
                                <TextInput style={styles.textInput} placeholder="Exp. Month" onChangeText={this.handleMonth} />
                                <TextInput style={styles.textInput} placeholder="Exp. Year" onChangeText={this.handleYear} />
                                <TextInput style={styles.textInput} placeholder="CVC Code" onChangeText={this.handleCVC} />
                            </View>
                            <View style={styles.buttonGroup}>
                                <ButtonPrimaryAccent title="ADD CARD" isActive={true} onSelected={this.placeOrder} />
                                <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closeAddDialog} />
                            </View>
                        </View>
                    }
                </Modal>
            </View>
        );
    }
}

//export default ScreenCheckout;


const mapStateToProps = state => ({

    newlists: state.lists.newlists,
    isVisibleAddAddressManager: state.users.isVisibleAddAddressManager,
    isVisibleAddTelephoneManager: state.users.isVisibleAddTelephoneManager,
    isVisibleAddCardManager: state.users.isVisibleAddCardManager


})

export default connect(mapStateToProps)(ScreenCheckout);