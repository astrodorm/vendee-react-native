import React, { Component } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import InlineError from '../components/InlineError'



class ScreenProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showEmailError: false,
            showPasswordError: false,
            email: "",
            password: ""

        }
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
        let email = this.state.email;

        //VERIFY PARAMS AND DISPLAY RESPECTIVE ERROR MESSAGE
        this.validateEmail(email) !== true ? this.setState({ showEmailError: true }) : null;
        this.validatePassword() < 1 ? this.setState({ showPasswordError: true }) : null;

        //VALIDATE ALL PARAMS
        this.validateEmail(email) === true && this.validatePassword() > 1 ? this.loginUser() : this.setState({});
    }

    loginUser = () => {
        console.log("logging in user > ", this.state.email)


    }



    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.LoginScreen}>
                        <View>
                            <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />
                            <Text style={styles.introHeader}>Sign In</Text>
                        </View>
                        <View>
                            <TextInput style={styles.loginInput} placeholder="Email" placeholderTextColor={"#fff"} onChangeText={this.handleEmail}></TextInput>
                            {this.state.showEmailError &&
                                <InlineError message="* Invalid Email Address" />
                            }
                        </View>
                        <View>
                            <TextInput style={styles.loginInput} placeholder="Password" placeholderTextColor={"#fff"} onChangeText={this.handlePassword}></TextInput>
                            {this.state.showPasswordError &&
                                <InlineError message="* Invalid Password" />
                            }
                        </View>
                        <ButtonPrimaryAccent title="SIGN IN" icon="login" isActive={true} onSelected={this.validateParams} />
                    </View>
                </View>
            </View>
        );
    }
}

export default ScreenProfile;