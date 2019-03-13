import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import ButtonPrimaryAccent from './ButtonPrimaryAccent';
import { connect } from 'react-redux';
import { toggleAddModalCardManager } from '../actions/actions';
import Icon from 'react-native-vector-icons/AntDesign';



class CardManager extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    addCard = () => {

        console.log("addCard");
        this.props.dispatch(toggleAddModalCardManager(true));

    }


    render() {
        return (
            <View>
                <View style={styles.cards}>
                    {/* <View style={styles.CardContainer}>
                        <Icon style={styles.cardIcon} name="creditcard" size={20} color="#d9d9d9" />
                        <Text style={styles.cardNumber}>***{this.props.last4digits}</Text>
                        <Text style={styles.cardOwner}>YOUR CARD</Text>
                    </View> */}
                </View>
                <ButtonPrimaryAccent title="ENTER DEBIT CARD" icon="form" isActive={false} onSelected={this.addCard} />
            </View>
        )
    }

}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(CardManager);