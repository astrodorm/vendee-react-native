import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, AsyncStorage } from 'react-native';
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
import { connect } from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Modal from 'react-native-modalbox';
import {
    toggleAddModalAddressManager,
    toggleAddModalTelephoneManager,
    toggleAddModalCardManager,
    toggleUpdateModalPasswordManager,
    updateUserAction,
    chargeUserAction,
    chargeUserPinAction,
    chargeUserOtpAction,
    createOrderAction,
    promisedAddToCartAction,
} from '../actions/actions';
import * as Progress from 'react-native-progress';


const ADDRESS_STORAGE_KEY = "ADDRESS";
const OAUTH = "OAUTH";
const PHONE_STORAGE_KEY = "PHONE";
const CARD_NUMBER_STORAGE_KEY = "CARD_NUMBER";
const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";




class ScreenCheckout extends Component {


    componentWillReceiveProps(nextProps) {

        nextProps.isVisibleAddAddressManager === true ? this.openAddDialog() : null;
        nextProps.isVisibleAddTelephoneManager === true ? this.openAddDialog() : null;
        nextProps.isVisibleAddCardManager === true ? this.openAddDialog() : null;
        nextProps.isVisibleAddPasswordManager === true ? this.openAddDialog() : null;
        nextProps.isUpdatingUser === true ? this.showPreloader() : this.hidePreloader();

    }




    componentDidMount() {

        //RETRIEVE STORED ADDRESS AND SET STATE
        this.retrieveAndSetAddressData(ADDRESS_STORAGE_KEY);

        //RETRIEVE STORED PHONE NUMBER AND SET STATE
        this.retrieveAndSetPhoneData(PHONE_STORAGE_KEY);

        //RETRIEVE AND SET CARD NUMBER
        this.retrieveAndSetCardNUmberData(CARD_NUMBER_STORAGE_KEY)

        //RETRIEVE AND SET PASSWORD
        this.retrieveAndSetPasswordData(OAUTH)

        //RETRIEVE AND SET PASSWORD
        this.retrieveAndUserTokenData(USER_TOKEN_STORAGE_KEY)

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
            cardCVV: "",
            cardPin: "",
            errorMessage: "",
            expiryMonth: "",
            expiryYear: "",
            password: "GENERIC",
            userToken: "",
            chargeResponse: [],
            otp: "",
            lengthOfOrder: 0,
            cartIndex: 0,
            orderCount: 1

        }
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

    getUnformattedGrandTotalKobo = () => {

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

        let unformattedGrandTotalKobo = this.convertToKobo(grandTotal);

        return unformattedGrandTotalKobo;

    }

