import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';


class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

        }
    }

    fetchSearchResult = () => {

        let isLoadingState = true;
        this.setState({isLoading: isLoadingState});

    }

    render() {
        return (
            <View style={styles.AppSearchBar}>
                <TextInput style={styles.AppSearchBarTextInput} placeholder="What would you buy today ?"></TextInput>
                <TouchableOpacity onPress={() => this.fetchSearchResult()}>

            { !this.state.isLoading &&
                    <Icon style={styles.AppSearchBarIcon} name="right" size={24} color="#f44950" />
            }

            { this.state.isLoading &&
                    <Progress.CircleSnail style={styles.AppSearchBarIcon} color={['#f44950', '#FFB76F', '#00316E']} duration={400} size={32} />
            }
                </TouchableOpacity>
            </View>
        )
    }
}

export default SearchBar;
