import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/AntDesign';
import ShoppingListDetails from '../components/shoppingListDetails';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import CheckoutMessage from '../components/CheckoutMessage';




const SECTIONS = [
    {
        title: 'Names',
        subtitle: '20 Chidi Okpala close, Fidiso Estate',
        content: '****ADD, EDIT, SELECT ADDRESS**** '
    },
    {
        title: 'Phone Number',
        subtitle: '0706 818 1804',
        content: '****EDIT**** '
    },
    {
        title: 'Cards',
        subtitle: '***********',
        content: '****SAVE**** '
    },
    {
        title: 'Address',
        subtitle: 'card_logo  **4678',
        content: '****SELECT, ADD**** '
    }
];

class ScreenProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showCheckoutMessage: true,
            showPlaceOrderComponent: false
        }
    }




    AccordionState = {
        activeSections: []
    };

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


    placeOrder = () => {
        console.log("placeOrder")
    }


    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View>
                        <View style={styles.AppCard}>
                            <View>
                                <Text style={styles.AppCardHeader}>User Profile</Text>
                                <View>
                                    <Accordion
                                        sections={SECTIONS}
                                        activeSections={this.AccordionState.activeSections}
                                        // renderSectionTitle={this._renderSectionTitle}
                                        renderHeader={this._renderHeader}
                                        renderContent={this._renderContent}
                                        onChange={this._updateSections}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ScreenProfile;