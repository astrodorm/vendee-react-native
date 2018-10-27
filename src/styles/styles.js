import { StyleSheet } from 'react-native';
import { Fonts } from '../util/Fonts';
import { Dimensions } from "react-native";

let fullWidth = Dimensions.get('window').width; //full width
let fullHeight = Dimensions.get('window').height; //full height
let redTheme = "#F44950";
let lightRedTheme = "#F7868A"
let navyBlueTheme1 = "#0D284A";
let navyBlueTheme2 = "#011627";
let skyBlueTheme = "#F5FCFF";
let GrayDarkTheme = "#6E6E6E";
let GrayDarkThemeBtnBg = "#EFEFEF";
let GrayDarkThemeBtnBorder = "#D9D9D9";
let PeachTheme = "#FFDDBB";
let greenTheme = "#8DCC21";
let lightGrayTheme = "#D4DDE2";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: skyBlueTheme,
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
        color: skyBlueTheme,
        marginTop: 24,
        fontFamily: Fonts.JosefinBold,
        fontSize: 44,
        lineHeight: 50
    },

    introCardHeader: {
        color: navyBlueTheme2,
        fontFamily: Fonts.JosefinBold,
        fontSize: 36,
        marginTop: 0
    },

    introCardSubtitle: {
        color: GrayDarkTheme,
        fontFamily: Fonts.JosefinRegular,
        fontSize: 16,
        marginBottom: 16
    },

    introBackgroundOverlay: {
        width: fullWidth,
        height: fullHeight,
        backgroundColor: navyBlueTheme2,
        opacity: .9
    },

    introSubtitle: {
        fontSize: 18,
        color: skyBlueTheme,
        fontFamily: Fonts.JosefinRegular,
        marginTop: 24
    },

    introBackgroundImage: {
        position: 'absolute',
    },

    buttonPrimary: {
        backgroundColor: redTheme,
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
        color: GrayDarkTheme,
        fontFamily: Fonts.JosefinRegular,
        borderStyle: "dashed"
    },

    introCardButton: {
        backgroundColor: redTheme,
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
        color: navyBlueTheme1,
        marginBottom: 32
    },

    centerView: {
        alignItems: "center",
    },

    AppImage: {
        marginTop: 32,
        width: 32,
        height: 32,
        resizeMode: "contain"
    },

    AppMain: {
        backgroundColor: skyBlueTheme,
        height: fullHeight,
        alignItems: "center",
        justifyContent: "space-between",
    },

    AppSearchBar: {
        flexDirection: "row",
        borderRadius: 6,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: GrayDarkTheme,
        shadowOpacity: 1,
        elevation: 5,
        width: fullWidth * 0.85,
        backgroundColor: "#fff",
        justifyContent: "space-between"
    },

    AppSearchBarIcon: {

        marginTop: 24,
        marginRight: 24,

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
        shadowColor: GrayDarkTheme,
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
        fontSize: 12,
        color: GrayDarkTheme,
    },

    ActiveDeliveryPicker: {
        backgroundColor: navyBlueTheme1,
        borderRadius: 6,
    },

    DeliveryPicker: {
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 24,
        margin: 8,
        borderRadius: 6,
    },

    ActiveDeliveryPickerText: {
        color: "#fff",

    },

    DeliveryPickerCheckbox: {
        width: 10,
        height: 10,
        backgroundColor: lightGrayTheme,
        borderRadius: 10,
        marginRight: 16
    },

    ActiveDeliveryPickerCheckbox: {
        backgroundColor: greenTheme,
    },

    AppFilterPickerContainer: {
        backgroundColor: lightGrayTheme,
        padding: 10,
        borderRadius: 4
    },

    AppDeliveryPickerText: {
        fontSize: 10,
        color: navyBlueTheme2,
        fontFamily: Fonts.JosefinRegular
    },

    AppCardTitle: {
        fontSize: 12,
        fontFamily: Fonts.JosefinSemiBold,
        color: navyBlueTheme2
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
        width: fullWidth * 0.85,
        borderColor: "#EFEFEF",
        borderWidth: 1,
        borderRadius: 4
    },

    ProductItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: fullWidth * 0.85,
        padding: 24,
        alignItems: "center"
    },

    BottomDrawer: {

    },

    AddProductText: {
        fontSize: 13,
        fontFamily: Fonts.JosefinBold,
        color: "#fff",
        paddingTop: 1,
        borderRadius: 30,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: navyBlueTheme1,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 0,
        textShadowColor: "#fff",

    },

    AddProductSelected: {
        backgroundColor: navyBlueTheme1,
        borderWidth: 2,
        borderColor: navyBlueTheme1,
    },

    AddProductUnselected: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: navyBlueTheme1,
    },

    FBtnShoppingListContainer: {
        position: "absolute",
        elevation: 5,
        height: 80,
        width: fullWidth * 0.7,
        bottom: 80,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,

    },

    FBtnQuantityPickerContainer: {
        position: "absolute",
        elevation: 5,
        height: 80,
        width: fullWidth * 0.7,
        bottom: 80,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,

    },

    FBtnShoppingListQuantityPickerContainer: {
        position: "absolute",
        elevation: 5,
        height: 80,
        width: fullWidth * 0.7,
        bottom: 80,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,

    },

    QuantityBtn: {
        backgroundColor: lightRedTheme,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40
    },

    shoppingListRemoveBtn: {
        backgroundColor: navyBlueTheme1,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40
    },

    QuantityText: {
        color: "#fff",
        fontSize: 25,
        fontFamily: Fonts.JosefinSemiBold,
        marginTop: 0,
        marginBottom: 4,
    },

    QuantityPickerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: skyBlueTheme,
        borderColor: "#ebebeb",
        borderWidth: 1,
        alignItems: "center"
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
        fontFamily: Fonts.JosefinRegular,
        letterSpacing:1
    },

    ProductQuantity: {
        fontSize: 12,
        fontFamily: Fonts.JosefinRegular
    },

    AppSearchResultMain: {
        paddingTop: 48
    },


    FBtnShoppingList: {
        backgroundColor: redTheme,
        flexDirection: "row",
        width: fullWidth * 0.6,
        alignItems: "center",
        padding: 16,
        borderRadius: 100,
        justifyContent: "space-between",
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#6e6e6e',
        shadowOpacity: 1,
    },

    FBtnQuantityPicker: {
        backgroundColor: redTheme,
        flexDirection: "row",
        width: fullWidth * 0.75,
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        justifyContent: "space-between",
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#6e6e6e',
        shadowOpacity: 1,
    },



    FBtnCount: {
        color: navyBlueTheme2,
        backgroundColor: PeachTheme,
        fontSize: 16,
        fontFamily: Fonts.JosefinBold,
        borderRadius: 32,
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },

    FBtnText: {
        fontSize: 16,
        color: navyBlueTheme1,
        fontFamily: Fonts.JosefinSemiBold
    },

    FBtnIcon: {
        color: PeachTheme
    },

    shoppingListModalContainer: {
        width: fullWidth,
        backgroundColor: "#fff",
        height: 600,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 0,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: "center"
    },

    shoppingListLabel: {
        fontFamily: Fonts.JosefinBold,
        fontSize: 24,
        color: navyBlueTheme1,
        marginBottom: 8,
        marginTop: 0
    },

    AppContainer: {
        width: fullWidth
    },

    MenuPrimaryButton: {
        backgroundColor: redTheme,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 24,
        paddingLeft: 24,
        borderRadius: 6,
        flexDirection: "row",
        marginRight: 16
    },

    MenuDefaultButton: {
        backgroundColor: "#EFEFEF",
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 24,
        paddingLeft: 24,
        borderRadius: 6,
        flexDirection: "row"
    },

    shoppingListOptions: {
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    MenuPrimaryText: {
        color: "#fff",
        fontSize: 12,
        fontFamily: Fonts.JosefinBold,
        marginLeft: 8
    },

    MenuDefaultButtonText: {
        color: redTheme,
        fontSize: 11,
        fontFamily: Fonts.JosefinBold,
        marginLeft: 8
    },

    shoppingListDetails: {
        flexDirection: "row",
    },

    shoppingListAmountDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 8
    },

    shoppingListDetailsLabel: {
        fontFamily: Fonts.JosefinRegular,
        color: GrayDarkTheme,
        fontSize: 12,
        marginRight: 16
    },

    shoppingListDetailsPrice: {
        fontFamily: Fonts.JosefinRegular,
        color: GrayDarkTheme,
        fontSize: 12,

    },

    shoppingListDetailsBoldLabel: {
        color: navyBlueTheme1,
        fontSize: 12,
        fontFamily: Fonts.JosefinBold,
        marginRight: 16
    },

    shoppingListDetailsBoldPrice: {
        color: navyBlueTheme1,
        fontSize: 12,
        fontFamily: Fonts.JosefinBold,
    },

    shoppingListAmountsContainer: {
        paddingTop: 8,
        justifyContent: "flex-end",
        marginBottom: 8

    },

    ShoppingListCouponContainer: {
        flex: 1
    },

    savedAmount: {
        color: greenTheme,
        fontSize: 11,
        fontFamily: Fonts.JosefinBold,
        textAlign: "right",
    },

    shoppingListHeader: {
        justifyContent: "center",
        alignItems: "center",
    },

    modalDeliveryMethod: {
        width: fullWidth * 0.9,
        backgroundColor: "#fff",
        zIndex: 1000,
        height: 300,
        paddingTop: 32,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        borderRadius: 16
    },

    modalDeliveryMethodHeader: {
        color: navyBlueTheme1,
        fontFamily: Fonts.JosefinSemiBold,
        fontSize: 22,
        marginBottom: 32

    },

    ButtonSecondaryAccent: {
        backgroundColor: GrayDarkThemeBtnBg,
        borderWidth: 0,
        borderRadius: 6,
        flexDirection: "row",
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        marginBottom: 16,
    },

    ButtonSecondaryAccentActive: {
        backgroundColor: navyBlueTheme1,
    },

    ButtonSecondaryAccentActiveText: {
        color: greenTheme,
    },

    ButtonSecondaryAccentIcon: {
        marginRight: 24
    },

    ButtonSecondaryAccentText: {
        color: navyBlueTheme1,
        fontFamily: Fonts.JosefinSemiBold,
        fontSize: 14
    }
});

export { styles }
