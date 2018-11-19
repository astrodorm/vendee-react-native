import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList, Button } from "react-native";
import Modal from 'react-native-modalbox';
import { styles } from '../styles/styles';



class NewScreenCategory extends Component {



    openModal = () => {
        this.refs.RefTest.open()
    }

    closeModal = () => {
        this.refs.RefTest.close()
    }

    render() {
        return (
            <View>
                <Button title="OPEN MODAL" onPress={this.openModal}></Button>
                <Button title="CLOSE MODAL" onPress={this.closeModal}></Button>
                <View>
                    <Modal
                        style={[styles.modal]}
                        position={"bottom"}
                        ref={"RefTest"}
                        backdrop={true}
                        swipeToClose={false}
                        backdropColor={"#0D284A"}
                        backdropOpacity={0.5}
                    >
                        <Text>TEST MODAL</Text>
                        <Text>TEST MODAL</Text>
                        <Text>TEST MODAL</Text>
                        {/* <Button onPress={() => this.refs.RefTest.close()} style={styles.btn} title="CLOSE MODAL"></Button> */}


                    </Modal>
                </View>

            </View>
        )
    }


}

export default NewScreenCategory;