import React, { Component } from 'react';
import { View, AsyncStorage, Image } from 'react-native';
import { styles } from '../styles/styles';
import { fetchFeesAction } from '../actions/actions';
import { connect } from 'react-redux';
import InlineError from '../components/InlineError';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';




const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";


class ScreenCategory extends Component {


    componentDidMount() {

        this.fetchFees();



    }


    constructor(props) {
        super(props);

        this.state = {
            isVisibleFeesError: false
        }
    }

    fetchFees = () => {

        this.hideFeesError();

        this.props.dispatch(fetchFeesAction()).then(res => {
            console.log(res);
            this.hideFeesError();
            this.retrieveAndSetUserTokenBoolean(USER_TOKEN_STORAGE_KEY);

        }).catch(err => {
            console.log("err");
            console.log(err);
            this.showFeesError();

        });

    }

    showFeesError = () => {
        this.setState({ isVisibleFeesError: true })
    }

    hideFeesError = () => {
        this.setState({ isVisibleFeesError: false })
    }

    navigateToMainApp = () => {

        setTimeout(() => {
            this.props.navigation.navigate("MainAppScreen");
        }, 2000);
    }

    navigateToIntro = () => {

        setTimeout(() => {
            this.props.navigation.navigate("Intro");
        }, 2000);
    }


    retrieveAndSetUserTokenBoolean = async (storageKey) => {

        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {

                this.navigateToMainApp();

            } else {

                this.navigateToIntro();

            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }

    }


    render() {
        return (
            <View style={styles.screensplash}>
                <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />
                <View style={styles.headingDivider}></View>
                {this.state.isVisibleFeesError &&
                    <View>
                        <InlineError message={"Unable to Connect. Try Again"} />
                        <View style={styles.headingDivider}></View>
                        <ButtonPrimaryAccent title="RETRY" icon="reload1" isActive={true} onSelected={this.fetchFees} />
                    </View>
                }
            </View>
        )
    }
}


const mapStateToProps = state => ({


})

export default connect(mapStateToProps)(ScreenCategory);