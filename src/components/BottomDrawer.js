import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';


Animatable.initializeRegistryWithDefinitions({
    animateOpenDrawer: {
        from: {
            height: 80,
            bottom: 80,
        },
        to: {
            height: 300,
            bottom: 300
        }
    },
    animateCloseDrawer: {
        from: {
            height: 300,
            bottom: 300,
        },
        to: {
            height: 80,
            bottom: 80
        }
    }
});




class BottomDrawer extends Component {

    handleRefBottomDrawer = ref => this.RefBottomDrawer = ref;
    // RefHeaderContents = RefHeaderContents => this.RefHeaderContents = RefHeaderContents;

    openBottomDrawer = () => {
        // this.RefBottomDrawer.transitionTo({ height: 300, bottom:300 });
        //this.RefBottomDrawer.slideOutUp(400);
        this.RefBottomDrawer.animate('animateOpenDrawer', 1000)

    }





    render() {

        return (

            <Animatable.View ref={this.handleRefBottomDrawer}>
                <TouchableOpacity onPress={() => this.RefBottomDrawer.animate('animateOpenDrawer', 1000)}>
                    <View style={styles.BottomDrawerHeader}>
                        <View style={styles.BottomDrawerHeaderText}>
                            <Text style={styles.BottomDrawerTitle}>SHOPPING LIST</Text>
                            <Text style={styles.BottomDrawerCount}>5</Text>
                        </View>
                        <Icon name="upcircleo" size={22} color="#fff" />
                    </View>
                </TouchableOpacity>
                <View style={styles.BottomDrawerContent}>
                    <Text>
                        Shopping List Here
                    </Text>
                </View>
            </Animatable.View>

        )
    }
}

export default BottomDrawer