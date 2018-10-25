import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../styles/styles';
import { connect } from 'react-redux';
import { itemIncrementAction, decrementItem } from '../actions/actions'


class CounterComponent extends Component {

    increment = () => {
        this.props.dispatch(itemIncrementAction())
        console.log("increment called")
    }


    decrement = () => {
        this.props.dispatch(decrementItem())
    }


    render() {
        return (
            <View>
                <Button onPress={this.increment} title="UP"></Button>
                <Text style={styles.introCardSubtitle}> {this.props.selectProductID} </Text>
                <Button onPress={this.decrement} title="DOWN"></Button>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    count: state.products.count,
    selectProductID : state.products.selectProductID
})

export default connect(mapStateToProps)(CounterComponent);