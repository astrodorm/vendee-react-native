import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Button, TouchableWithoutFeedback } from 'react-native'
import { styles } from '../styles/styles'
// import ButtonPrimary from '../components/ButtonPrimary'
// import ButtonSecondary from '../components/ButtonSecondary'
import * as Animatable from 'react-native-animatable';


class ScreenIntro extends Component {

    //NAVIGATION OPTIONS
    static navigationOptions = {
        header: null
    }


    sayhi = () => {
        console.log('sayhi')
    }

    RefHeaderContents = ref => this.RefHeaderContents = ref;
    RefButtonContents = ref => this.RefButtonContents = ref;
    RefBackgroundImage = ref => this.RefBackgroundImage = ref;


    animateToPhoneNumberView = () => {
        this.RefHeaderContents.fadeOutUp(800);
        this.RefButtonContents.fadeOutDown(800);
        this.RefBackgroundImage.fadeOut(2000);
    }



    //DEAFULT RENDER
    render() {
        return (
            <SafeAreaView>
                <View>
                    <View>
                        <Animatable.Image ref={this.RefBackgroundImage} style={styles.introBackgroundImage} source={require('../../assets/images/bg-main.png')} />
                        <View style={styles.introBackgroundOverlay} />
                    </View>
                    <View style={styles.introContent}>
                        <Animatable.View ref={this.RefHeaderContents}>
                            <Image source={require('../../assets/images/vendee-logo24.png')} />
                            <Text style={styles.introHeader}>We brought it closer to you</Text>
                            <Text style={styles.introSubtitle}>Now Quicker and Cheaper !</Text>
                        </Animatable.View>
                        <Animatable.View ref={this.RefButtonContents}>
                            <Button color={styles.buttonPrimary.backgroundColor} onPress={this.animateToPhoneNumberView} title="SIGN UP"></Button>
                            <Text onPress={this.animateToPhoneNumberView} style={styles.buttonSecondary}>SIGN IN</Text>
                        </Animatable.View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

}

export default ScreenIntro;
