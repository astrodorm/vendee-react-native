import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import { connect } from 'react-redux';
import { toggleAddModalTelephoneManager } from '../actions/actions';




class TelephoneManager extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    addTelephone = () => {

        console.log("addTelephone");
        this.props.dispatch(toggleAddModalTelephoneManager(true));

    }


    render() {
        return (
            <View>
                <View style={styles.ActionInputContainer}>
                    <Text style={styles.AccordionContent}>{this.props.phoneNumber}</Text>
                </View>
                <ButtonPrimaryAccent title="UPDATE PHONE" icon="form" isActive={false} onSelected={this.addTelephone} />
            </View>
        )
    }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(TelephoneManager);