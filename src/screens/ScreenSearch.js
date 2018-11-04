import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { styles } from '../styles/styles';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { connect } from 'react-redux';
import { fetchProductAction, endfetchProductAction, selectDeliveryMethod, createUser } from '../actions/actions';
import Modal from 'react-native-modalbox';
import ButtonSecondaryAccent from '../components/ButtonSecondaryAccent';



class ScreenSearch extends Component {


    componentWillReceiveProps(nextProps) {

        console.log("nextProps.isFirstSearch");
        console.log(nextProps.isFirstSearch);

        this.props.isFirstSearch === true ? this.openDialogDeliveryMethod() : null;
    }

    constructor(props) {
        super(props);

        this.state = {
            showSearchResultView: false,
            showSearchBarView: true,
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
        this.props.dispatch(selectDeliveryMethod(true, false));
        this.showSearchResult();

    }

    selectPickup = () => {
        this.props.dispatch(selectDeliveryMethod(false, true));
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
                        <View>
                            <View style={styles.SearchFirstView}>
                                <Image style={styles.AppImage} source={require('../../assets/images/vendee-logo-grey.png')} />
                            </View>
                            <View style={styles.SearchSecondView}>
                                <SearchBar />
                                {/* <Button title="Create User (todo) Vons-1" onPress={this.fakeSignUpUser} /> */}
                            </View>
                        </View>
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

    //isLoadingSearchBar: state.products.isLoadingSearchBar,
    searchText: state.products.searchText,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup,
    isFirstSearch: state.products.isFirstSearch

})

export default connect(mapStateToProps)(ScreenSearch);