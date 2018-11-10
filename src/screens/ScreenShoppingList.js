import React, { Component } from 'react';
import { Text, View, ScrollView, Button, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';
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
            isLoadingText: true
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

    getTodaysDate = () => {
        return moment("2018-11-08T21:24:06.011Z").calendar();
    }



    placeOrder = () => {
        console.log("placeOrder")
    }

    refreshList = () => {

        //this.showPreloader();

        let userToken = this.state.userToken;

        this.props.dispatch(fetchListAction(userToken)).then(res => {
            console.log(res);

            this.setState({ isLoadingText: false })
        });

        console.log("this.props.shoppingList");
        console.log(this.props.shoppingList);
    }


    showPreloader = () => {
        this.refs.RefModalPreloader.open()
    }

    hidePreloader = () => {
        this.refs.RefModalPreloader.close()
    }


    _renderShoppingListItem = ({ item }) => (

        // <ShoppingListItem key={item.id} thumbnail={BASE_THUMBNAIL_URL + item.thumbnail} title={item.title} price={item.price} isAdded={true} quantity={item.quantity} onSelectItem={() => this.onSelectShoppingListItem(item.id, item.quantity)} />
        <CardShoppingList relativeTime={this.getTodaysDate(item.createdAt)} thumbnail={BASE_THUMBNAIL_URL + item.productID[0].thumbnail} title={item.productID[0].productName} price={item.productID[0].price} quantity={item.productID[0].quantity} orderStatus={item.status} />

    );


    render() {
        return (

            <View style={styles.AppContainer}>

                <View style={styles.AppMain}>
                    <View style={styles.shoppingListMainContainer}>
                        {/* <Button title='How you dey ?' onPress={this.refreshList}></Button> */}
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
                            <ScrollView>
                                <FlatList
                                    data={this.props.shoppingList}
                                    extraData={this.props}
                                    keyExtractor={item => item._id}
                                    renderItem={this._renderShoppingListItem}
                                />
                            </ScrollView>
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
                // onClosed={this.setManagersVisibility}
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