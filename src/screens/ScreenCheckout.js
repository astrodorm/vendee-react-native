import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
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
import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Modal from 'react-native-modalbox';
import InlineError from '../components/InlineError';
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
    chargeUserPhoneNumberAction,
    loginAction,
    createUserAction
} from '../actions/actions';
import * as Progress from 'react-native-progress';


const ADDRESS_STORAGE_KEY = "ADDRESS";
const OAUTH = "OAUTH";
const PHONE_STORAGE_KEY = "PHONE";
const CARD_NUMBER_STORAGE_KEY = "CARD_NUMBER";
const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";
const EMAIL_STORAGE_KEY = "EMAIL";





class ScreenCheckout extends Component {


    componentWillReceiveProps(nextProps) {

        nextProps.isVisibleAddAddressManager === true ? this.openAddDialog() : null;
        nextProps.isVisibleAddTelephoneManager === true ? this.openAddDialog() : null;
        nextProps.isVisibleAddCardManager === true ? this.openAddDialog() : null;
        nextProps.isVisibleAddPasswordManager === true ? this.openAddDialog() : null;

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

        //SET VISIBLE TIME SLOT GROUP
        this.setVisibleTimeSlotGroup();

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
            isVisibleTimeSlot: true,
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
            orderCount: 1,
            isVisibleCardPinError: false,
            selectedTimeSlot: "No Time slot selected",
            selectedMaxOrderTime: "1:00 AM",
            isActiveSlot0: false,
            isActiveSlot1: false,
            isActiveSlot2: false,
            isActiveSlot3: false,
            isActiveSlot4: false,
            isActiveSlot5: false,
            isActiveSlot6: false,
            isActiveSlot7: false,
            isActiveSlot8: false,
            isActiveSlot9: false,
            isActiveSlot10: false,
            isActiveSlot11: false,
            isAvailableTimeSlotGroup1: true,
            isAvailableTimeSlotGroup2: false,
            isVisiblePhoneNumberError: false,
            email: "",
            password: "",
            phoneNumber: "",
            isLoginView: false,
            isSignUpView: true,
            isVisibleAccountMessage: false,
            isVisibleAccountSetup: true,
            accountMessage: ""
        }
    }

    toggleActiveSlot = (timeSlotID, timeSlotCount) => {

        for (let index = 0; index < timeSlotCount; index++) {
            timeSlotKey = "isActiveSlot" + index;
            this.setState({ timeSlotKey: true });
        }

        var activeTimeSlotKey = "isActiveSlot" + timeSlotID;
        this.setState({ isActiveSlot1: true });

        console.log("timeSlotID", timeSlotID)
        console.log("activeTimeSlotKey", activeTimeSlotKey);
        console.log("this.state.activeTimeSlotKey", this.state.activeTimeSlotKey)

        //console.log(this.setState({ activeTimeSlotKey: true }))

    }

    setVisibleTimeSlotGroup = () => {
        //return moment(date).calendar();
        let dayofTheWeek = moment().format('dddd');

        dayofTheWeek === "Sunday" ? this.showTimeSlotGroup2() : this.showTimeSlotGroup1();

    }

    showTimeSlotGroup1 = () => {
        this.setState({ isAvailableTimeSlotGroup1: true });
        this.setState({ isAvailableTimeSlotGroup2: false });

    }

    showTimeSlotGroup2 = () => {
        this.setState({ isAvailableTimeSlotGroup2: true });
        this.setState({ isAvailableTimeSlotGroup1: false });

    }

    setActiveTimeSlot = (timeslot, maxTimeSlotOrderTime) => {
        this.setState({ selectedTimeSlot: timeslot });
        this.setState({ selectedMaxOrderTime: maxTimeSlotOrderTime });

        this.validateSelectedTimeSlot(maxTimeSlotOrderTime)

    }

    validateSelectedTimeSlot = (maxTimeSlotOrderTime) => {
        let currentDate = moment().format('L');
        let currentTime = moment().format('LT');

        let currentDateTime = currentDate + " " + currentTime;
        let selectedDateTime = currentDate + " " + maxTimeSlotOrderTime;

        let isValidTimeSlot = true;
        // currentDateTime > selectedDateTime ? isValidTimeSlot = false : isValidTimeSlot = true;

        if (currentDateTime > selectedDateTime) {
            isValidTimeSlot = false;
        }

        if (this.state.selectedTimeSlot === "No Time slot selected") {
            isValidTimeSlot = null;
        }


        return isValidTimeSlot;
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


    convertToKobo = (amount) => {
        let value = amount * 100;
        return value;
    }


    getConvenienceFee = () => {

        let convenienceFee = 0;
        let total = this.getTotal();
        let maxConvenienceFee = this.props.newFees[0].maxConvenience;

        let calculatedConvenienceFee = Math.round(this.props.newFees[0].convenience * total)

        calculatedConvenienceFee > maxConvenienceFee ? convenienceFee = maxConvenienceFee : convenienceFee = calculatedConvenienceFee;

        return convenienceFee;

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
            case "timeslot":
                this.setState({ isVisibleTimeSlot: !this.state.isVisibleTimeSlot });
                break;
            default:
                this.setState({ isVisibleAddress: !this.state.isVisibleAddress });
                break;
        }
    }


    prepareCart = () => {

        let listArray = [...this.props.newlists];
        let userToken = this.state.userToken;
        let cartObj = {};
        let cartArray = [];
        let shippingMethod = "";

        this.props.isDelivery === true ? shippingMethod = "DELIVERY" : null;
        this.props.isPickup === true ? shippingMethod = "PICKUP" : null;


        for (let index = 0; index < listArray.length; index++) {


            // cartArray.push({
            //     productID: listArray[index].id,
            //     quantity: listArray[index].quantity,

            // });

            cartArray.push({
                itemCode: listArray[index].id,
                quantity: listArray[index].quantity,
                sellingPrice: listArray[index].price,
                productName: listArray[index].title,

            });

        }


        this.addToCart(userToken, shippingMethod, this.getConvenienceFee(), this.getDeliveryFee(), this.state.selectedTimeSlot, this.getTotal(), cartArray);


    }


    addToCart = (userToken, shippingMethod, convenienceFee, deliveryFee, timeSlot, total, cartArray) => {
        this.showPreloader();


        this.props.dispatch(promisedAddToCartAction(userToken, shippingMethod, convenienceFee, deliveryFee, timeSlot, total, cartArray)).then(res => {
            this.createOrder(userToken);

            console.log("addtoCart res");
            console.log(res);

        }).catch(err => {
            this.hidePreloader();
            this.showErrorDialog("Failed To Add Items. Try Again");

            console.log("addtoCart err");
            console.log(err);
        });


    }

    createOrder = (userToken) => {

        let reference = this.props.chargeResponse.data.card.reference

        this.props.dispatch(createOrderAction(userToken, reference)).then(res => {

            this.hidePreloader();
            this.gotoSuccessPage();

            console.log("createOrder res");
            console.log(res);


        }).catch(err => {

            this.hidePreloader();
            this.showErrorDialog("Failed To Create Order. Try Again");

            console.log("createOrder err");
            console.log(err);

        });

    }

    loginUser = () => {
        let email = this.state.email;
        let oauth = this.state.password;

        this.showAccountMessage();
        this.setState({ accountMessage: "Please Wait.. Logging In..." })


        this.props.dispatch(loginAction(email.toLowerCase(), oauth.toLowerCase())).then(res => {

            let userToken = res.data.data.token

            this.storeUserCredentials(userToken);

            this.setState({ accountMessage: "Successfully Logged In. You may now close this pop-up and continue" })
            this.showAccountMessage();

        }).catch(err => {

            this.showAccountMessage();
            this.setState({ accountMessage: `${this.props.loginResponse.message}. Close this pop-up and click 'Place Order' to Try Again` });
            console.log(err);

        });

    }

    signUpUser = () => {
        let firstname = "GENERIC";
        let lastname = "GENERIC";
        let email = this.state.email
        let oauth = "GENERIC";
        let phoneNumber = this.state.phoneNumber;

        this.showAccountMessage();
        this.setState({ accountMessage: "Please Wait.. Creating Account..." })


        this.storeData(EMAIL_STORAGE_KEY, email.toLowerCase());

        this.props.dispatch(createUserAction(firstname, lastname, phoneNumber, email.toLowerCase(), oauth)).then(res => {
            // let userToken = res.data.data.token

            this.storeUserCredentials(res.data.data.token);

            this.setState({ accountMessage: "Success!. New Account created. You may now close this pop-up and continue" })
            this.showAccountMessage();

        }).catch(err => {
            this.setState({ accountMessage: "Failed to create an account. Close this modal and click 'Place Order' to Try Again" });
            this.showAccountMessage();
            console.log(err);
        });

    }

    //  validateAccountSetup = () => {

    // validateEmail = () => {

    //     let email = this.state.email;
    //     const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //     let isValidEmail = regex.test(email);
    //     return isValidEmail
    // }

    // validateTelephone = () => {
    //     let telephone = this.state.telephone;
    //     let telephoneLength = String(telephone).replace('.', '').length;

    //     // console.log(telephoneLength)
    //     let isPhoneNumber = false;
    //     telephoneLength < 11 ? isPhoneNumber = true : isPhoneNumber = false;

    //     return isPhoneNumber
    // }

    showAccountMessage = () => {
        this.setState({ isVisibleAccountMessage: true });
        this.setState({ isVisibleAccountSetup: false });
    }

    hideLoginMessage = () => {
        this.setState({ isVisibleAccountSetup: true });
        this.setState({ isVisibleAccountMessage: false });
    }

    storeUserCredentials = (userToken) => {

        let emailAddress = this.state.email;

        //SAVE USER TOKEN
        this.storeData(USER_TOKEN_STORAGE_KEY, userToken);

        this.setState({ userToken: userToken });

        //SAVE USER TOKEN
        this.storeData(EMAIL_STORAGE_KEY, emailAddress.toLowerCase());

        //NAVIGATE TO MAIN APP
        // this.navigateToMainApp()
    }

    checkOrderCount = () => {
        let listArray = [...this.props.newlists];
        let lengthOfOrder = listArray.length;
        let orderCount = this.state.orderCount;

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

    closeOtpPhoneNumberDialog = () => {
        this.refs.RefModalOtpPhoneNumber.close()
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


    handleEmail = (text) => {

        this.setState({ email: text })

    }

    toggleSignUpView = () => {

        this.setState({ isLoginView: false });
        this.setState({ isSignUpView: true });
    }

    toggleLoginView = () => {

        this.setState({ isSignUpView: false });
        this.setState({ isLoginView: true });

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

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetAddressData(ADDRESS_STORAGE_KEY);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }

    updatePassword = () => {

        //SAVE PASSWORD DETAILS TO THE STATE
        let password = this.state.password;
        this.storeData(OAUTH, password);

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetPasswordData(OAUTH);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }


    updatePhoneNumber = () => {
        let phoneNumber = this.state.phoneNumber;
        this.storeData(PHONE_STORAGE_KEY, phoneNumber);

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetPhoneData(PHONE_STORAGE_KEY);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }


    updateCard = () => {
        let cardNumber = this.state.cardNumber;
        let trimmedCardNumber = cardNumber.slice(12);
        this.storeData(CARD_NUMBER_STORAGE_KEY, trimmedCardNumber);

        //UPDATE USER DETAILS STATE
        this.retrieveAndSetCardNUmberData(CARD_NUMBER_STORAGE_KEY);

        //CLOSE ADD DIALOG
        this.closeAddDialog()
    }


    validateInput = () => {

        // this.retrieveAndUserTokenData(USER_TOKEN_STORAGE_KEY)


        let address = this.state.address;
        let phoneNumber = this.state.phoneNumber;
        let cardNumber = this.state.cardNumber;
        //  let total = this.getUnformattedGrandTotalKobo();
        let total = this.convertToKobo(this.getGrandTotal());
        let cvv = this.state.cardCVV;
        let expiryMonth = this.state.expiryMonth;
        let expiryYear = this.state.expiryYear;
        let password = this.state.password;
        let currentTime = moment().format('LT');
        let userToken = this.state.userToken;


        userToken === "null" ? this.showSignUpAndLoginModal() : null;
        this.validateSelectedTimeSlot(this.state.selectedMaxOrderTime) === null ? this.showErrorDialog("No time slot was selected. Select a time slot after " + currentTime) : null;
        this.validateSelectedTimeSlot(this.state.selectedMaxOrderTime) === false ? this.showErrorDialog("The " + this.state.selectedTimeSlot + " time slot is unavailable. Select a time slot after " + currentTime) : null;
        address === "" || address === "Enter Address" ? this.showErrorDialog("Invalid Address") : null;
        phoneNumber === "" || phoneNumber === "Enter Phone Number" ? this.showErrorDialog("Invalid Phone Number") : null;
        cardNumber === "" ? this.showErrorDialog("Invalid Card Number") : null;
        total === 0 ? this.showErrorDialog("Invalid Amount") : null;
        cvv === "" ? this.showErrorDialog("Invalid Card CVV Number") : null;
        expiryMonth === "" ? this.showErrorDialog("Invalid Card Expiry Month") : null;
        expiryYear === "" ? this.showErrorDialog("Invalid Card Expiry Year") : null;
        password === "GENERIC" || password  === "" ? this.showErrorDialog("You are required to update your password") : null;


        this.validateSelectedTimeSlot(this.state.selectedMaxOrderTime) === true && address !== "" && phoneNumber !== "" && cardNumber !== "" && total !== 0 && cvv !== "" && expiryMonth !== "" && expiryYear !== "" && password !== "GENERIC" ? this.updateUserProfile() : null;

    }

    showErrorDialog = (message) => {
        //SET ERROR MESSAGE
        this.setState({ errorMessage: message });

        //SHOW ERROR DIALOG
        this.refs.RefModalCheckoutErrorMessage.open()
    }

    showSignUpAndLoginModal = () => {

        this.hideLoginMessage();

        //SHOW ERROR DIALOG
        this.refs.RefModalSignUpLogin.open()

    }

    closeSignUpAndLoginModal = () => {
        this.refs.RefModalSignUpLogin.close()
    }



    showPinModal = () => {

        //SHOW PIN MODAL
        this.refs.RefModalPin.open()
    }


    showOtpModal = () => {

        //SHOW PIN MODAL
        this.refs.RefModalOtp.open()
    }

    showOtpPhoneNumber = () => {
        //SHOW PIN MODAL
        this.refs.RefModalOtpPhoneNumber.open()
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

        //  let amount = this.getUnformattedGrandTotalKobo();
        let amount = this.convertToKobo(this.getGrandTotal())
        let number = this.state.cardNumber;
        let cvv = this.state.cardCVV;
        let expiry_month = this.state.expiryMonth;
        let expiry_year = this.state.expiryYear;
        let userToken = this.state.userToken;


        this.props.dispatch(chargeUserAction(userToken, amount, number, cvv, expiry_month, expiry_year)).then(res => {

            this.hidePreloader();

            res.data.status === 200 ? this.prepareCart() : null;
            res.data.status === 500 ? this.showErrorDialog("Payment gateway error. Try Again") : null;
            res.data.status === 201 ? this.showPinModal() : null;


        }).catch(err => {
            console.log(err);
            this.hidePreloader();
            this.showErrorDialog(this.props.chargeResponse.error.data.message);
        });



    }

    validateCardPin = () => {

        //HIDE CARD PIN ERROR
        this.hideCardPinError()

        let pin = this.state.cardPin;
        pin.length !== 4 ? this.showCardPinError() : this.chargeUserPin();
    }

    validateOtpPhoneNumber = () => {

        //HIDE OTP PHONE NUMBER ERROR
        this.hideOtpPhoneNumberError();

        let phoneNumber = this.state.phoneNumber;
        phoneNumber.length !== 11 ? this.showOtpPhoneNumberError() : this.chargeUserPhoneNumber();
    }

    showCardPinError = () => {
        this.setState({ isVisibleCardPinError: true })
    }

    hideCardPinError = () => {
        this.setState({ isVisibleCardPinError: false })
    }

    showOtpPhoneNumberError = () => {
        this.setState({ isVisiblePhoneNumberError: true })
    }

    hideOtpPhoneNumberError = () => {
        this.setState({ isVisiblePhoneNumberError: false })
    }

    chargeUserPin = () => {

        let reference = this.props.chargeResponse.data.reference
        let pin = this.state.cardPin;
        let userToken = this.state.userToken;

        this.showPreloader();

        this.props.dispatch(chargeUserPinAction(userToken, reference, pin)).then(res => {
            this.hidePreloader();
            res.data.status === 200 ? this.prepareCart() : null;
            res.data.status === 500 ? this.showErrorDialog("Payment gateway error. Try Again") : null;
            res.data.status === 203 ? this.showOtpPhoneNumber() : null;
            res.data.status === 202 ? this.showOtpModal() : null;


        }).catch(err => {
            console.log(err);
            this.hidePreloader();
            this.showErrorDialog(this.props.chargeResponse.error.data.message);
        });

        this.closePinDialog()

    }


    chargeUserPhoneNumber = () => {

        let reference = this.props.chargeResponse.data.reference
        let phoneNumber = this.state.phoneNumber;
        let userToken = this.state.userToken;

        this.showPreloader();


        this.props.dispatch(chargeUserPhoneNumberAction(userToken, reference, phoneNumber)).then(res => {
            this.hidePreloader();
            res.data.status === 200 ? this.prepareCart() : null;
            res.data.status === 500 ? this.showErrorDialog("Payment gateway error. Try Again") : null;
            // res.data.status === 203 ? this.showOtpPhoneNumber() : null;
            res.data.status === 202 ? this.showOtpModal() : null;


        }).catch(err => {
            console.log(err);
            this.hidePreloader();
            this.showErrorDialog(this.props.chargeResponse.error.data.message);
        });

        this.closeOtpPhoneNumberDialog()

    }


    chargeUserOtp = () => {
        let reference = this.props.chargeResponse.data.reference
        let otp = this.state.otp;
        let userToken = this.state.userToken;

        this.showPreloader()

        this.props.dispatch(chargeUserOtpAction(userToken, reference, otp)).then(res => {

            res.data.status === 200 ? this.prepareCart() : null;
            res.data.status === 500 ? this.showErrorDialog("Payment gateway error. Try Again") : null;

        }).catch(err => {
            console.log(err);
            this.hidePreloader();
            this.showErrorDialog(this.props.chargeResponse.error.data.message);
        });

        this.closeOtpDialog();

    }


    showPreloader = () => {
        this.refs.RefModalPreloader.open()
    }

    hidePreloader = () => {
        this.refs.RefModalPreloader.close()
    }

    closeErrorModal = () => {
        this.refs.RefModalCheckoutErrorMessage.close()
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
                                    <AccordionHeader title="Select a Debit Card" subtitle={"***" + this.state.last4digits} onSelected={() => { this.toggleView("card") }} />
                                    <Collapsible collapsed={this.state.isVisibleCard}>
                                        <CardManager last4digits={this.state.last4digits} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Select a Time Slot" subtitle={this.state.selectedTimeSlot} onSelected={() => { this.toggleView("timeslot") }} />
                                    <Collapsible collapsed={this.state.isVisibleTimeSlot}>
                                        {
                                            this.state.isAvailableTimeSlotGroup1 &&

                                            <View style={styles.TimeSlotContainer}>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("9:30AM - 11:00AM", "10:30 AM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>9:30AM - 11:00AM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("11:00AM - 12:30PM", "12:00 PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>11:00AM - 12:30PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("12:30PM - 2:00PM", "1:30 PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>12:30PM - 2:00PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("2:00PM - 3:30PM", "3:00 PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>2:00PM - 3:30PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("3:30PM - 5:00PM", "4:30 PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>3:30PM - 5:00PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("5:00PM - 6:30PM", "6:00 PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>5:00PM - 6:30PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("6:30PM - 8:00PM", "7:30 PM")}>
                                                    <View style={[styles.TimeSlot, this.state.isActiveSlot6 ? styles.ActiveTimeSlot : styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>6:30PM - 8:00PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("8:00PM - 9:30PM", "9:00 PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>8:00PM - 9:30PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        }


                                        {
                                            this.state.isAvailableTimeSlotGroup2 &&

                                            <View style={styles.TimeSlotContainer}>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("1:30PM - 3:00PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>1:30PM - 3:00PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("3:00PM - 4:30PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>3:00PM - 4:30PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("4:30PM - 6:00PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>4:30PM - 6:00PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setActiveTimeSlot("6:00PM - 7:30PM")}>
                                                    <View style={[styles.TimeSlot, styles.InActiveTimeSlot]}>
                                                        <Text style={styles.TimeSlotTime}>6:00PM - 7:30PM</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        }

                                    </Collapsible>
                                </View>
                                <View>
                                    <Text style={styles.AppCardSubtitle}>SHOPPING LIST DETAILS</Text>
                                    <ShoppingListDetails total={this.getTotal()} convenienceFee={this.getConvenienceFee()} deliveryFee={this.getDeliveryFee()} grandTotal={this.getGrandTotal()} />
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
                                <TextInput style={styles.textInput} placeholder="Card Number" onChangeText={this.handleCardNumber}/>
                                <TextInput style={styles.textInput} placeholder="Exp. Month" onChangeText={this.handleMonth} />
                                <TextInput style={styles.textInput} placeholder="Exp. Year" onChangeText={this.handleYear} />
                                <TextInput style={styles.textInput} placeholder="CVV Code" onChangeText={this.handleCVC} />
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
                <Modal
                    style={[styles.modalCheckout]}
                    position={"center"}
                    ref={"RefModalSignUpLogin"}
                    backdrop={true}
                    swipeToClose={true}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={true}
                >


                    <Text style={styles.errorHeader}>Create an Account or Login</Text>

                    {this.state.isVisibleAccountSetup &&

                        <View>
                            <View style={styles.tabbedButtonViewGroup}>
                                <TouchableOpacity style={styles.tabbedButton} onPress={() => this.toggleSignUpView()}>
                                    <Text style={styles.tabbedButtonText}>CREATE AN ACCOUNT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tabbedButton} onPress={() => this.toggleLoginView()}>
                                    <Text style={styles.tabbedButtonText}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput style={styles.textInput} placeholder="Email" onChangeText={this.handleEmail} keyboardType="email-address"></TextInput>
                            {
                                this.state.isLoginView &&
                                <View>
                                    <TextInput style={styles.textInput} placeholder="Password" onChangeText={this.handlePassword} secureTextEntry={true}></TextInput>
                                    <ButtonPrimaryAccent title="LOGIN" isActive={true} onSelected={this.loginUser} />
                                </View>

                            }

                            {
                                this.state.isSignUpView &&
                                <View>
                                    <TextInput style={styles.textInput} placeholder="Phone Number" onChangeText={this.handlePhone}></TextInput>
                                    <ButtonPrimaryAccent title="CREATE ACCOUNT" isActive={true} onSelected={this.signUpUser} />
                                </View>

                            }
                        </View>

                    }


                    {
                        this.state.isVisibleAccountMessage &&
                        <View>
                            <Text>{this.state.accountMessage}</Text>
                        </View>
                    }
                    <View style={styles.headingDivider}></View>
                    <ButtonPrimaryAccent title="CLOSE" isActive={false} onSelected={this.closeSignUpAndLoginModal} />

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
                        {
                            this.state.isVisibleCardPinError &&

                            <InlineError message="*Invalid length of PIN" />

                        }
                        <View style={styles.buttonGroup}>
                            <ButtonPrimaryAccent title="PROCEED" isActive={true} onSelected={this.validateCardPin} />
                            <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closePinDialog} />
                        </View>
                    </View>
                </Modal>
                <Modal
                    style={[styles.modalCheckout]}
                    position={"center"}
                    ref={"RefModalOtpPhoneNumber"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={false}
                >
                    <View>
                        <View>
                            <Text>Enter a phone number to receive OTP.</Text>
                            <TextInput style={styles.textInput} placeholder="Enter Phone Number for OTP" onChangeText={this.handlePhone} />
                        </View>
                        {
                            this.state.isVisiblePhoneNumberError &&

                            <InlineError message="*Invalid length of Phone Number" />

                        }
                        <View style={styles.buttonGroup}>
                            <ButtonPrimaryAccent title="PROCEED" isActive={true} onSelected={this.validateOtpPhoneNumber} />
                            <ButtonPrimaryAccent title="CANCEL" isActive={false} onSelected={this.closeOtpPhoneNumberDialog} />
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
            </View >

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
    deliveryFee: state.delivery.deliveryFee,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup,
    newFees: state.fees.newFees,
    loginResponse: state.users.loginResponse

})

export default connect(mapStateToProps)(ScreenCheckout);