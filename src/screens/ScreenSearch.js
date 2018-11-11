import React, { Component } from 'react';
import { Text, View, Image, Button, KeyboardAvoidingView, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { connect } from 'react-redux';
import { fetchProductAction, endfetchProductAction, selectDeliveryMethod, createUser, isFirstFetchStartedAction } from '../actions/actions';
import Modal from 'react-native-modalbox';
import ButtonSecondaryAccent from '../components/ButtonSecondaryAccent';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';


class ScreenSearch extends Component {


    componentWillUpdate(nextProps) {

        // console.log("nextProps.isFirstSearch");
        // console.log(nextProps.isFirstSearch);

        // nextProps.isFirstSearch === true ? this.openDialogDeliveryMethod() : null;
    }

    componentWillReceiveProps(nextProps) {
       // console.log("nextProps.isFirstSearch");
       // console.log(nextProps.isFirstSearch);

       // nextProps.isFirstSearch === true ? this.openDialogDeliveryMethod() : null;
    }

    componentDidMount() {
        // this.props.dispatch(isFirstFetchStartedAction(true));
        this.setState({ showDeliveryModal: true });
        //  BackHandler.addEventListener('hardwareBackPress', true);

    }

    componentWillUnmount() {
        //   BackHandler.removeEventListener('hardwareBackPress', true);
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

        // console.log("openDialogDeliveryMethod >" + this.props.isLoadingSearchBar)
    }


    // getProducts = () => {

    //     this.props.dispatch(fetchProductAction("cornflakes"));
    //     this.fakeApiRequestDelay();

    // }

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


    // fakeSignUpUser = () => {
    //     let firstname = "GENERIC";
    //     let lastname = "GENERIC";
    //     let email = "mike2serg@gmail.com";
    //     let oauth = "GENERIC";
    //     let phoneNumber = "07068181804";

    //     this.props.dispatch(createUser(firstname, lastname, phoneNumber, email, oauth))

    //     console.log("firstname, lastname, email, oauth", firstname, lastname, email, oauth)
    // }

    searchProduct = () => {
       // this.toggleIcon();

      //  this.shouldShowDeliveryModal();



        let query = this.state.searchText;
        if (query !== "") {
            this.openDialogDeliveryMethod();
            this.props.dispatch(fetchProductAction(query));

        }

    }

    handleSearchInput = (text) => {
        this.setState({ searchText: text });
        //console.log(text);
    }


    gotoCheckout = () => {
        this.props.navigation.navigate("Checkout");
        console.log("ScreenSearch : gotoCheckout")
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
                                    {/* <SearchBar showDeliveryModal={true} /> */}
                                    {/* <Button title="Create User (todo) Vons-1" onPress={this.fakeSignUpUser} /> */}
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
            // </KeyboardAvoidingView>
        )
    }
}


const mapStateToProps = state => ({

    //isLoadingSearchBar: state.products.isLoadingSearchBar,
    searchText: state.products.searchText,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup,
    isFirstSearch: state.products.isFirstSearch,
    isLoadingSearchBar: state.products.isLoadingSearchBar,


})

export default connect(mapStateToProps)(ScreenSearch);