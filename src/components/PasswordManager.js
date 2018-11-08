import React, { Component} from 'react';
import { View } from 'react-native';
import ButtonPrimaryAccent from './ButtonPrimaryAccent';
import { toggleUpdateModalPasswordManager } from '../actions/actions';
import { connect } from 'react-redux';

// const PasswordManager = (props) => {

//     return (
//         <View>
//             <ButtonPrimaryAccent title="UPDATE PASSWORD" icon="form" isActive={false} onSelected={this.AddAdress} />
//         </View>
//     )
// }

// export default PasswordManager;




// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import { styles } from '../styles/styles';
// import ButtonIconPrimaryAccent from '../components/ButtonIconPrimaryAccent';
// import ButtonPrimaryAccent from '../components/ButtonPrimaryAccent';
// import { connect } from 'react-redux';
// import { toggleAddModalTelephoneManager } from '../actions/actions';




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