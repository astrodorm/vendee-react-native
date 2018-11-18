import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import CategoryProductItems from '../components/CategoryProductItems';
import CategoryList from "../components/CategoryList";
import { styles } from '../styles/styles';
import { connect } from 'react-redux';
import { fetchCategoryListAction } from '../actions/actions';
import Icon from 'react-native-vector-icons/AntDesign';



class ScreenCategory extends Component {

    componentDidMount() {

        // this.props.dispatch(fetchCategoryListAction()).then(res => {

        //     console.log(res);

        // });
    }

    constructor(props) {
        super(props);

        this.state = {

            showCategoryProductItemsView: false,
            showCategoryListView: true,
            selectedCategoryItemID: 0,
            selectedCategoryName: "",
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

        <TouchableOpacity onPress={() => this.setStateSelectedCategoryItem(item.id, item.categoryName)}>
            <Text style={styles.CategoryItem}>{item.categoryName}</Text>
        </TouchableOpacity>
    );


    setStateSelectedCategoryItem = (id, categoryName) => {

        this.setState({ selectedCategoryItemID: id, selectedCategoryName: categoryName });
        this.showCategoryProducts()
    }

    showCategoryProducts = () => {

        this.setState({ showCategoryProductItemsView: true, showCategoryListView: false })

    }

    showCategories = () => {

        this.setState({ showCategoryProductItemsView: false, showCategoryListView: true })

    }

    render() {
        return (
            <View style={styles.AppContainer}>
                <View style={styles.AppMain}>
                    <View style={styles.AppCardContainer}>
                        <View style={styles.AppCard}>

                            {/* CATEGORY LIST VIEW */}

                            {
                                this.state.showCategoryListView &&

                                <View>
                                    {/* <CategoryList/> */}
                                    <Text style={styles.AppCardHeader}>All Categories</Text>
                                    <View style={styles.headingDivider}></View>
                                    <ScrollView contentContainerStyle={styles.scrollViewfullHeight} scrollEnabled={true}>
                                        <FlatList
                                            data={this.state.categories}
                                            extraData={this.state}
                                            keyExtractor={item => item.id}
                                            renderItem={this._renderCategoriesListItem}
                                        />
                                    </ScrollView>
                                </View>
                            }

                            {/* CATEGORY PRODUCT ITEMS VIEW */}

                            {
                                this.state.showCategoryProductItemsView &&
                                <View>
                                    {/* <CategoryProductItems categoryItemID={this.state.selectedCategoryItemID} categoryName={this.state.selectedCategoryName}/> */}
                                    <Icon style={styles.navigationButton} name="arrowleft" size={24} color="#0D284A" onPress={() => this.showCategories()} />
                                    <Text style={styles.AppCardHeader}>{this.state.selectedCategoryName}</Text>
                                    <View style={styles.headingDivider}></View>
                                    <Text>{this.state.selectedCategoryItemID}</Text>
                                </View>
                                // <View></View>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

//export default ScreenCategory;

const mapStateToProps = state => ({

    categories: state.products.newCategories,

})

export default connect(mapStateToProps)(ScreenCategory);