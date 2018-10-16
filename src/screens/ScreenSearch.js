import React, { Component } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';


class ScreenSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSearchResultView: false,
            ShowSearchView: true,
        }
    }


    render() {

        return (
            <View style={styles.AppMain}>

                {/* SEARCH INITIAL VIEW */}
                TODO: ADD BOOLEAN TO VIEWS
                <View>
                    <View style={styles.SearchFirstView}>
                        <Image style={styles.AppImage} source={require('../../assets/images/vendee-logo-grey.png')} />
                    </View>
                    <View style={styles.SearchSecondView}>
                        <SearchBar />
                    </View>
                </View>

                {/* SEARCH RESULT */}
                <View>
                    <SearchResult />
                </View>

            </View>
        )
    }
}

export default ScreenSearch;