import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from '../styles/styles';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { connect } from 'react-redux';
import { fetchProductAction, endfetchProductAction, selectDeliveryMethod } from '../actions/actions';
import Modal from 'react-native-modalbox';
import ButtonSecondaryAccent from '../components/ButtonSecondaryAccent';



class ScreenSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSearchResultView: false,
            showSearchBarView: true,
        }
    }


    openDialogDeliveryMethod = () => {
        this.refs.RefModalDeliveryMethod.open();

        console.log("openDialogDeliveryMethod >" + this.props.isLoadingSearchBar)
    }


    getProducts = () => {

        this.props.dispatch(fetchProductAction("cornflakes"));
        this.fakeApiRequestDelay();

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
        this.props.dispatch(selectDeliveryMethod(true, false));
        this.showSearchResult();

    }

    selectPickup = () => {
        this.props.dispatch(selectDeliveryMethod(false, true));
        this.showSearchResult();
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
                        <View>
                            <View style={styles.SearchFirstView}>
                                <Image style={styles.AppImage} source={require('../../assets/images/vendee-logo-grey.png')} />
                            </View>
                            <View style={styles.SearchSecondView}>
                                <SearchBar isLoadingSearchBar={this.props.isLoadingSearchBar} onFetchProduct={this.getProducts} />
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
                    style={[styles.modal, styles.modalDeliveryMethod]}
                    position={"center"}
                    ref={"RefModalDeliveryMethod"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
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

    isLoadingSearchBar: state.products.isLoadingSearchBar,
    searchText: state.products.searchText,
    isDelivery: state.delivery.isDelivery,
    isPickup: state.delivery.isPickup

})

export default connect(mapStateToProps)(ScreenSearch);