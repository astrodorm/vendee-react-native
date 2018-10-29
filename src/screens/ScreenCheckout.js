import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/AntDesign';
import ShoppingListDetails from '../components/shoppingListDetails';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import CheckoutMessage from '../components/CheckoutMessage';




const SECTIONS = [
    {
        title: 'Address',
        subtitle: '20 Chidi Okpala close, Fidiso Estate',
        content: '****ADD, EDIT, SELECT ADDRESS**** '
    },
    {
        title: 'Phone Number',
        subtitle: '0706 818 1804',
        content: '****EDIT**** '
    },
    {
        title: 'Change Password',
        subtitle: '***********',
        content: '****SAVE**** '
    },
    {
        title: 'Select Card',
        subtitle: 'card_logo  **4678',
        content: '****SELECT, ADD**** '
    },
    {
        title: 'Add Coupon',
        subtitle: 'MYFIRSTORDER coupon applied',
        content: '****APPLY**** '
    }
];

class ScreenCheckout extends Component {


    constructor(props) {
        super(props)

        this.state = {
            showCheckoutMessage: false,
            showPlaceOrderComponent: true,
            activeSections: []
        }
    }


    // _renderSectionTitle = section => {
    //     return (
    //         <View style={styles.content}>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // };

    _renderHeader = section => {
        return (
            <View style={styles.AccordionHeader}>
                <View>
                    <Text style={styles.AccordionHeaderTitle}>{section.title}</Text>
                    <Text style={styles.AccordionHeaderSubtitle}>{section.subtitle}</Text>
                </View>
                <View>
                    <Icon name="down" color="#efefef" size={20} />
                </View>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <View style={styles.AppContainer}>
                {/* <ScrollView> */}
                    <View style={styles.AppMain}>
                        {
                            this.state.showPlaceOrderComponent &&
                            <ScrollView>
                                <View style={styles.AppCardContainer}>
                                    <View style={styles.AppCard}>
                                        <Text style={styles.AppCardHeader}>Checkout</Text>
                                        <View style={styles.AppCardContent}>
                                            <View>
                                                <Accordion
                                                    sections={SECTIONS}
                                                    activeSections={this.state.activeSections}
                                                    renderHeader={this._renderHeader}
                                                    renderContent={this._renderContent}
                                                    onChange={this._updateSections}
                                                    underlayColor={"#efefef"}
                                                />
                                            </View>
                                            <Text>SHOPPING LIST DETAILS</Text>
                                            <ShoppingListDetails total="TOTAL HERE" convenienceFee="c fee here" deliveryFee="d fee here" grandTotal="gtotal here" />
                                            <ButtonPrimaryAccent title="PLACE ORDER" icon="arrowright" isActive={true} onSelected={this.placeOrder} />
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        }
                        {
                            this.state.showCheckoutMessage &&
                            <View>
                                <CheckoutMessage />
                            </View>
                        }
                    </View>
                {/* </ScrollView> */}
            </View>
        );
    }
}

export default ScreenCheckout;