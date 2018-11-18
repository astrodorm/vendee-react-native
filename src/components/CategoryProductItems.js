import React, { Component } from 'react';
import { Text, View } from "react-native";


class CategoryProductItems extends Component {


    render() {
        return (
            <View>
                <Icon style={styles.navigationButton} name="arrowleft" size={24} color="#0D284A" onPress={() => this.goBack()} />
                <Text style={styles.AppCardHeader}>{this.props.categoryName}</Text>
                <Text>{this.props.categoryItemID}</Text>
                <Text>Category product item 1</Text>
                <Text>Category product item 1</Text>
            </View>
        )
    }
}

export default CategoryProductItems;