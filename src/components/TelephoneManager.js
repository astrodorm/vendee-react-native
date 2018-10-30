import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonIconPrimaryAccent from '../components/ButtonIconPrimaryAccent';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';


const TelephoneManager = (props) => {

    return (
        <View>
            <View style={styles.ActionInputContainer}>
                <Text style={styles.AccordionContent}>0706 818 1804</Text>
                <ButtonIconPrimaryAccent icon="edit" isActive={false} />
                {
                    props.isCheckboxVisible &&
                    <ButtonIconPrimaryAccent icon="check" isActive={true} />
                }
            </View>
            <ButtonPrimaryAccent title="ADD TELEPHONE" icon="form" isActive={false} onSelected={this.AddAdress} />
        </View>
    )
}

export default TelephoneManager;