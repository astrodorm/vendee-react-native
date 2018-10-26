import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';


const SearchBar = (props) => {

    return (
        <View style={styles.AppSearchBar}>
        <TextInput style={styles.AppSearchBarTextInput} placeholder="What would you buy today ?"></TextInput>
        <TouchableOpacity onPress={() => props.onFetchProduct()}>

            {!props.isLoadingSearchBar &&
                <Icon style={styles.AppSearchBarIcon} name="right" size={24} color="#f44950" />
            }

            {props.isLoadingSearchBar &&
                <Progress.CircleSnail style={styles.AppSearchBarIcon} color={['#f44950', '#FFB76F', '#00316E']} duration={400} size={32} />
            }
        </TouchableOpacity>
    </View>
    )
}

export default SearchBar;