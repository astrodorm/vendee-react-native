import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Button, TouchableOpacity } from 'react-native'
import { styles } from '../styles/styles'
import ButtonPrimary from '../components/ButtonPrimary'
import ButtonSecondary from '../components/ButtonSecondary'


class ScreenIntro extends Component {

    //NAVIGATION OPTIONS
    static navigationOptions = {
        header: null
    }


    sayhi = () =>{
        console.log('sayhi')
    }


    //DEAFULT RENDER
    render() {
        return (
            <SafeAreaView>
                <View>
                    <View>
                        <Image style={styles.introBackgroundImage} source={require('../../assets/images/bg-main.png')} />
                        <View style={styles.introBackgroundOverlay} />
                    </View>
                    <View style={styles.introContent}>
                        <View>
                            <Image source={require('../../assets/images/vendee-logo24.png')} />
                            <Text style={styles.introHeader}>We brought it closer to you</Text>
                            <Text style={styles.introSubtitle}>Now Quicker and Cheaper !</Text>
                        </View>
                        <View>
                            <ButtonPrimary/>
                            <ButtonSecondary/>
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        )
    }

}

export default ScreenIntro;
