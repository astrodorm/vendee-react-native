import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Button, Animated, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../styles/styles'
// import ButtonPrimary from '../components/ButtonPrimary'
// import ButtonSecondary from '../components/ButtonSecondary'
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
        }
    }


    //NAVIGATION OPTIONS
    static navigationOptions = {
        header: null
    }


    sayhi = () => {
        console.log('sayhi')
    }

    RefHeaderContents = RefHeaderContents => this.RefHeaderContents = RefHeaderContents;
    RefButtonContents = RefButtonContents => this.RefButtonContents = RefButtonContents;
    RefBackgroundImage = RefBackgroundImage => this.RefBackgroundImage = RefBackgroundImage;


    animateToPhoneNumberView = () => {
        this.RefHeaderContents.fadeOutUp(400);
        this.RefButtonContents.fadeOutDown(400);
        this.RefBackgroundImage.fadeOut(600).then(endState => { this.setState({ showIntroCards: true, showIntroHeader: false, showIntroButtons: false }); Animated.timing(this.animatedValue, { toValue: 150, duration: 1200 }).start() });
    }


    //DEAFULT RENDER
    render() {


        // VARIABLE TO INTERPOLATE COLOR
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgb(24,43,58)', 'rgb(255,221,187)']
        })


        const animatedStyle = {
            backgroundColor: interpolateColor
        }

        return (
            <SafeAreaView>
                <View>
                    <View>
                        <Animatable.Image ref={this.RefBackgroundImage} style={styles.introBackgroundImage} source={require('../../assets/images/bg-main.png')} />
                        <Animated.View style={[styles.introBackgroundOverlay, animatedStyle]} />
                    </View>
                    <View style={styles.introContent}>

                        {/* SHOW CONTENTS ON LOAD */}
                        {this.state.showIntroHeader &&
                            <Animatable.View ref={this.RefHeaderContents}>
                                <Image source={require('../../assets/images/vendee-logo24.png')} />
                                <Text style={styles.introHeader}>We brought it closer to you</Text>
                                <Text style={styles.introSubtitle}>Now Quicker and Cheaper !</Text>
                            </Animatable.View>}
                        {this.state.showIntroButtons &&
                            <Animatable.View ref={this.RefButtonContents}>
                                {/* <View> */}
                                <TouchableOpacity onPress={this.animateToPhoneNumberView}>
                                    <Text style={styles.buttonPrimary}> SIGN UP</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.animateToPhoneNumberView}>
                                    <Text style={styles.buttonSecondary}> SIGN IN </Text>
                                </TouchableOpacity>
                                {/* </View> */}
                                {/* <Button color={styles.buttonPrimary.backgroundColor} width={styles.buttonPrimary.width} onPress={this.animateToPhoneNumberView} title="SIGN UP"></Button> */}
                                {/* <Text onPress={this.animateToPhoneNumberView} style={styles.buttonSecondary}>SIGN IN</Text> */}
                            </Animatable.View>
                        }

                        {/* SHOW ONBOARDIND CARDS ON animateToPhoneNumberView PRESSED */}
                        {
                            this.state.showIntroCards &&
                            <Animatable.View >
                                {/* <Text style={styles.introHeader}> CARDS HERE</Text> */}
                                <View style={styles.introCards}>
                                    <View>
                                        <Image style={styles.introCardImage} source={require('../../assets/images/vendee-logo24.png')} />
                                        <View>
                                            <Text style={styles.introCardHeader}>Hey,</Text>
                                            <Text style={styles.introCardHeader}>you look good.</Text>
                                        </View>
                                        <View style={styles.introCardInputField}>
                                            <Text style={styles.introCardSubtitle}>Can I have your number ?</Text>
                                            <TextInput style={styles.introCardInput}></TextInput>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity>
                                        <Text style={styles.introCardButton}> SURE, THAT'S IT</Text>
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
