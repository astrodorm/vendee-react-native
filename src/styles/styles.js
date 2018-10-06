import { StyleSheet } from 'react-native';
import { Fonts } from '../util/Fonts';
import { Dimensions } from "react-native";

let fullWidth = Dimensions.get('window').width; //full width
let fullHeight = Dimensions.get('window').height; //full height


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 24,
    },

    introContent: {
        position: 'absolute',
        paddingTop: 72,
        paddingBottom: 48,
        paddingLeft: 48,
        paddingRight: 48,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: fullHeight,
        alignItems:"center",      
    },

    introHeader: {
        color: "#E0F3FF",
        marginTop: 24,
        fontFamily: Fonts.JosefinBold,
        fontSize: 44,
        lineHeight: 50
    },

    introCardHeader: {
        color: "#011627",
        fontFamily: Fonts.JosefinBold,
        fontSize: 36,
        marginTop: 0
    },

    introCardSubtitle: {
        color: "#6E6E6E",
        fontFamily: Fonts.JosefinRegular,
        fontSize: 18,
        marginBottom: 16
    },

    introBackgroundOverlay: {
        width: fullWidth,
        height: fullHeight,
        backgroundColor: '#011627',
        opacity: .9
    },

    introSubtitle: {
        fontSize: 18,
        color: '#E0F3FF',
        fontFamily: Fonts.JosefinRegular,
        marginTop: 24
    },

    introBackgroundImage: {
        position: 'absolute',
    },

    buttonPrimary: {
        backgroundColor: "#EC2434",
        color: "#fff",
        fontSize: 16,
        fontFamily: Fonts.JosefinBold,
        paddingTop: 16,
        paddingBottom: 16,
        textAlign: "center",
        borderRadius: 4,
        width: 300
    },

    buttonSecondary: {
        color: '#fff',
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 12,
        fontFamily: Fonts.JosefinBold,
        textAlign: 'center',
        marginTop: 16,
        textAlign:"center"
    },

    buttonSecondaryLight: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.JosefinBold
    },

    introCards: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10,
        paddingTop: 48,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        width: 320,
        flexDirection: 'column',
        height: 450
    },

    introImage: {
        marginBottom: 4,
        width:26,
        height:26,
        resizeMode:"contain"
    },

    introCardInput: {
        padding: 10,
        borderWidth: .5,
        borderColor: 'grey',
        borderRadius: 4,
        fontSize: 24,
        color: "#6E6E6E",
        fontFamily: Fonts.JosefinThin,
    },

    introCardButton: {
        backgroundColor: "#EC2434",
        padding: 24,
        color: "#fff",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        fontFamily: Fonts.JosefinBold,
        textAlign: "center",
        fontSize: 16
    },

    introCardInputField: {
        marginTop: 64
    }

});

export { styles }
