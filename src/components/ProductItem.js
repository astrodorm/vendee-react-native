// import React, { Component } from 'react';
// import { Text, View, Image } from 'react-native';
// import { styles } from '../styles/styles';

// class ProductItem extends Component {



//     AddProduct = (id, quantity) => {
//         console.log("productItem :  id > " + id + "quanitity > " + quantity)
//     }

//     render() {
//         return (
//             <View style={styles.ProductItem}>
//                 <Image style={styles.ProductImage} source={props.thumbnail} />
//                 <View style={styles.ProductDetails}>
//                     <Text style={styles.ProductTitle}>{props.title}</Text>
//                     <Text style={styles.ProductPrice}> NGN {props.price}  </Text>
//                 </View>
//                 <TouchableOpacity onPress={() => this.AddProduct(item.id, item.quantity)}>
//                     <Text style={[styles.AddProductText, item.isSelected ? styles.AddProductSelected : styles.AddProductUnselected]}>
//                         {item.quantity}
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }

// }

// export default ProductItem;



import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles'

const ProductItem = (props) => {

    return (
        <View style={styles.ProductItem}>
            <Image style={styles.ProductImage} source={{ uri: props.thumbnail }} style={{ width: 50, height: 50 }} />
            <View style={styles.ProductDetails}>
                <Text style={styles.ProductTitle}>{props.title}</Text>
                <Text style={styles.ProductPrice}> NGN {props.price}  </Text>
            </View>
            <TouchableOpacity onPress={() => props.onSelectItem()}>
                {/* <Text style={[styles.AddProductText]}>
                    {props.quantity}
                </Text> */}
                <Text style={[styles.AddProductText, props.isAdded ? styles.AddProductSelected : styles.AddProductUnselected]}>
                    {props.quantity}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductItem;