import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { styles } from '../styles/styles';


class CategoryList extends Component {

    constructor(props) {
        super(props)

        this.state = {

            categories: [
                { id: "1", categoryName: "Fruits" },
                { id: "2", categoryName: "Biscuits" },
                { id: "3", categoryName: "Gadgets" },
                { id: "4", categoryName: "Snacks" },
                { id: "5", categoryName: "Fruits" },
                { id: "6", categoryName: "Biscuits" },
                { id: "7", categoryName: "Gadgets" },
                { id: "8", categoryName: "Snacks" },
                { id: "9", categoryName: "Fruits" },
                { id: "10", categoryName: "Biscuits" },
                { id: "11", categoryName: "Gadgets" },
                { id: "12", categoryName: "Snacks" },
                { id: "13", categoryName: "Fruits" },
                { id: "14", categoryName: "Biscuits" },
                { id: "15", categoryName: "Gadgets" },
                { id: "16", categoryName: "Snacks" }
            ]

        }
    }

    _renderCategoriesListItem = ({ item }) => (

        <TouchableOpacity>
            <Text style={styles.CategoryItem}>{item.categoryName}</Text>
        </TouchableOpacity>
    );


    render() {
        return (
            <View>
                <Text style={styles.AppCardHeader}>All Categories</Text>
                <View style={styles.headingDivider}></View>
                <ScrollView contentContainerStyle={styles.scrollview} scrollEnabled={true}>
                    <FlatList
                        data={this.state.categories}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                        renderItem={this._renderCategoriesListItem}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default CategoryList;