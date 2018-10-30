import React, { Component } from 'react';
import { styles } from '../styles/styles';
import Icon, { Button } from 'react-native-vector-icons/AntDesign';
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
            height: 3000,
            bottom: 3000,
        },
        to: {
            height: 800,
            bottom: 800
        }
    }
});




class BottomDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCloseBottomDrawer: true
        }
    }


    handleRefBottomDrawer = ref => this.RefBottomDrawer = ref;

    animateBottomDrawer = () => {

        let bottomDrawerState = this.state.isCloseBottomDrawer;
        console.log("bottomDrawerState : isCloseBottomDrawer > " + bottomDrawerState)

        bottomDrawerState ? this.openBottomDrawer() : this.closeBottomDrawer();
    }

    openBottomDrawer = () => {
        this.RefBottomDrawer.slideOutUp(400);
        this.setState({ isCloseBottomDrawer: false });
        console.log("openBottomDrawer")
    }

    closeBottomDrawer = () => {
        this.RefBottomDrawer.slideOutUp(400);
        this.setState({ isCloseBottomDrawer: true });
        console.log("closeBottomDrawer")
    }


    render() {

        return (
            <Animatable.View ref={this.handleRefBottomDrawer}>
                <View style={styles.BottomDrawerHeader}>
                    <View style={styles.BottomDrawerHeaderText}>
                        <Text style={styles.BottomDrawerTitle}>SHOPPING LIST</Text>
                        <Text style={styles.BottomDrawerCount}>5</Text>
                    </View>

                    <Icon name="upcircleo" size={22} color="#fff" onPress={() => this.animateBottomDrawer()} />
                    {this.state.isCloseBottomDrawer &&
                        <Button title='button here' onPress={() => this.animateBottomDrawer()} />
                    }

                </View>
                <View style={styles.BottomDrawerContent}>
                    <Text>
                        Shopping List Here
                    </Text>
                    {!this.state.isCloseBottomDrawer &&
                        <Button title='button here' onPress={() => this.animateBottomDrawer()} />
                    }
                </View>
            </Animatable.View>

        )
    }
}

export default BottomDrawer