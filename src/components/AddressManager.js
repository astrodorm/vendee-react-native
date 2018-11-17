import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import { connect } from 'react-redux';
import { toggleAddModalAddressManager } from '../actions/actions';




class AddressManager extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    addAddress = () => {

        console.log("addAddress");
        this.props.dispatch(toggleAddModalAddressManager(true));

    }


    render() {
        return (
            <View>
                <View style={styles.ActionInputContainer}>
                    <Text style={styles.AccordionContent}>{this.props.address}</Text>
                </View>
                <ButtonPrimaryAccent title="UPDATE ADDRESS" icon="form" isActive={false} onSelected={this.addAddress} />
            </View>
        )
    }

}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(AddressManager);