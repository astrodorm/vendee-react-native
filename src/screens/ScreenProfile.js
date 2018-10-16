import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class ScreenProfile extends Component {


    //NAVIGATION OPTIONS
    static navigationOptions = {
        header: null
    }


    render() {
        return (
            <View>
                <Text>
                    This is the ScreenProfile view
                    <Icon name="airplay" size={30} color="#900" />
                </Text>
            </View>
        )
    }
}

export default ScreenProfile;