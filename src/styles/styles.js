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
        alignItems: "center",
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
        fontSize: 16,
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
        textAlign: "center"
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
        marginBottom: 16,
        width: 26,
        height: 26,
        resizeMode: "contain"
    },

    introSucessImage: {
        marginTop: 40,
        marginBottom: 40,
        width: 150,
        height: 150,
        resizeMode: "contain"
    },

    introCardInput: {
        padding: 10,
        borderWidth: .5,
        borderColor: 'grey',
        borderRadius: 4,
        fontSize: 24,
        color: "#6E6E6E",
        fontFamily: Fonts.JosefinRegular,
        borderStyle: "dashed"
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
    },

    icon: {
        color: "#011627",
        marginBottom: 32
    },

    centerView: {
        alignItems: "center",
    },

    navyBlue: {
        color: "#011627",
        backgroundColor: "#011627"
    },

    red: {
        color: "#EC2434",
        backgroundColor: "#EC2434"
    },
    AppImage: {
        marginTop: 64,
        width: 32,
        height: 32,
        resizeMode: "contain"
    },

    AppMain: {
        backgroundColor: "#F5FCFF",
        height: fullHeight,
        alignItems: "center",
        justifyContent: "space-between",
    },

    AppSearchBar: {
        flexDirection: "row",
        borderRadius: 6,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#6e6e6e',
        shadowOpacity: 1,
        elevation: 5,
        width: fullWidth * 0.85,
        backgroundColor: "#fff",
        justifyContent: "space-between"
    },

    AppSearchBarIcon: {
        // width: 68,
        height: 68,
        padding: 24,
    },

    AppSearchBarTextInput: {
        paddingTop: 24,
        paddingRight: 0,
        paddingBottom: 24,
        paddingLeft: 24,
        fontFamily: Fonts.JosefinRegular,
        fontSize: 18,
        width: 270,
    },

    SearchFirstView: {
        flex: 1,
        alignItems: "center"
    },

    SearchSecondView: {
        flex: 1
    },

    AppDeliveryPickerContainer: {
        borderRadius: 6,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#6e6e6e',
        shadowOpacity: 1,
        elevation: 5,
        width: fullWidth * 0.85,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 16,
        flexDirection: "row"
    },

    DeliveryPickerText: {
        fontFamily: Fonts.JosefinRegular,
        fontSize: 14,
        color: "#6e6e6e",
        paddingTop: 20,
        paddingBottom: 14,
        paddingLeft: 24,
        paddingRight: 24,
    },

    ActiveDeliveryPicker: {
        backgroundColor: "#011627",
        borderRadius: 6,
        margin: 6,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 12
    },

    DeliveryPicker: {
        alignItems: "center",
    },

    ActiveDeliveryPickerText: {
        color: "#fff",
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 24,
        paddingRight: 24,
        fontFamily: Fonts.JosefinRegular,
        fontSize: 14,
    },

    ActiveDeliveryPickerCheckbox: {
        width: 10,
        height: 10,
        backgroundColor: "#8DCC21",
        borderRadius: 10
    },

    AppFilterPickerContainer: {
        backgroundColor: "#D4DDE2",
        padding: 10,
        borderRadius: 4
    },

    AppDeliveryPickerText: {
        fontSize: 10,
        color: "#011627",
        fontFamily: Fonts.JosefinRegular
    },

    AppCardTitle: {
        fontSize: 12,
        fontFamily: Fonts.JosefinSemiBold,
        color: "#011627"
    },

    AppSearchResultHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: fullWidth * 0.85,
        alignItems: "center",
        marginTop: 48,
        marginBottom: 8
    },

    AppSearchResultDisplayContainer: {
        backgroundColor: "#fff",
        // padding: 16,
        width: fullWidth * 0.85,
        borderColor: "#EFEFEF",
        borderWidth: 1,
        borderRadius: 4
    },

    ProductItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: fullWidth * 0.85,
        // marginBottom: 24,
        padding: 24,
        alignItems: "center"
    },

    BottomDrawer: {
        // zIndex: 1000,
        position: "absolute",
        backgroundColor: "#011627",
        width: fullWidth * 0.92,
        bottom: 60,
        // flex: 1,
        // padding: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#6e6e6e',
        shadowOpacity: 1,
        elevation: 5,
        height: 60
    },

    AccordionFull: {
        width: fullWidth * 0.9,
        height: fullHeight * 0.9,
        backgroundColor: "#ff9900"
    },

    QuantityMinus: {
        backgroundColor: "#ec2434",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: "center",
        justifyContent: "center"
    },

    QuantityPlus: {
        backgroundColor: "#ec2434",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: "center",
        justifyContent: "center"
    },

    QuantityHeaderText: {
        color: "#6E6E6E",
        fontFamily: Fonts.JosefinRegular,
        fontSize: 10
    },

    QuantityText: {
        color: "#011627",
        fontSize: 24,
        fontFamily: Fonts.JosefinSemiBold
    },

    QuantityPickerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F5FCFF",
        borderColor: "#ebebeb",
        borderWidth: 1
    },

    QuantitySection: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },

    ProductDetails: {
        flexDirection: "column"
    },

    ProductTitle: {
        fontSize: 16,
        fontFamily: Fonts.JosefinRegular
    },

    ProductPrice: {
        fontSize: 11,
        fontFamily: Fonts.JosefinRegular
    },

    ProductQuantity: {
        fontSize: 12,
        fontFamily: Fonts.JosefinRegular
    },

    AppSearchResultMain: {
        paddingTop: 48
    },

    BottomDrawerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 16,
        paddingRight: 24,
        paddingBottom: 16,
        paddingLeft: 24
    },

    BottomDrawerContent: {
        backgroundColor: "#fff",
        height:fullHeight,
        padding:24
    },
    // BottomDrawerButton: {
    //     backgroundColor: "#efefef",
    //     padding: 4,
    //     borderRadius: 10
    // },

    BottomDrawerHeaderText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    },

    BottomDrawerCount: {
        color: "#011627",
        backgroundColor: "#DEF5FF",
        // padding: 2,
        fontSize: 16,
        fontFamily: Fonts.JosefinBold,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 32,
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },

    BottomDrawerTitle: {
        fontFamily: Fonts.JosefinBold,
        fontSize: 12,
        color: "#fff"

    }
});

export { styles }
