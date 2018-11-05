import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';
import ButtonIconPrimaryAccent from '../components/ButtonIconPrimaryAccent';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import { connect } from 'react-redux';
import { toggleAddModalAddressManager } from '../actions/actions';




class AddressManager extends Component {

    // componentWillReceiveProps(nextProps) {

    //     console.log("this.props.responseMessage");
    //     console.log(nextProps.responseMessage);

    //    // nextProps.isCreateUserSuccess === true ? this.animateToSuccessView() : null;
    // }

    constructor(props) {
        super(props)


        this.state = {
            searchText: "",
            // isLoadingSearchBar : false

        }



    }

    addAddress = () => {
        // this.toggleIcon();

        // let query = this.state.searchText;
        // this.props.dispatch(fetchProductAction(query));

        console.log("addAddress");

    }

    handleSearchInput = (text) => {
        this.setState({ searchText: text });
        console.log(text);
    }

    toggleIcon = () => {
        // this.setState({ isLoadingSearchBar: !this.state.isLoadingSearchBar })
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
                <Button title="add address" onPress={this.addAddress} />
            </View>
        )
    }

}

//export default AddressManager;


const mapStateToProps = state => ({

    isLoadingSearchBar: state.products.isLoadingSearchBar,
    responseMessage: state.users.responseMessage,

    // searchText: state.products.searchText,
    // isDelivery: state.delivery.isDelivery,
    // isPickup: state.delivery.isPickup

})

export default connect(mapStateToProps)(AddressManager);