import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import ButtonIconPrimaryAccent from '../components/ButtonIconPrimaryAccent';
import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
import { connect } from 'react-redux';
import { toggleAddModalTelephoneManager } from '../actions/actions';




class TelephoneManager extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    addTelephone = () => {

        console.log("addTelephone");
        this.props.dispatch(toggleAddModalTelephoneManager(true));

    }


    render() {
        return (
            <View>
                <View style={styles.ActionInputContainer}>
                    <Text style={styles.AccordionContent}>0706 818 1804</Text>
                    <ButtonIconPrimaryAccent icon="edit" isActive={false} />
                    {
                        this.props.isCheckboxVisible &&
                        <ButtonIconPrimaryAccent icon="check" isActive={true} />
                    }
                </View>
                <ButtonPrimaryAccent title="ADD TELEPHONE" icon="form" isActive={false} onSelected={this.addTelephone} />
            </View>
        )
    }

}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(TelephoneManager);