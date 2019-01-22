import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import SearchResult from '../components/SearchResult';
import { connect } from 'react-redux';
import { fetchProductAction, endfetchProductAction, selectDeliveryMethod } from '../actions/actions';
import Modal from 'react-native-modalbox';
import ButtonSecondaryAccent from '../components/ButtonSecondaryAccent';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';


class ScreenSearch extends Component {


    componentDidMount() {

        this.setState({ showDeliveryModal: true });

    }


    constructor(props) {
        super(props);

        this.state = {
            showSearchResultView: false,
            showSearchBarView: true,
            showDeliveryModal: true,
            searchText: ""
        }
    }


    openDialogDeliveryMethod = () => {

        this.refs.RefModalDeliveryMethod.open();

    }


    fakeApiRequestDelay = () => {
        setTimeout(this.showModalDeliveryMethod, 3000);
    }

    showSearchResult = () => {
        this.setState({ showSearchResultView: true, showSearchBarView: false });
        this.closeModalDeliveryMethod()
    }

    closeModalDeliveryMethod = () => {

        //SHOW MODAL FOR DELIVERY METHOD 
        this.refs.RefModalDeliveryMethod.close();
    }


    showModalDeliveryMethod = () => {

        //SHOW MODAL FOR DELIVERY METHOD 
        this.refs.RefModalDeliveryMethod.open();

        //DISPATCH AN ACTION TO END FETCHING PRODUCT REQUEST
        //THIS IS BASICALLY TO STOP THE SEARCH BAR PRELOADER
        //NORMALLY THIS WOULD BASED ON THE RESPONSE FROM THE REQUEST
        this.props.dispatch(endfetchProductAction());
    }

    selectDelivery = () => {
        this.props.dispatch(selectDeliveryMethod(true, false, 500));
        this.showSearchResult();

    }

    selectPickup = () => {
        this.props.dispatch(selectDeliveryMethod(false, true, 0));
        this.showSearchResult();
    }


    searchProduct = () => {

        let item = this.state.searchText;
        if (item !== "") {
            this.openDialogDeliveryMethod();
            this.props.dispatch(fetchProductAction(item));

        }

    }

    handleSearchInput = (text) => {

        this.setState({ searchText: text });

    }


    gotoCheckout = () => {

        this.props.navigation.navigate("Checkout");

    }



    render() {

        return (

            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>

                    {/* SEARCH BAR VIEW */}

                    {
                        this.state.showSearchBarView &&
                        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', }} behavior="padding">

                            <View>
                                <View style={styles.SearchFirstView}>
                                    <Image style={styles.AppImage} source={require('../../assets/images/vendee-logo-grey.png')} />
                                </View>
                                <View style={styles.SearchSecondView}>
                                    <View style={styles.AppSearchBar}>
                                        <TextInput style={styles.AppSearchBarTextInput} placeholder="What would you buy today ?" onChangeText={this.handleSearchInput}></TextInput>
                                        <TouchableOpacity onPress={this.searchProduct}>

                                            {!this.props.isLoadingSearchBar &&
                                                <Icon style={styles.AppSearchBarIcon} name="search1" size={24} color="#f44950" />
                                            }

                                            {this.props.isLoadingSearchBar &&
                                                <Progress.CircleSnail style={styles.AppSearchBarIcon} color={['#f44950', '#FFB76F', '#00316E']} duration={400} size={32} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    }

                    {/* SEARCH RESULT VIEW */}

                    {
                        this.state.showSearchResultView &&
                        <View>
                            <SearchResult />
                        </View>
                    }
                </View>
                <Modal
                    style={[styles.modalDeliveryMethod]}
                    position={"center"}
                    ref={"RefModalDeliveryMethod"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={false}
                >
                    <View>
                        <Text style={styles.modalDeliveryMethodHeader}>
                            How would you like your "{this.props.searchText}" delivered ?
                        </Text>
                        <ButtonSecondaryAccent title="Deliver it to me" icon="car" isActive={this.props.isDelivery} onSelected={this.selectDelivery} />
                        <ButtonSecondaryAccent title="I will pick it up" icon="isv" isActive={this.props.isPickup} onSelected={this.selectPickup} />
                    </View>
                </Modal>
            </View>
        )
    }
}


const mapStateToProps = state => ({

    searchText: state.products.searchText,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup,
    isFirstSearch: state.products.isFirstSearch,
    isLoadingSearchBar: state.products.isLoadingSearchBar,


})

export default connect(mapStateToProps)(ScreenSearch);