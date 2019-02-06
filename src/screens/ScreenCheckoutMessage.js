import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';
import { isFirstFetchStartedAction } from '../actions/actions';
import { connect } from 'react-redux';


class ScreenCheckout extends Component {


    constructor(props) {
        super(props)

    }

    gotoHome = () => {
        this.props.dispatch(isFirstFetchStartedAction(false))
        this.props.navigation.push('MainAppScreen');
    }


    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.AppCheckOutMessage}>
                        <View style={styles.introCards}>
                            <View style={styles.centerView}>
                                <Image style={styles.introSucessImage} source={require('../../assets/images/icon-good.png')} />
                            </View>
                            <View style={styles.centerView}>
                                <Text style={styles.introCardHeader}>Success !!</Text>
                                <Text style={styles.introCardSubtitle}>You just purchased an item from Mattoris Supermarket.</Text>
                                <Text style={styles.introCardSubtitle}>To view all orders, click on the 'Go Home' button and then on the Shopping List Icon.</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.gotoHome()}>
                                <Text style={styles.introCardButton}> GO HOME </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({


})

export default connect(mapStateToProps)(ScreenCheckout);