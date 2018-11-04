import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { fetchProductAction } from '../actions/actions';




class SearchBar extends Component {

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

    searchProduct = () => {
        this.toggleIcon();

        let query = this.state.searchText;
        this.props.dispatch(fetchProductAction(query));

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
            <View style={styles.AppSearchBar}>
                <TextInput style={styles.AppSearchBarTextInput} placeholder="What would you buy today ?" onChangeText={this.handleSearchInput}></TextInput>
                <TouchableOpacity onPress={this.searchProduct}>

                    {!this.props.isLoadingSearchBar &&
                        <Icon style={styles.AppSearchBarIcon} name="right" size={24} color="#f44950" />
                    }

                    {this.props.isLoadingSearchBar &&
                        <Progress.CircleSnail style={styles.AppSearchBarIcon} color={['#f44950', '#FFB76F', '#00316E']} duration={400} size={32} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

}

//export default SearchBar;


const mapStateToProps = state => ({

    isLoadingSearchBar: state.products.isLoadingSearchBar,
    responseMessage: state.users.responseMessage,

    // searchText: state.products.searchText,
    // isDelivery: state.delivery.isDelivery,
    // isPickup: state.delivery.isPickup

})

export default connect(mapStateToProps)(SearchBar);