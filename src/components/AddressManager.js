import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';
import ButtonIconPrimaryAccent from '../components/ButtonIconPrimaryAccent';
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
                    <Text style={styles.AccordionContent}>20 Chidi Okpala Close, Fidiso Estate</Text>
                    <ButtonIconPrimaryAccent icon="edit" isActive={false} />
                    {
                        this.props.isCheckboxVisible &&
                        <ButtonIconPrimaryAccent icon="check" isActive={true} />
                    }
                </View>
                <ButtonPrimaryAccent title="ADD ADDRESS" icon="form" isActive={false} onSelected={this.addAddress} />
                {/* <Button title="add address" onPress={this.addAddress} /> */}
            </View>
        )
    }

}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(AddressManager);