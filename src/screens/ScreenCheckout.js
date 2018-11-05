import React, { Component } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
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




class ScreenCheckout extends Component {


    componentWillReceiveProps(nextProps) {

        // console.log("nextProps.newproducts");
        // console.log(nextProps.newproducts);
        // console.log("this.props.newproducts")
        // console.log(this.props.newproducts)
         this.props.isVisibleAddAddressManager === true ? this.openDialog() : null;
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
            isVisibleCoupon: true
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

    openDialog = () => {
        this.refs.RefModalCheckoutDetails.open()
    }

    closeDialog = () => {
        this.refs.RefModalCheckoutDetails.close()
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
                                    <AccordionHeader title="Address" subtitle="20 Chidi Okpala Close, Fidiso Estate" onSelected={() => { this.toggleView("address") }} />
                                    <Collapsible collapsed={this.state.isVisibleAddress}>
                                        <AddressManager isCheckboxVisible={true} />
                                    </Collapsible>
                                    <Button title="open dialog" onPress={() => this.openDialog()} />
                                </View>
                                <View>
                                    <AccordionHeader title="Phone Number" subtitle="0706 818 1804" onSelected={() => { this.toggleView("phonenumber") }} />
                                    <Collapsible collapsed={this.state.isVisiblePhoneNumber}>
                                        <TelephoneManager isCheckboxVisible={true} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Change Password" subtitle="********" onSelected={() => { this.toggleView("password") }} />
                                    <Collapsible collapsed={this.state.isVisiblePassword}>
                                        <PasswordManger isCheckboxVisible={true} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Select Card" subtitle="**** 4678" onSelected={() => { this.toggleView("card") }} />
                                    <Collapsible collapsed={this.state.isVisibleCard}>
                                        <CardManager isCheckboxVisible={true} />
                                    </Collapsible>
                                </View>
                                <View>
                                    <AccordionHeader title="Use Coupon" subtitle="MYFIRSTORDER applied" onSelected={() => { this.toggleView("coupon") }} />
                                    <Collapsible collapsed={this.state.isVisibleCoupon}>
                                        <CouponManger isCheckboxVisible={true} />
                                    </Collapsible>
                                </View>
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
                    style={[styles.modalDeliveryMethod]}
                    position={"center"}
                    ref={"RefModalCheckoutDetails"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={true}
                >
                    <Text>Checkout Dialog Here !!</Text>
                </Modal>
            </View>
        );
    }
}

//export default ScreenCheckout;


const mapStateToProps = state => ({

    newlists: state.lists.newlists,
    isVisibleAddAddressManager: state.users.isVisibleAddAddressManager,


})

export default connect(mapStateToProps)(ScreenCheckout);