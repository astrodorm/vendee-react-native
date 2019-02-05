import React, { Component } from 'react';
import { Text, View, Image, TextInput, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { styles } from '../styles/styles';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import InlineError from '../components/InlineError';
import { connect } from 'react-redux';
import { loginAction } from '../actions/actions';
import * as Progress from 'react-native-progress';


const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";
const EMAIL_STORAGE_KEY = "EMAIL";
const PHONE_STORAGE_KEY = "PHONE";

class ScreenProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showEmailError: false,
            showPasswordError: false,
            email: "",
            password: "",
            isVisibleLoginError: false,
            loginErrorMessage: false

        }
    }


    storeUserCredentials = (userToken) => {

        let emailAddress = this.state.email;

        //SAVE USER TOKEN
        this.storeData(USER_TOKEN_STORAGE_KEY, userToken);

        //SAVE USER TOKEN
        this.storeData(EMAIL_STORAGE_KEY, emailAddress);

        //NAVIGATE TO MAIN APP
        this.navigateToMainApp()
    }


    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
        }
    }

    navigateToMainApp = () => {
        this.props.navigation.push('MainAppScreen');
    }

    handleEmail = (text) => {
        this.setState({ email: text, showEmailError: false })
    }

    handlePassword = (text) => {
        this.setState({ password: text, showPasswordError: false })
    }

    validateEmail = (email) => {

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValidEmail = regex.test(email);

        return isValidEmail
    }

    validatePassword = () => {
        let password = this.state.password;
        let passwordLength = String(password).replace('.', '').length;

        return passwordLength
    }

    validateParams = () => {

        //HIDE ERROR MESSAGE
        this.hideLoginError()

        let email = this.state.email;

        //VERIFY PARAMS AND DISPLAY RESPECTIVE ERROR MESSAGE
        this.validateEmail(email) !== true ? this.setState({ showEmailError: true }) : null;
        this.validatePassword() < 1 ? this.setState({ showPasswordError: true }) : null;

        //VALIDATE ALL PARAMS
        this.validateEmail(email) === true && this.validatePassword() > 1 ? this.loginUser() : null;
    }

    loginUser = () => {

        let email = this.state.email;
        let oauth = this.state.password;

        this.props.dispatch(loginAction(email, oauth)).then(res => {

            let userToken = res.data.data.token

            this.storeUserCredentials(userToken)


        }).catch(err => {

            this.showLoginError()
        });

    }

    showLoginError = () => {
        this.setState({ loginErrorMessage: this.props.loginResponse.message, isVisibleLoginError: true })
    }

    hideLoginError = () => {
        this.setState({ isVisibleLoginError: false })
    }



    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', }} behavior="padding">
                <View style={styles.AppContainer}>
                    <View style={styles.AppMain}>
                        <View style={styles.LoginScreen}>
                            <View>
                                <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />
                                <Text style={styles.introHeader}>Sign In</Text>
                            </View>
                            <View>
                                <TextInput style={styles.loginInput} placeholder="Email" placeholderTextColor={"#fff"} onChangeText={this.handleEmail} keyboardType="email-address"></TextInput>
                                {this.state.showEmailError &&
                                    <InlineError message="* Invalid Email Address" />
                                }
                            </View>
                            <View>
                                <TextInput style={styles.loginInput} placeholder="Password" placeholderTextColor={"#fff"} onChangeText={this.handlePassword} secureTextEntry={true}></TextInput>
                                {this.state.showPasswordError &&
                                    <InlineError message="* Invalid Password" />
                                }
                            </View>
                            {
                                this.props.isSigningInUser &&
                                <View style={styles.inlinePreloader}>
                                    <Progress.CircleSnail color={['#f44950']} duration={400} size={24} />
                                </View>
                            }
                            {this.state.isVisibleLoginError &&
                                <InlineError message={this.state.loginErrorMessage} />
                            }
                            <ButtonPrimaryAccent title="SIGN IN" icon="login" isActive={true} onSelected={this.validateParams} />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}


const mapStateToProps = state => ({

    responseMessage: state.users.responseMessage,
    user: state.users.user,
    isLoginUserError: state.users.isLoginUserError,
    isLoginUserSuccess: state.users.isLoginUserSuccess,
    isSigningInUser: state.users.isSigningInUser,
    loginResponse: state.users.loginResponse,


})

export default connect(mapStateToProps)(ScreenProfile);