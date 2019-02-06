import React, { Component } from 'react';
import { Text, View, ScrollView, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import CardShoppingList from '../components/CardShoppingList';
import { connect } from 'react-redux';
import { fetchListAction } from '../actions/actions';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modalbox';
import * as Progress from 'react-native-progress';




const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";
const BASE_THUMBNAIL_URL = "https://api.yourvendee.com/upload";
const DEMO_THUMBNAIL_PATH = "/opt/undefined/public/upload/c7a4686e-e20f-44c5-9959-502b5a6cebf8.jpeg"



class ScreenShoppingList extends Component {

    componentDidMount() {

        //RETRIEVE AND SET PASSWORD
        this.retrieveAndUserTokenData(USER_TOKEN_STORAGE_KEY);

    }


    constructor(props) {
        super(props)

        this.state = {
            showCheckoutMessage: true,
            showPlaceOrderComponent: false,
            userToken: "",
            isLoadingText: true,
            isAccountRequired: false,
            isVisbleShoppingList: false
        }
    }

    retrieveAndUserTokenData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ userToken: value });
                this.refreshList();
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    getTodaysDate = (date) => {
        return moment(date).calendar();
    }


    refreshList = () => {

        this.setState({ isAccountRequired: false });
        this.setState({ isVisbleShoppingList: false })

        let userToken = this.state.userToken;

        if (userToken === "null") {
            this.showAccountRequiredError();
            this.setState({ isLoadingText: false })


        } else {

            this.props.dispatch(fetchListAction(userToken)).then(res => {

                this.setState({ isLoadingText: false });
                this.setState({ isVisbleShoppingList: true })
            }).catch(err => {

                this.setState({ isLoadingText: false });
                this.setState({ isVisbleShoppingList: false })
                this.showShoppingListError();
                console.log(err);

            });

        }

    }

    showAccountRequiredError = () => {

        this.setState({ isAccountRequired: true });

    }

    showShoppingListError = () => {

    }


    showPreloader = () => {
        this.refs.RefModalPreloader.open()
    }

    hidePreloader = () => {
        this.refs.RefModalPreloader.close()
    }

    getParcelID = (id) => {
        let parcelID = id.slice(18);
        return parcelID
    }

    getMerchantNameAddress = (deliveryMethod) => {
        let merchantNameAddress = "";
        deliveryMethod === "PICKUP" ? merchantNameAddress = "At: Mattoris Supermarket - 25 Alh. Mudashiru Eletu Way, Lekki Penninsula II, Lagos" : merchantNameAddress = "By: Vendee";
        return merchantNameAddress;
    }

    gotoSignScreen = () => {
        this.props.navigation.push("Login");
    }

    gotoIntroScreen = () => {
        this.props.navigation.push("Intro");
    }


    _renderShoppingList = ({ item }) => (

        <CardShoppingList relativeTime={this.getTodaysDate(item.createdAt)} productsArray={item.productID} shippingMethod={item.deliveryMethod} merchantNameAddress={this.getMerchantNameAddress(item.deliveryMethod)} orderStatus={item.status} parcelID={this.getParcelID(item._id)} />

    );


    render() {
        return (

            <View style={styles.AppContainer}>

                <View style={styles.AppMain}>
                    <View style={styles.shoppingListMainContainer}>
                        <View style={styles.AppCardHeaderContainer}>
                            <Text style={styles.AppCardHeader}>Shopping List</Text>
                            <TouchableOpacity onPress={this.refreshList}>
                                <Icon name="reload1" size={22} color="#6e6e6e" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headingDivider}></View>
                        <View>
                            {this.state.isLoadingText &&
                                <Text>Loading ...</Text>
                            }
                            {this.state.isAccountRequired &&

                                <View>
                                    <Text>You need an account to use this feature</Text>
                                    <TouchableOpacity style={styles.tabbedButton} onPress={() => this.gotoIntroScreen()}>
                                        <Text style={styles.tabbedButtonText}>CREATE AN ACCOUNT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.tabbedButton} onPress={() => this.gotoSignScreen()}>
                                        <Text style={styles.tabbedButtonText}>LOGIN</Text>
                                    </TouchableOpacity>
                                </View>

                            }

                            {
                                this.state.isVisbleShoppingList &&
                                <ScrollView>
                                    <FlatList
                                        data={this.props.shoppingList}
                                        extraData={this.props}
                                        keyExtractor={item => item._id}
                                        renderItem={this._renderShoppingList}
                                    />
                                </ScrollView>
                            }

                        </View>
                    </View>
                </View>
                <Modal
                    style={[styles.modalPreloader]}
                    position={"center"}
                    ref={"RefModalPreloader"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                    backdropPressToClose={false}
                >
                    <Progress.CircleSnail color={['#f44950', '#FFB76F', '#00316E']} duration={400} size={32} />

                </Modal>

            </View>


        )
    }
}



const mapStateToProps = state => ({

    fetchListResponse: state.lists.fetchListResponse,
    shoppingList: state.lists.shoppingList

})

export default connect(mapStateToProps)(ScreenShoppingList);