import React, { Component } from 'react';
import { View } from 'react-native';
import ButtonPrimaryAccent from './ButtonPrimaryAccent';
import { toggleUpdateModalPasswordManager } from '../actions/actions';
import { connect } from 'react-redux';


class PasswordManager extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    addPassword = () => {

        console.log("addPassword");
        this.props.dispatch(toggleUpdateModalPasswordManager(true));

    }


    render() {
        return (
            <View>
                <ButtonPrimaryAccent title="UPDATE PASSWORD" icon="form" isActive={false} onSelected={this.addPassword} />
            </View>
        )
    }

}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(PasswordManager);