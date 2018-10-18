import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Button, Animated, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
// import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';


class ScreenIntro extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
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
            introButtonText: "SURE THAT'S IT"

        }
    }


    //NAVIGATION OPTIONS
    // static navigationOptions = {
    //     header: null
    // }


    sayhi = () => {
        console.log('sayhi')
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
            console.log("animateToEmailView > introStage : " + introStage);

            Animated.timing(this.animatedValue, { toValue: 255, duration: 800 }).start()
        });
    }

    // FAILS TO RETURN TO EMAIL VIEW AFTER GOING BACK
    // animateBackToPhoneNumberView = () => {
    //     this.RefIntroEmail.fadeOut(400).then(endState => {
    //         this.setState({ introStage: 1, showIntroEmail: false, showIntroPhoneNumber: true });

    //         let introStage = this.state.introStage;
    //         console.log("animateToEmailView > introStage : " + introStage);
    //     });
    // }

    animateToSuccessView = () => {
        this.setState({ backgroundColorValue: "rgb(92,131,144)", backgroundColorNextValue: "rgb(52,16,35)", introButtonText: "LET'S GO SHOPPING" });
        this.animatedValue = new Animated.Value(0);
        this.RefIntroEmail.fadeOut(400).then(endState => {
            this.setState({ introStage: 3, showIntroEmail: false, showIntroSuccess: true });

            let introStage = this.state.introStage;
            console.log("animateToEmailView > introStage : " + introStage);

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
                this.animateToEmailView();
                break;
            case 2:
                this.animateToSuccessView();
                break;
            case 3:
                this.gotoMainAppScreen();
                break;
            default:
                this.animateToEmailView();
        }
    }


    //DEAFULT RENDER
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
            <SafeAreaView>
                <View>
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
                                <TouchableOpacity onPress={this.animateToPhoneNumberView}>
                                    <Text style={styles.buttonSecondary}> SIGN IN </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        }

                        {/* SHOW ONBOARDIND CARDS ON animateToPhoneNumberView PRESSED */}
                        {
                            this.state.showIntroCards &&
                            <Animatable.View >
                                {/* <Text style={styles.introHeader}> CARDS HERE</Text> */}
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
                                                    <TextInput style={styles.introCardInput}></TextInput>
                                                </View>
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
                                                    <TextInput style={styles.introCardInput}></TextInput>
                                                </View>
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
            </SafeAreaView>
        )
    }

}

export default ScreenIntro;
