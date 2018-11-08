import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Animated, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { createUserAction } from '../actions/actions';
import InlineError from '../components/InlineError';
import * as Progress from 'react-native-progress';


const USER_TOKEN_STORAGE_KEY = "USER_TOKEN";

class ScreenIntro extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }

    componentWillReceiveProps(nextProps) {

        console.log("this.props.isCreateUserSuccess");
        console.log(nextProps.isCreateUserSuccess);
        let userToken = nextProps.user.token;
        nextProps.isCreateUserSuccess === true ? this.storeUserToken(userToken) : null;
    }


    storeUserToken = (token) => {

        //SAVE USER TOKEN
        this.storeData(USER_TOKEN_STORAGE_KEY, token);

        //NAVIGATE TO MAIN APP
        this.animateToSuccessView()
    }


    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            showIntroCards: false,
            showIntroHeader: true,
            showIntroButtons: true,
            showIntroPhoneNumber: true,
            showIntroEmail: false,
            showIntroSuccess: false,
            introStage: 1,
            backgroundColorValue: "rgb(24,43,58)",
            backgroundColorNextValue: "rgb(253,206,159)",
            introButtonText: "SURE THAT'S IT",
            telephone: 0,
            email: null,
            showTelephoneError: false,
            showEmailError: false,
            showSignUpError: false

        }
    }


    sayhi = () => {
        console.log('sayhi')
    }

    gotoSignScreen = () => {
        this.props.navigation.push("Login")
    }

    handleRefHeaderContents = RefHeaderContents => this.RefHeaderContents = RefHeaderContents;
    handleRefButtonContents = RefButtonContents => this.RefButtonContents = RefButtonContents;
    handleRefBackgroundImage = RefBackgroundImage => this.RefBackgroundImage = RefBackgroundImage;
    handleRefIntroPhoneNumber = RefIntroPhoneNumber => this.RefIntroPhoneNumber = RefIntroPhoneNumber;
    handleRefIntroEmail = RefIntroEmail => this.RefIntroEmail = RefIntroEmail;
    handleRefIntroSuccess = RefIntroSuccess => this.RefIntroSuccess = RefIntroSuccess;


    animateToPhoneNumberView = () => {
        this.RefHeaderContents.fadeOutUp(400);
        this.RefButtonContents.fadeOutDown(400);
        this.RefBackgroundImage.fadeOut(600).then(endState => { this.setState({ showIntroCards: true, showIntroHeader: false, showIntroButtons: false }); Animated.timing(this.animatedValue, { toValue: 150, duration: 800 }).start() });
    }

    animateToEmailView = () => {
        this.setState({ backgroundColorValue: "rgb(253,206,159)", backgroundColorNextValue: "rgb(92,131,144)" });
        this.animatedValue = new Animated.Value(0);
        this.RefIntroPhoneNumber.fadeOut(400).then(endState => {
            this.setState({ introStage: 2, showIntroPhoneNumber: false, showIntroEmail: true });

            let introStage = this.state.introStage;
            // console.log("animateToEmailView > introStage : " + introStage);

            Animated.timing(this.animatedValue, { toValue: 255, duration: 800 }).start()
        });
    }


    animateToSuccessView = () => {
        this.setState({ backgroundColorValue: "rgb(92,131,144)", backgroundColorNextValue: "rgb(52,16,35)", introButtonText: "LET'S GO SHOPPING" });
        this.animatedValue = new Animated.Value(0);
        this.RefIntroEmail.fadeOut(400).then(endState => {
            this.setState({ introStage: 3, showIntroEmail: false, showIntroSuccess: true });

            let introStage = this.state.introStage;
            // console.log("animateToEmailView > introStage : " + introStage);

            Animated.timing(this.animatedValue, { toValue: 255, duration: 800 }).start()

        });
    }

    gotoMainAppScreen = () => {
        this.props.navigation.push('MainAppScreen');
    }


    animateIntroButtons = () => {

        let introStage = this.state.introStage;
        console.log("introStage : " + introStage)


        switch (introStage) {
            case 1:
                // this.animateToEmailView();
                this.validateTelephone();
                break;
            case 2:
                // this.animateToSuccessView();
                this.validateEmail()
                break;
            case 3:
                this.gotoMainAppScreen();
                break;
            default:
                this.animateToEmailView();
        }
    }

    handleTelephone = (text) => {
        console.log(text)
        this.setState({ telephone: text, showTelephoneError: false })
    }


    handleEmail = (text) => {
        console.log(text)
        this.setState({ email: text, showEmailError: false })
    }

    validateTelephone = () => {
        let telephone = this.state.telephone;
        let telephoneLength = String(telephone).replace('.', '').length;

        console.log(telephoneLength)

        telephoneLength < 11 ? this.setState({ showTelephoneError: true }) : this.animateToEmailView();
    }


    validateEmail = () => {
        //const isEmail = (email = null) => {

        let email = this.state.email;
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let isValidEmail = regex.test(email);
        isValidEmail === true ? this.SignUpUser() : this.setState({ showEmailError: true })
        // }
    }


    SignUpUser = () => {
        let firstname = "GENERIC";
        let lastname = "GENERIC";
        let email = this.state.email
        let oauth = "GENERIC";
        let phoneNumber = this.state.telephone

        this.props.dispatch(createUserAction(firstname, lastname, phoneNumber, email, oauth))

        console.log("firstname, lastname, phoneNumber, email, oauth", firstname, lastname, phoneNumber, email, oauth)
    }


    // showErrorModal = (message) => {
    //     //SET ERROR MESSAGE
    //     this.setState({ error: message });

    //     //SHOW MODAL FOR ERROR MESSAGES
    //     this.refs.RefIntroModal.open();

    // }

    render() {


        // VARIABLE TO INTERPOLATE COLOR
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: [this.state.backgroundColorValue, this.state.backgroundColorNextValue]
        })


        const animatedStyle = {
            backgroundColor: interpolateColor
        }

        return (
            // <SafeAreaView>
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View>
                        <Animatable.Image ref={this.handleRefBackgroundImage} style={styles.introBackgroundImage} source={require('../../assets/images/bg-main.png')} />
                        <Animated.View style={[styles.introBackgroundOverlay, animatedStyle]} />
                    </View>
                    <View style={styles.introContent}>

                        {/* SHOW CONTENTS ON LOAD */}
                        {
                            this.state.showIntroHeader &&
                            <Animatable.View ref={this.handleRefHeaderContents}>
                                <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />
                                <Text style={styles.introHeader}>We brought it closer to you</Text>
                                <Text style={styles.introSubtitle}>Now Quicker and Cheaper !</Text>
                            </Animatable.View>
                        }
                        {
                            this.state.showIntroButtons &&
                            <Animatable.View ref={this.handleRefButtonContents}>
                                <TouchableOpacity onPress={this.animateToPhoneNumberView}>
                                    <Text style={styles.buttonPrimary}> SIGN UP</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.gotoSignScreen}>
                                    <Text style={styles.buttonSecondary}> SIGN IN </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        }

                        {/* SHOW ONBOARDIND CARDS ON animateToPhoneNumberView PRESSED */}
                        {
                            this.state.showIntroCards &&
                            <Animatable.View >
                                <View style={styles.introCards}>
                                    <View>


                                        {/* PHONE-NUMBER INTRO */}
                                        {this.state.showIntroPhoneNumber &&
                                            <Animatable.View ref={this.handleRefIntroPhoneNumber}>
                                                <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />
                                                <View>
                                                    <Text style={styles.introCardHeader}>Hey,</Text>
                                                    <Text style={styles.introCardHeader}>you look good.</Text>
                                                </View>
                                                <View style={styles.introCardInputField}>
                                                    <Text style={styles.introCardSubtitle}>Can I have your number ?</Text>
                                                    <TextInput onChangeText={this.handleTelephone} style={styles.introCardInput}></TextInput>
                                                </View>
                                                {this.state.showTelephoneError &&
                                                    <InlineError message="* Invalid Phone Number" />
                                                }
                                            </Animatable.View>}


                                        {/* EMAIL INTRO */}
                                        {this.state.showIntroEmail &&
                                            <Animatable.View ref={this.handleRefIntroEmail}>
                                                <Image style={styles.introImage} source={require('../../assets/images/vendee-logo48.png')} />
                                                {/* <Icon name="arrow-left" size={30} style={styles.icon} onPress={this.animateBackToPhoneNumberView} /> */}
                                                <View>
                                                    <Text style={styles.introCardHeader}>Also,</Text>
                                                    <Text style={styles.introCardHeader}>your email too.</Text>
                                                </View>
                                                <View style={styles.introCardInputField}>
                                                    <Text style={styles.introCardSubtitle}>Enter email address here</Text>
                                                    <TextInput onChangeText={this.handleEmail} style={styles.introCardInput}></TextInput>
                                                </View>
                                                {this.state.showEmailError &&
                                                    <InlineError message="* Invalid Email Address" />
                                                }
                                                {
                                                    this.props.isCreatingUser &&
                                                    <View style={styles.inlinePreloader}>
                                                        <Progress.CircleSnail color={['#f44950']} duration={400} size={32} />
                                                    </View>
                                                }
                                                {this.props.isCreateUserError &&
                                                    <InlineError message={this.props.responseMessage} />
                                                }

                                            </Animatable.View>
                                        }

                                        {/* SUCCESS SIGNED UP */}
                                        {this.state.showIntroSuccess &&
                                            <Animatable.View ref={this.handleRefIntroSuccess}>
                                                <View style={styles.centerView}>
                                                    <Image style={styles.introSucessImage} source={require('../../assets/images/icon-good.png')} />
                                                </View>
                                                <View style={styles.centerView}>
                                                    <Text style={styles.introCardHeader}>It's all done.</Text>
                                                </View>
                                            </Animatable.View>
                                        }
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={this.animateIntroButtons}>
                                        <Text style={styles.introCardButton}> {this.state.introButtonText}</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        }
                    </View>
                </View>
                {/* <View> */}
                <Modal
                    style={[styles.modal]}
                    position={"center"}
                    ref={"RefIntroModal"}
                    backdrop={true}
                    swipeToClose={false}
                    backdropColor={"#0D284A"}
                    backdropOpacity={0.5}
                >
                    <View>
                        <Text style={styles.modalHeader}> Oops !! </Text>
                        {/* <Text>{this.state.error}</Text> */}
                    </View>
                </Modal>
                {/* </View> */}
            </View>
            // </SafeAreaView>
        )
    }

}

//export default ScreenIntro;


const mapStateToProps = state => ({

    responseMessage: state.users.responseMessage,
    user: state.users.user,
    isCreateUserError: state.users.isCreateUserError,
    isCreateUserSuccess: state.users.isCreateUserSuccess,
    isCreatingUser: state.users.isCreatingUser

})

export default connect(mapStateToProps)(ScreenIntro);