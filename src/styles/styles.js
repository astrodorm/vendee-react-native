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
let brightBlue = "#1779C7";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: skyBlueTheme,
        marginTop: 24,
    },


    introContent: {
        position: 'absolute',
        paddingTop: 32,
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
        fontFamily: Fonts.MPLUSMedium,
        fontSize: 42,
        lineHeight: 50
    },

    introCardHeader: {
        color: navyBlueTheme2,
        fontFamily: Fonts.MPLUSBold,
        fontSize: 36,
        marginTop: 0
    },

    introCardSubtitle: {
        color: GrayDarkTheme,
        fontFamily: Fonts.MPLUSRegular,
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
        fontSize: 16,
        color: skyBlueTheme,
        fontFamily: Fonts.MPLUSRegular,
        marginTop: 24
    },

    introBackgroundImage: {
        position: 'absolute',
    },

    buttonPrimary: {
        backgroundColor: redTheme,
        color: "#fff",
        fontSize: 16,
        fontFamily: Fonts.MPLUSMedium,
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
        fontFamily: Fonts.MPLUSMedium,
        textAlign: 'center',
        marginTop: 16,
        textAlign: "center"
    },

    buttonSecondaryLight: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.MPLUSMedium
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
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 6,
        fontSize: 24,
        color: GrayDarkTheme,
        fontFamily: Fonts.MPLUSRegular,
        // borderStyle: "dashed"
    },

    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 4,
        fontSize: 18,
        color: GrayDarkTheme,
        fontFamily: Fonts.MPLUSRegular,
        marginBottom: 8
        // borderStyle: "dashed"
    },

    introCardButton: {
        backgroundColor: redTheme,
        padding: 24,
        color: "#fff",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        fontFamily: Fonts.MPLUSMedium,
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
        width: fullWidth * 0.9,
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
        fontFamily: Fonts.MPLUSRegular,
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
        width: fullWidth * 0.9,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 16,
        flexDirection: "row"
    },

    DeliveryPickerText: {
        fontFamily: Fonts.MPLUSRegular,
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
        fontFamily: Fonts.MPLUSRegular
    },

    AppCardTitle: {
        fontSize: 12,
        fontFamily: Fonts.MPLUSMedium,
        color: navyBlueTheme2,
        padding: 16
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
        width: fullWidth * 0.9,
        borderColor: "#EFEFEF",
        borderWidth: 1,
        borderRadius: 4
    },

    ProductItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: fullWidth * 0.9,
        padding: 24,
        alignItems: "center"
    },

    CardShoppingProductItem: {
        flexDirection: "row",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8

    },

    BottomDrawer: {

    },

    AddProductText: {
        fontSize: 13,
        fontFamily: Fonts.MPLUSMedium,
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
        fontFamily: Fonts.MPLUSMedium,
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
        flexDirection: "column",
        marginLeft: 16,
        marginRight: 16,
        flex: 6
    },

    AddProductTextContainer: {
        flex: 1
    },

    ProductImage: {
        // marginRight: 16
        flex: 1
    },

    CardShoppingProductDetails: {
        // marginLeft: 16,
        flex: 3,
        marginLeft: 16,
        minWidth: 180
    },

    ProductTitle: {
        fontSize: 16,
        fontFamily: Fonts.MPLUSRegular,
        color: "#424242",
        marginBottom: 4,
        // minWidth:220,
        // height:"auto"
    },

    productSubtitle: {
        fontSize: 10,
        fontFamily: Fonts.MPLUSRegular,
        letterSpacing: 1,
        color: "#424242"
    },

    ProductQuantity: {
        fontSize: 12,
        fontFamily: Fonts.MPLUSRegular
    },

    AppSearchResultMain: {
        paddingTop: 18
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
        fontFamily: Fonts.MPLUSMedium,
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
        fontFamily: Fonts.MPLUSMedium
    },

    FBtnIcon: {
        color: PeachTheme
    },

    shoppingListModalContainer: {
        width: fullWidth,
        backgroundColor: "#fff",
        height: fullHeight,
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        paddingTop: 0,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: "center"
    },

    shoppingListLabel: {
        fontFamily: Fonts.MPLUSBold,
        fontSize: 24,
        color: navyBlueTheme1,
        marginBottom: 16,
        marginTop: 16
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
        fontFamily: Fonts.MPLUSMedium,
        marginLeft: 8
    },

    MenuDefaultButtonText: {
        color: redTheme,
        fontSize: 11,
        fontFamily: Fonts.MPLUSMedium,
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
        fontFamily: Fonts.MPLUSRegular,
        color: GrayDarkTheme,
        fontSize: 12,
        marginRight: 16
    },

    shoppingListDetailsPrice: {
        fontFamily: Fonts.MPLUSRegular,
        color: GrayDarkTheme,
        fontSize: 12,
        letterSpacing: 1

    },

    shoppingListDetailsBoldLabel: {
        color: navyBlueTheme1,
        fontSize: 12,
        fontFamily: Fonts.MPLUSMedium,
        marginRight: 16
    },

    shoppingListDetailsBoldPrice: {
        color: navyBlueTheme1,
        fontSize: 12,
        fontFamily: Fonts.MPLUSMedium,
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
        fontFamily: Fonts.MPLUSMedium,
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

    modalCheckout: {
        width: fullWidth * 0.9,
        backgroundColor: "#fff",
        zIndex: 1000,
        height: 400,
        paddingTop: 32,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        borderRadius: 16,
        justifyContent: "center",
        //alignItems: "center"
    },


    modalPreloader: {
        width: 50,
        backgroundColor: "#fff",
        zIndex: 1000,
        height: 50,
        // padding: 24,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

    },

    modalCheckoutContent: {
        flexDirection: "column",
        justifyContent: "space-between"
    },


    modal: {
        width: fullWidth * 0.9,
        backgroundColor: "#fff",
        // zIndex: 1000,
        height: 300,
        paddingTop: 32,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        borderRadius: 16,
        // elevation:100
    },

    modalDeliveryMethodHeader: {
        color: navyBlueTheme1,
        fontFamily: Fonts.MPLUSMedium,
        fontSize: 22,
        marginBottom: 32
    },

    modalHeader: {
        color: navyBlueTheme1,
        fontFamily: Fonts.MPLUSMedium,
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

    ButtonPrimaryAccent: {
        backgroundColor: GrayDarkThemeBtnBg,
        borderWidth: 0,
        borderRadius: 6,
        flexDirection: "row",
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        marginBottom: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    ButtonPrimaryAccentActive: {
        backgroundColor: redTheme,
    },

    ButtonSecondaryAccentActive: {
        backgroundColor: navyBlueTheme1,
    },

    ButtonSecondaryAccentActiveText: {
        color: greenTheme,
    },

    ButtonPrimaryAccentActiveText: {
        color: "#fff",
        fontFamily: Fonts.MPLUSMedium
    },

    ButtonSecondaryAccentIcon: {
        marginRight: 24
    },

    ButtonPrimaryAccentIcon: {
        marginRight: 24
    },

    ButtonIconPrimaryAccentIcon: {
        marginRight: 0
    },

    ButtonSecondaryAccentText: {
        color: navyBlueTheme1,
        fontFamily: Fonts.MPLUSMedium,
        fontSize: 14
    },

    ButtonPrimaryAccentText: {
        color: redTheme,
        fontFamily: Fonts.MPLUSMedium,
        fontSize: 14
    },

    AppCard: {
        backgroundColor: "#fff",
        marginTop: 24,
        padding: 24,
        width: fullWidth * 0.9,
        borderColor: "#EFEFEF",
        borderWidth: .5,
        borderRadius: 10,
    },

    CategoryAppCard: {
        backgroundColor: "#fff",
        marginTop: 24,
        width: fullWidth * 0.9,
        borderColor: "#EFEFEF",
        borderWidth: .5,
        borderRadius: 10,
    },

    cardPadding: {
        padding: 24
    },

    AppCardHeader: {
        fontFamily: Fonts.MPLUSMedium,
        fontSize: 28,
        color: navyBlueTheme1,
        // marginBottom: 28
    },

    headingDivider: {
        marginBottom: 24
    },

    ShoppingListHeader: {
        fontFamily: Fonts.MPLUSMedium,
        fontSize: 24,
        color: navyBlueTheme1,
        marginBottom: 24,
        marginTop: 24
    },

    AccordionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 8,
        paddingRight: 8,
    },

    AccordionHeaderTitle: {
        fontSize: 18,
        fontFamily: Fonts.MPLUSMedium,
    },

    AccordionContent: {
        fontSize: 16,
        fontFamily: Fonts.MPLUSRegular,
        // width: 200,
        marginRight: 16
    },

    AccordionHeaderSubtitle: {
        fontSize: 12,
        fontFamily: Fonts.MPLUSRegular,
        color: GrayDarkTheme
    },

    PlaceOrderBtnContainer: {
        position: "absolute",
        padding: 24,
        backgroundColor: "#efefef",
        width: fullWidth * 0.9,
        bottom: 0
    },

    CardShoppingListHeader: {
        paddingTop: 0,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 0
    },

    CardShoppingListContainer: {
        width: fullWidth * 0.95,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: "column"
    },

    CardShoppingListTitle: {
        color: navyBlueTheme1,
        fontSize: 20,
        fontFamily: Fonts.MPLUSMedium
    },

    CardShoppingListTime: {
        color: GrayDarkTheme,
        fontSize: 12,
        fontFamily: Fonts.MPLUSRegular,
        letterSpacing: 1
    },

    CardShoppingListStatus: {
        fontFamily: Fonts.MPLUSMedium,
        fontSize: 10,
        backgroundColor: PeachTheme,
        borderRadius: 4,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        color: navyBlueTheme1,
        letterSpacing: 1,
        // minWidth:100,
    },


    parcelID: {
        fontFamily: Fonts.MPLUSBold,
        fontSize: 10,
        backgroundColor: GrayDarkTheme,
        borderRadius: 4,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        color: "#fff",
        letterSpacing: 1,
        // minWidth:100,
    },

    cardShoppingListStatusContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        minWidth: 100
    },

    CardShoppingListProductContainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderColor: "#efefef",
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: "row"
    },

    CardShoppingProductImage: {
        //marginRight: 32,
        flex: 1
    },
    // AppCardContent: {
    //     height:fullHeight
    // }

    AppCardContainer: {
        height: fullHeight * 1.5
    },

    ActionInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 6,
        fontSize: 24,
        color: GrayDarkTheme,
        fontFamily: Fonts.MPLUSRegular,
        flex: 2
    },

    ActionInputContainer: {
        flexDirection: "row",
        marginBottom: 16
    },

    ButtonIconPrimaryAccent: {
        backgroundColor: GrayDarkThemeBtnBg,
        borderWidth: 0,
        borderRadius: 6,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 16,

    },

    cardIcon: {
        // marginBottom: 8,
        width: 26,
        marginBottom: 16
        // height: 26,
        //resizeMode: "contain"
    },

    CardContainer: {
        marginBottom: 16,
        borderColor: brightBlue,
        borderRadius: 6,
        borderWidth: 4,
        padding: 16,
        width: 144,
        marginRight: 16
    },

    cardOwner: {
        fontFamily: Fonts.MPLUSBold,
        color: GrayDarkTheme,
        fontSize: 12,
        letterSpacing: 1
    },

    cardNumber: {
        fontFamily: Fonts.MPLUSBold,
        color: navyBlueTheme1,
        fontSize: 12,
        letterSpacing: 1
    },

    cards: {
        flexDirection: "row",
        flexWrap: "wrap"
    },

    AppCardSubtitle: {
        color: navyBlueTheme1,
        fontSize: 12,
        fontFamily: Fonts.MPLUSBold,
        letterSpacing: 1,
        marginTop: 32
    },

    AppCheckOutMessage: {
        justifyContent: "center",
        // alignItems: "center",
        height: fullHeight,
        // marginTop:64
    },

    headerStyle: {
        color: navyBlueTheme1
    },

    navigationButton: {
        marginBottom: 24
    },

    LoginScreen: {
        backgroundColor: navyBlueTheme1,
        height: fullHeight,
        flexDirection: "column",
        justifyContent: "space-around",
        width: fullWidth,
        padding: 48
    },

    InlineError: {
        backgroundColor: "#FFF0F1",
        padding: 16
    },

    InlineErrorText: {
        color: redTheme,
        fontSize: 12,
        fontFamily: Fonts.MPLUSMedium
    },

    inlinePreloader: {
        // width:48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        margin: 16
    },

    loginInput: {
        borderWidth: .5,
        borderColor: "#fff",
        borderStyle: "dashed",
        padding: 16,
        fontSize: 18,
        fontFamily: Fonts.MPLUSRegular,
        color: "#fff",
        borderRadius: 6
    },

    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 24
    },

    errorHeader: {
        fontSize: 24,
        color: redTheme,
        marginBottom: 16,
        fontFamily: Fonts.MPLUSBold
    },

    errorMessage: {
        fontSize: 18
    },

    shoppingListMainContainer: {
        marginTop: 32
    },

    AppCardHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: fullWidth * 0.9
    },

    username: {
        textTransform: "capitalize",
        fontFamily: Fonts.MPLUSMedium,
        marginBottom: 8,
        // fontSize:16
    },

    scrollview: {
        height: 350
    },

    scrollViewfullHeight: {
        height: 450
    },

    screensplash: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: navyBlueTheme1,
        height: fullHeight,
        width: fullWidth
    },

    CategoryItem: {
        padding: 16,
        borderBottomColor: GrayDarkThemeBtnBg,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        fontFamily: Fonts.MPLUSRegular,
        fontSize: 16
    }

});

export { styles }