    convertToKobo = (amount) => {
        let value = amount * 100;
        return value;
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


    prepareCart = () => {

        let listArray = [...this.props.newlists];
        let userToken = this.state.userToken;
        this.showPreloader();

        for (let index = 0; index < listArray.length; index++) {

            this.addToCart(userToken, listArray[index].id, listArray[index].quantity)
        }

    }


    addToCart = (userToken, productID, quantity) => {

        // console.log("addToCart")

        this.props.dispatch(promisedAddToCartAction(userToken, productID, quantity)).then(res => {

            this.createOrder(userToken)
        });


    }

    createOrder = (userToken) => {
        // console.log("createdOrder");

        this.props.dispatch(createOrderAction(userToken)).then(res => {

            this.checkOrderCount();

        }).catch(err => console.log(err));

    }

    checkOrderCount = () => {
        let listArray = [...this.props.newlists];
        let lengthOfOrder = listArray.length;
        let orderCount = this.state.orderCount;

        // console.log("lengthOfOrder");
        // console.log(lengthOfOrder);
        // console.log("orderCount");
        // console.log(orderCount);

        lengthOfOrder === orderCount ? this.gotoSuccessPage() : null;

        this.setState({ orderCount: this.state.orderCount + 1 });

    }

    gotoSuccessPage = () => {

        this.hidePreloader();
        this.props.navigation.navigate("CheckoutMessage");
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

    closePinDialog = () => {
        this.refs.RefModalPin.close()
    }

    closeOtpDialog = () => {
        this.refs.RefModalOtp.close()
    }



    setManagersVisibility = () => {

        this.props.dispatch(toggleAddModalAddressManager(false));
        this.props.dispatch(toggleAddModalTelephoneManager(false));
        this.props.dispatch(toggleAddModalCardManager(false));
        this.props.dispatch(toggleUpdateModalPasswordManager(false));
    }

    handleAddress = (text) => {

        this.setState({ address: text })

    }

    handlePassword = (text) => {

        this.setState({ password: text })

    }

    handlePhone = (text) => {

        this.setState({ phoneNumber: text })

    }

    handlePIN = (text) => {

        this.setState({ cardPin: text })

    }

    handleOTP = (text) => {

        this.setState({ otp: text })

    }


    handleCardNumber = (text) => {

        this.setState({ cardNumber: text })

    }



    handleMonth = (text) => {

        this.setState({ expiryMonth: text })

    }


    handleYear = (text) => {

        this.setState({ expiryYear: text })

    }


    handleCVC = (text) => {

        this.setState({ cardCVV: text })

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


    retrieveAndSetPasswordData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ password: value })

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



    retrieveAndSetCardNUmberData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ last4digits: value })

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

    updateAddress = () => {

        //SAVE ADDRESS  DETAILS TO THE STATE
        let address = this.state.address;
        this.storeData(ADDRESS_STORAGE_KEY, address);
        console.log("updateAddress");

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetAddressData(ADDRESS_STORAGE_KEY);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }

    updatePassword = () => {

        //SAVE PASSWORD DETAILS TO THE STATE
        let password = this.state.password;
        this.storeData(OAUTH, password);
        console.log("updatePassword");

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetPasswordData(OAUTH);

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


    updateCard = () => {
        let cardNumber = this.state.cardNumber;
        let trimmedCardNumber = cardNumber.slice(12);
        this.storeData(CARD_NUMBER_STORAGE_KEY, trimmedCardNumber);
        console.log("updateCard");

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetCardNUmberData(CARD_NUMBER_STORAGE_KEY);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }


    validateInput = () => {
        let address = this.state.address;
        let phoneNumber = this.state.phoneNumber;
        let cardNumber = this.state.cardNumber;
        let total = this.getUnformattedGrandTotalKobo();
        let cvv = this.state.cardCVV;
        let expiryMonth = this.state.expiryMonth;
        let expiryYear = this.state.expiryYear;
        let password = this.state.password;


        address === "" ? this.showErrorDialog("Invalid Address") : null;
        phoneNumber === "" ? this.showErrorDialog("Invalid Phone NUmber") : null;
        cardNumber === "" ? this.showErrorDialog("Invalid Card Number") : null;
        total === 0 ? this.showErrorDialog("Invalid Amount") : null;
        cvv === "" ? this.showErrorDialog("Invalid Card CVV Number") : null;
        expiryMonth === "" ? this.showErrorDialog("Invalid Card Expiry Month") : null;
        expiryYear === "" ? this.showErrorDialog("Invalid Card Expiry Year") : null;
        password === "GENERIC" ? this.showErrorDialog("You are required to update your password") : null;


        address !== "" && phoneNumber !== "" && cardNumber !== "" && total !== 0 && cvv !== "" && expiryMonth !== "" && expiryYear !== "" && password !== "GENERIC" ? this.updateUserProfile() : null;

    }

    showErrorDialog = (message) => {
        //SET ERROR MESSAGE
        this.setState({ errorMessage: message });

        //SHOW ERROR DIALOG
        this.refs.RefModalCheckoutErrorMessage.open()
    }



    showPinModal = () => {

        //SHOW PIN MODAL
        this.refs.RefModalPin.open()
    }


    showOtpModal = () => {

        //SHOW PIN MODAL
        this.refs.RefModalOtp.open()
    }


    updateUserProfile = () => {

        let address = this.state.address;
        let oauth = this.state.password;
        let userToken = this.state.userToken;


        //UNCOMMENT TO SHOW PRELOADER
        this.showPreloader()

        // UNCOMMENT TO DISPATCH ACTION TO UPDATE USER
        this.props.dispatch(updateUserAction(userToken, address, oauth)).then(res => {

            //SKIP UPDATING USER PROFILE AND CHARGE THE USER FOR NOW
            this.chargeUser();

        });

        //SKIP UPDATING USER PROFILE AND CHARGE THE USER FOR NOW
        this.chargeUser();

    }

    chargeUser = () => {

        let amount = this.getUnformattedGrandTotalKobo();
        let number = this.state.cardNumber;
        let cvv = this.state.cardCVV;
        let expiry_month = this.state.expiryMonth;
        let expiry_year = this.state.expiryYear;
        let userToken = this.state.userToken;


        this.props.dispatch(chargeUserAction(userToken, amount, number, cvv, expiry_month, expiry_year)).then(res => {

            res.data.status === 200 ? this.prepareCart() : null;
            res.data.status === 500 ? this.showErrorDialog("Payment gateway error. Try Again") : null;
            res.data.status === 201 ? this.showPinModal() : null;

            this.hidePreloader();
        });



    }

    chargeUserPin = () => {

        let reference = this.props.chargeResponse.data.reference
        let pin = this.state.cardPin;
        let userToken = this.state.userToken;

        this.showPreloader();

        this.props.dispatch(chargeUserPinAction(userToken, reference, pin)).then(res => {

            res.data.status === 200 ? this.prepareCart() : null;
            res.data.status === 500 ? this.showErrorDialog("Payment gateway error. Try Again") : null;
            res.data.status === 202 ? this.showOtpModal() : null;

            this.hidePreloader()
        });

        this.closePinDialog()

    }

    chargeUserOtp = () => {
        let reference = this.props.chargeResponse.data.reference
        let otp = this.state.otp;
        let userToken = this.state.userToken;

        this.showPreloader()

        this.props.dispatch(chargeUserOtpAction(userToken, reference, otp)).then(res => {

            res.data.status === 200 ? this.prepareCart() : null;
            res.data.status === 500 ? this.showErrorDialog("Payment gateway error. Try Again") : null;

            this.hidePreloader()
        });

        this.closeOtpDialog();

    }


    showPreloader = () => {
        this.refs.RefModalPreloader.open()
    }

    hidePreloader = () => {
        this.refs.RefModalPreloader.close()
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
                                    <AccordionHeader title="Select Card" subtitle={"***" + this.state.last4digits} onSelected={() => { this.toggleView("card") }} />
                                    <Collapsible collapsed={this.state.isVisibleCard}>
                                        <CardManager last4digits={this.state.last4digits} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <Text style={styles.AppCardSubtitle}>SHOPPING LIST DETAILS</Text>
                                    <ShoppingListDetails total={this.getTotal()} convenienceFee={this.getConvenienceFee()} deliveryFee={this.props.deliveryFee} grandTotal={this.getGrandTotal()} />
                                    <ButtonPrimaryAccent title="PLACE ORDER" icon="arrowright" isActive={true} onSelected={this.validateInput} />
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
                        this.props.isVisibleAddPasswordManager &&
                        <View style={styles.modalCheckoutContent}>
                            <View>
                                <TextInput style={styles.textInput} placeholder="Enter New Password" onChangeText={this.handlePassword} />
                            </View>

                            <View style={styles.buttonGroup}>
                                <ButtonPrimaryAccent title="UPDATE PASSWORD" isActive={true} onSelected={this.updatePassword} />
                                <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closeAddDialog} />
                            </View>
                        </View>
                    }
                    {
                        this.props.isVisibleAddTelephoneManager &&
                        <View>
                            <View>
                                <TextInput style={styles.textInput} placeholder="Enter Phone Number" onChangeText={this.handlePhone} keyboardType="number-pad" />
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
                                <TextInput style={styles.textInput} placeholder="Card Number" onChangeText={this.handleCardNumber} keyboardType="number-pad" />
                                <TextInput style={styles.textInput} placeholder="Exp. Month" onChangeText={this.handleMonth} keyboardType="number-pad" />
                                <TextInput style={styles.textInput} placeholder="Exp. Year" onChangeText={this.handleYear} keyboardType="number-pad" />
                                <TextInput style={styles.textInput} placeholder="CVV Code" onChangeText={this.handleCVC} keyboardType="number-pad" />
                            </View>
                            <View style={styles.buttonGroup}>
                                <ButtonPrimaryAccent title="ADD CARD" isActive={true} onSelected={this.updateCard} />
                                <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closeAddDialog} />
                            </View>
                        </View>
                    }
                </Modal>
                <Modal
                    style={[styles.modalCheckout]}
                    position={"center"}
                    ref={"RefModalCheckoutErrorMessage"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={true}
                >
                    <Text style={styles.errorHeader}>0ops!. Something Went Wrong</Text>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                </Modal>
                <Modal
                    style={[styles.modalPreloader]}
                    position={"center"}
                    ref={"RefModalPreloader"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={false}
                >
                    <Progress.CircleSnail color={['#f44950', '#FFB76F', '#00316E']} duration={400} size={32} />

                </Modal>
                <Modal
                    style={[styles.modalCheckout]}
                    position={"center"}
                    ref={"RefModalPin"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={false}
                >
                    <View>
                        <View>
                            <Text>Enter your card PIN to complete your transaction</Text>
                            <TextInput style={styles.textInput} placeholder="Enter PIN" onChangeText={this.handlePIN} />
                        </View>
                        <View style={styles.buttonGroup}>
                            <ButtonPrimaryAccent title="PROCEED" isActive={true} onSelected={this.chargeUserPin} />
                            <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closePinDialog} />
                        </View>
                    </View>
                </Modal>
                <Modal
                    style={[styles.modalCheckout]}
                    position={"center"}
                    ref={"RefModalOtp"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={false}
                >
                    <View>
                        <View>
                            <Text>Enter OTP </Text>
                            <TextInput style={styles.textInput} placeholder="Enter OTP" onChangeText={this.handleOTP} />
                        </View>
                        <View style={styles.buttonGroup}>
                            <ButtonPrimaryAccent title="PROCEED" isActive={true} onSelected={this.chargeUserOtp} />
                            <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closeOtpDialog} />
                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}



const mapStateToProps = state => ({

    newlists: state.lists.newlists,
    isVisibleAddAddressManager: state.users.isVisibleAddAddressManager,
    isVisibleAddTelephoneManager: state.users.isVisibleAddTelephoneManager,
    isVisibleAddCardManager: state.users.isVisibleAddCardManager,
    isVisibleAddPasswordManager: state.users.isVisibleAddPasswordManager,
    isUpdatingUser: state.users.isUpdatingUser,
    chargeResponse: state.users.chargeResponse,
    addToCartResponse: state.lists.addToCartResponse,
    showModalPin: state.lists.showModalPin,
    orderCount: state.lists.orderCount,
    deliveryFee: state.delivery.deliveryFee

})

export default connect(mapStateToProps)(ScreenCheckout);