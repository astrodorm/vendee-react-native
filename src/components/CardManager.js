import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
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
                    <View style={styles.CardContainer}>
                        {/* <Image style={styles.cardIcon} source={require('../../assets/images/mastercard-48.png')} /> */}
                        <Icon style={styles.cardIcon} name="creditcard" size={20} color="#d9d9d9" />
                        <Text style={styles.cardNumber}>{this.props.last4digits}</Text>
                        <Text style={styles.cardOwner}>YOUR CARD</Text>
                    </View>
                    {/* <View style={styles.CardContainer}>
                        <Image style={styles.cardIcon} source={require('../../assets/images/mastercard-48.png')} />
                        <Text style={styles.cardNumber}>... 6643</Text>
                        <Text style={styles.cardOwner}>TIMMY MICKY</Text>
                    </View> */}
                </View>
                <ButtonPrimaryAccent title="ADD CARD" icon="form" isActive={false} onSelected={this.addCard} />
            </View>
        )
    }

}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(CardManager);