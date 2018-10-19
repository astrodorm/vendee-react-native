import React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../styles/styles'

const AvatarProduct = (props) => {

    return (
        <View>
            <Image style={styles.ProductImage} source={require('../../assets/images/nasco-corn-flakes-350g.png')} />
        </View>
    )
}

export default AvatarProduct;