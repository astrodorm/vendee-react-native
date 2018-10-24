import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../styles/styles';
import { connect } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../actions/actions'


class CounterComponent extends Component {

    increment = () => {
        this.props.dispatch(incrementQuantity())
        console.log("increment called")
    }


    decrement = () => {
        this.props.dispatch(decrementQuantity())
    }


    render() {
        return (
            <View>
                <Button onPress={this.increment} title="UP"></Button>
                <Text style={styles.introCardSubtitle}> {this.props.count} </Text>
                <Button onPress={this.decrement} title="DOWN"></Button>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    count: state.products.count
})

export default connect(mapStateToProps)(CounterComponent);