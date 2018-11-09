import React, { Component } from 'react';
import { Text, View, ScrollView, Button, AsyncStorage } from 'react-native';
import { styles } from '../styles/styles';
import CardShoppingList from '../components/CardShoppingList';
import { connect } from 'react-redux';
import { fetchListAction } from '../actions/actions';
import moment from 'moment';


const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";
const BASE_THUMBNAIL_URL = "https://api.yourvendee.com/upload";
const DEMO_THUMBNAIL_PATH = "/opt/undefined/public/upload/c7a4686e-e20f-44c5-9959-502b5a6cebf8.jpeg"



class ScreenShoppingList extends Component {

    componentDidMount() {

        //RETRIEVE AND SET PASSWORD
        this.retrieveAndUserTokenData(USER_TOKEN_STORAGE_KEY)




        console.log("ShoppingList page")
    }



    constructor(props) {
        super(props)

        this.state = {
            showCheckoutMessage: true,
            showPlaceOrderComponent: false,
            userToken: ""
        }
    }

    retrieveAndUserTokenData = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.setState({ userToken: value })
                console.log("retrievedToken");
                console.log(value);

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

        let userToken = this.state.userToken;
        console.log("userToken");
        console.log(userToken)

        console.log("getTodaysDate");
        console.log(this.getTodaysDate())

        this.props.dispatch(fetchListAction(userToken)).then(res => {
            console.log(res)
        });
    }


    render() {
        return (

            <View style={styles.AppContainer}>
                <ScrollView>
                    <View style={styles.AppMain}>
                        <View style={styles.shoppingListMainContainer}>
                            {/* <Button title='How you dey ?' onPress={this.refreshList}></Button> */}
                            <Text style={styles.AppCardHeader}>Shopping List</Text>
                            <View>
                                <CardShoppingList relativeTime={this.getTodaysDate()} thumbnail={BASE_THUMBNAIL_URL + DEMO_THUMBNAIL_PATH} title="Indomie Instant Noodles Onion Chicken - 70g" price={3450} quantity={8} orderStatus="PENDING" />
                                <CardShoppingList relativeTime={this.getTodaysDate()} thumbnail={BASE_THUMBNAIL_URL + DEMO_THUMBNAIL_PATH} title="Demo Kellogs" price={3450} quantity={8} orderStatus="PENDING" />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>


        )
    }
}

//export default ScreenShoppingList;

const mapStateToProps = state => ({


})

export default connect(mapStateToProps)(ScreenShoppingList);