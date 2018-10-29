import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import ShoppingListProduct from '../components/ShoppingListProduct'

const CardShoppingList = (props) => {

    return (
        <View style={styles.CardShoppingListContainer}>
            <View style={styles.CardShoppingListHeader}>
                <View>
                    <Text style={styles.CardShoppingListTitle}>Just Now</Text>
                    <Text style={styles.CardShoppingListTime}>3 mins ago</Text>
                </View>
                <View>
                    <Text style={styles.CardShoppingListStatus}>PROCESSING</Text>
                </View>
            </View>
            <View style={styles.CardShoppingListProductContainer}>
                <ShoppingListProduct thumbnail="http://oja.ng/wp-content/uploads/2018/05/nasco-corn-flakes-350g.jpg" title="Nasco Cornflakes 150g" price={2345} quantity={5} />
                <ShoppingListProduct thumbnail="http://oja.ng/wp-content/uploads/2018/05/nasco-corn-flakes-350g.jpg" title="Nasco Cornflakes 70g" price={2345} quantity={5} />
            </View>
        </View>
    )
}

export default CardShoppingList;