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
    },

    introHeader: {
        color: "#E0F3FF",
        marginTop: 24,
        fontFamily: Fonts.JosefinBold,
        fontSize: 44,
        lineHeight: 50
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
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },

    buttonSecondary: {
        color: '#EC2434',
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
        fontFamily: Fonts.JosefinBold,
        textAlign: 'center',
        marginTop: 16
    },

    buttonSecondaryLight: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.JosefinBold
    },

    introCards: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: fullHeight,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10
    }

});

export { styles }
