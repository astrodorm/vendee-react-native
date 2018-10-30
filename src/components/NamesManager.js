import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import ButtonIconPrimaryAccent from '../components/ButtonIconPrimaryAccent';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';


const NamesManager = (props) => {

    return (
        <View>
            <View style={styles.ActionInputContainer}>
                <Text style={styles.AccordionContent}>Timmy Micky</Text>
                <ButtonIconPrimaryAccent icon="edit" isActive={false} />
                {
                    props.isCheckboxVisible &&
                    <ButtonIconPrimaryAccent icon="check" isActive={true} />
                }
            </View>
            <ButtonPrimaryAccent title="ADD ADDRESS" icon="form" isActive={false} onSelected={this.AddAdress} />
        </View>
    )
}

export default NamesManager;