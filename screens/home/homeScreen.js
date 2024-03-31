import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import CountDown from 'react-native-countdown-component';
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get("window");

const offersBannerList = [
    {
        image: require('../../assets/images/slider/slider_1.jpg'),
    },
    {
        image: require('../../assets/images/slider/slider_2.jpg'),
    },
    {
        image: require('../../assets/images/slider/slider_3.jpg'),
    },
];

const handPickedItemsList = [
    {
        id: '1',
        image: require('../../assets/images/handpicked_item/handpicked_item_1.png'),
        percentageOff: 33,
        name: 'Forever Bee Honey - Pure honey, natural sweetness, forever nourishment',
        tabletsOrCapsulesCount: 24,
        type: 'Organic(s)', //type: 'Tablet(s)',
        discountPrice: 8,
        price: 24,
        brand: 'BF SUMA ',
        manufacturer: 'BF SUMA Manufactures',
    },
    {
        id: '2',
        image: require('../../assets/images/handpicked_item/handpicked_item_2.png'),
        percentageOff: 10,
        name: 'BF Suma -prostatRelax - Prostate health support, natural relief',
        tabletsOrCapsulesCount: 36,
        type: 'Tablet(s)',
        discountPrice: 5,
        price: 50,
        brand: 'BF SUMA',
        manufacturer: 'BF Suma Pharmaceuticals',
    },
    {
        id: '3',
        image: require('../../assets/images/handpicked_item/handpicked_item_3.png'),
        percentageOff: 20,
        name: 'BF Suma Femicare - Feminine wellness support, holistic care',
        tabletsOrCapsulesCount: 70,
        type: 'Tablet(s)',//package
        discountPrice: 5,
        price: 25,
        brand: 'BF Suma',
        manufacturer: 'BF Suma Manufacture',
    },
 
    {
        id: '4',
        image: require('../../assets/images/handpicked_item/handpicked_item_4.png'),
        percentageOff: 20,
        name: 'BF SUMA Reishi Coffee -Kidney support, coffee indulgence, healthful blend',
        tabletsOrCapsulesCount: 60,
        type: 'Capsule(s)',
        discountPrice: 4,
        price: 6,
        brand: 'BF SUMA',
        manufacturer: 'BF SUMA Manufacturer' 
    },
   
    {
        id: '5',
        image: require('../../assets/images/handpicked_item/handpicked_item_5.png'),
        percentageOff: 10,
        name: 'Forever Aloe Vera Gel -Aloe vera wellness, pure hydration, natural care',
        tabletsOrCapsulesCount: 30,
        type: 'Capsule(s)',
        discountPrice: 4,
        price: 5,
        brand: 'Forever Living',
        manufacturer:  'Forever Living Products International, Inc'
    },
];

const featuredBrandsList = [
    {
        id: '1',
        image: require('../../assets/images/featured_brands/featured_brands_1.jpg'),
    },
    {
        id: '2',
        image: require('../../assets/images/featured_brands/featured_brands_2.jpg'),
    },
    {
        id: '3',
        image: require('../../assets/images/featured_brands/featured_brands_3.jpg'),
    },
    {
        id: '4',
        image: require('../../assets/images/featured_brands/featured_brands_4.jpg'),
    },
    {
        id: '5',
        image: require('../../assets/images/featured_brands/featured_brands_5.jpg'),
    },
    {
        id: '6',
        image: require('../../assets/images/featured_brands/featured_brands_6.jpg'),
    },
   
];

const dealsOfTheDaysList = [
    {
        id: 'd1',
        image: require('../../assets/images/deal_of_the_day/deal_of_the_day_1.png'),
        percentageOff: 50,
        name: 'Advair Diskus Inhaler -Control asthma, breathe easy, live well.',
        discountPrice: 6,
        price: 12,
        brand: 'Advair',
        manufacturer: 'GlaxoSmithKline'
    },
    {
        id: 'd2',
        image: require('../../assets/images/deal_of_the_day/deal_of_the_day_2.png'),
        percentageOff: 30,
        name: 'ProstatRelax -Prostate health support, natural relief',
        discountPrice: 6,
        price: 12,
        brand: 'BF SUMA',
        manufacturer: 'BF SUMA Pharmaceuticals'
    },
    {
        id: 'd3',
        image: require('../../assets/images/deal_of_the_day/deal_of_the_day_3.png'),
        percentageOff: 55,
        name: 'Forever Bee Honey -Pure honey, natural sweetness, forever nourishment',
        discountPrice: 7,
        price: 15,
        brand: 'Forever Living',
        manufacturer: 'Forever Living Products International, Inc'
    },
    {
        id: 'd4',
        image: require('../../assets/images/deal_of_the_day/deal_of_the_day_4.png'),
        percentageOff: 20,
        name: 'BF Suma Femicare - Feminine wellness support, holistic care',
        discountPrice: 4,
        price: 6,
        brand: 'BF SUMA',
        manufacturer: 'BF SUMA Manufacturer'
    },
    {
        id: 'd5',
        image: require('../../assets/images/deal_of_the_day/deal_of_the_day_5.png'),
        percentageOff: 10,
        name: 'BF SUMA Reishi Coffee -Kidney support, coffee indulgence, healthful blend',
        discountPrice: 4,
        price: 5,
        brand: 'BF SUMA',
        manufacturer: 'BF SUMA Manufacturer'
    },
    {
        id: 'd6',
        image: require('../../assets/images/deal_of_the_day/deal_of_the_day_6.png'),
        percentageOff: 50,
        name: 'Forever Aloe Vera Gel -Aloe vera wellness, pure hydration, natural care',
        discountPrice: 10,
        price: 20,
        brand: 'Forever Living',
        manufacturer: 'Forever Living Products International, Inc'
    },
    {
        id: 'd7',
        image: require('../../assets/images/deal_of_the_day/deal_of_the_day_7.png'),
        percentageOff: 20,
        name: 'First Aid Kit - Essential emergencies, safety stash',
        discountPrice: 25,
        price: 30,
        brand: 'Johnson & Johnson',
        manufacturer: 'Johnson & Johnson Consumer Inc'
    },
   
];

const topCategoriesList = [
    {
        id: '1',
        image: require('../../assets/images/top_categories/top_category_1.png')
    },
    {
        id: '2',
        image: require('../../assets/images/top_categories/top_category_2.png')
    },
    {
        id: '3',
        image: require('../../assets/images/top_categories/top_category_3.png')
    },
    {
        id: '4',
        image: require('../../assets/images/top_categories/top_category_4.png')
    }
];

const HomeScreen = ({ navigation }) => {

    const [state, setState] = useState({
        offers: offersBannerList,
        activeSlide: 0,
        days: 694,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        offers,
        activeSlide,
        days,
    } = state;

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('AvailableProduct')}
            style={{
                ...styles.topCategoriesWrapStyle,
                paddingLeft: index % 2 == 0 ? Sizes.fixPadding * 2.0 : 0.0,
                paddingRight: index % 2 != 0 ? Sizes.fixPadding * 2.0 : 0.0,
            }}>
            <Image
                source={item.image}
                style={{
                    width: width / 2.3,
                    height: 190.0,
                    backgroundColor: Colors.whiteColor,
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {headerWithDetail()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {offerBanners()}
                            {boughtItemAndPastOrderInfo()}
                            {orderAndProductInfo()}
                            {handPickedItemsInfo()}
                            {featuredBrandsInfo()}
                            {dealsOfTheDayInfo()}
                            {topCategoriesTitle()}
                        </>
                    }
                    data={topCategoriesList}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                   
                />
            </View>
        </SafeAreaView>
    )

 

    function topCategoriesTitle() {
        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.whiteColor,
                paddingBottom: Sizes.fixPadding - 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor19Medium, marginTop: Sizes.fixPadding + 3.0, marginBottom: Sizes.fixPadding - 5.0 }}>
                    Top Categories
                </Text>
            </View>
        )
    }

    function dealsOfTheDayInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('ProductDescription', { item, from: 'home' })}
            >
                <View style={styles.dealsOfTheDayInfoWrapStlye}>
                    <SharedElement id={item.id}>
                        <Image
                            source={item.image}
                            style={{ width: 140.0, height: 140.0, }}
                            resizeMode="contain"
                        />
                    </SharedElement>
                    <View style={styles.percentageOffWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            {item.percentageOff}% OFF
                        </Text>
                    </View>
                </View>
                <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor19Medium, width: 190.0, lineHeight: 24.0, }}>
                    {item.name}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 17.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor25Medium }}>
                        ${item.discountPrice}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor18Light, marginLeft: Sizes.fixPadding - 5.0, textDecorationLine: "line-through", }}>
                        ${item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
                <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding + 3.0, marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center', justifyContent: "space-between" }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Deals of the Day
                    </Text>
                    <Text style={{ ...Fonts.primaryColor18Medium }}>
                        View All
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                    <MaterialIcons name="av-timer" size={23} color={Colors.orangeColor} />
                    <Text style={{ ...Fonts.orangeColor18Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        {days} days
                    </Text>
                    <CountDown
                        size={15}
                        until={60000000}
                        digitStyle={{}}
                        digitTxtStyle={{ ...Fonts.orangeColor18Regular }}
                        onChange={(time) => {
                            time == 36000 ?
                                updateState({ days: days - 1 }) : null
                        }}
                        separatorStyle={{ color: Colors.orangeColor, marginHorizontal: Sizes.fixPadding - 30.0 }}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{ h: null, m: null, s: null }}
                        showSeparator
                    />
                </View>
                <FlatList
                    horizontal
                    data={dealsOfTheDaysList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 2.0
                    }}
                />
            </View>
        )
    }

    function featuredBrandsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('AvailableProduct')}
            >
                <Image
                    source={item.image}
                    style={styles.featuredBrandsImageStyle}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        )
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
                <Text style={{ ...Fonts.blackColor19Medium, marginTop: Sizes.fixPadding + 3.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    Featured Brands
                </Text>
                <FlatList
                    horizontal
                    data={featuredBrandsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 2.0
                    }}
                />
            </View>
        )
    }

    function handPickedItemsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('ProductDescription', { item, from: 'home' })}
            >
                <View style={styles.handPickedItemsImageWrapStyle}>
                    <SharedElement id={item.id}>
                        <Image
                            source={item.image}
                            style={{ width: 140.0, height: 140.0, }}
                            resizeMode="contain"
                        />
                    </SharedElement>
                    <View style={styles.percentageOffWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            {item.percentageOff}% OFF
                        </Text>
                    </View>
                </View>
                <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor19Medium, width: 190.0, lineHeight: 24.0, }}>
                    {item.name}
                </Text>
                <Text style={{ ...Fonts.primaryColor18Regular, marginTop: Sizes.fixPadding - 15.0 }}>
                    {item.tabletsOrCapsulesCount} {item.type} in Bottle
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 17.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor25Medium }}>
                        ${item.discountPrice}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor18Light, marginLeft: Sizes.fixPadding - 5.0, textDecorationLine: "line-through", }}>
                        ${item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
                <Text style={{ ...Fonts.blackColor19Medium, marginTop: Sizes.fixPadding + 3.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    Handpicked Items for You
                </Text>
                <FlatList
                    horizontal
                    data={handPickedItemsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 2.0
                    }}
                />
            </View>
        )
    }

    function orderAndProductInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('OrderMedicines')}
                    style={{ ...styles.orderAndProductInfoStyle, marginRight: Sizes.fixPadding - 5.0, }}>
                    <Image
                        source={require('../../assets/images/icons/icon_1.png')}
                        style={{ height: 60.0, width: 60.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.blackColor17Medium, }}>
                        Order Medicines
                    </Text>
                    <Text style={{ ...Fonts.redColor14Regular, }}>
                        FLAT 15% OFF
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('HealthCare')}
                    style={{ ...styles.orderAndProductInfoStyle, marginLeft: Sizes.fixPadding - 5.0, }}>
                    <Image
                        source={require('../../assets/images/icons/icon_2.png')}
                        style={{ height: 60.0, width: 60.0 }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17Medium }}>
                        Healthcare 
                        
                    </Text>
                    <Text style={{ ...Fonts.redColor14Regular }}>
                        UPTO 60% OFF
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function boughtItemAndPastOrderInfo() {
        return (
            <View style={styles.boughtItemAndPastOrderInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('PreviouslyBoughtItems')}
                    style={{ ...styles.boughtItemAndPastOrderInfoStyle, marginRight: Sizes.fixPadding - 5.0 }}>
                    <Image
                        source={require('../../assets/images/icons/icon_3.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={2} style={styles.boughtItemAndPastOrderTextStyle}>
                        1 Previously Bought Item
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('PreviouslyBoughtItems')}
                    style={{ ...styles.boughtItemAndPastOrderInfoStyle, marginLeft: Sizes.fixPadding - 5.0, }}>
                    <Image
                        source={require('../../assets/images/icons/icon_4.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.boughtItemAndPastOrderTextStyle}>
                        1 Past Order
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function offerBanners() {
        return (
            <View>
                <Carousel
                    data={offers}
                    sliderWidth={width}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                    itemWidth={width}
                    renderItem={_renderItem}
                    onSnapToItem={(index) => updateState({ activeSlide: index })}
                />
                {pagination()}
            </View>
        )
    }

    function _renderItem({ item }) {
        return (
            <Image
                source={item.image}
                style={{ width: width, height: 180.0 }}
                resizeMode="cover"
            />
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={offers.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    function headerWithDetail() {
        return (
            <View style={{
                backgroundColor: Colors.primaryColor,
                padding: Sizes.fixPadding,
                flexDirection: 'column'
            }}>
                <View style={styles.headerInfoWrapStyle}>
                    <View>
                        <Text style={{ ...Fonts.whiteColor20Medium }}>
                            Utibu Health
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.whiteColor15Light }}>
                                Deliver To
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.push('ChooseLocation')}
                                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Sizes.fixPadding - 3.0 }}>
                                <Text style={{ ...Fonts.whiteColor16Medium }}>
                                    Kamakis Bypass
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.whiteColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons
                            name="tag"
                            size={26}
                            color={Colors.whiteColor}
                            onPress={() => navigation.push('Offers')}
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => navigation.push('Cart')}
                        >
                            <MaterialIcons
                                name="shopping-cart"
                                size={26}
                                color={Colors.whiteColor}
                                style={{ marginLeft: Sizes.fixPadding + 10.0 }}
                            />
                            <View style={styles.cartItemCountWrapStyle}>
                                <Text style={{ ...Fonts.whiteColor15Regular, top: -3.0, }} >
                                    1
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View >
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Search')}
                    style={styles.searchButtonStyle}>
                    <MaterialIcons name="search" size={22} color={Colors.primaryColor} />
                    <Text numberOfLines={1} style={{ ...Fonts.primaryColor18Medium, marginLeft: Sizes.fixPadding, flex: 1 }}>
                        Search medicines/healthcare products
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    searchButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 1.0,
        marginTop: Sizes.fixPadding + 5.0
    },
    headerInfoWrapStyle: {
        flexDirection: 'row',
        paddingLeft: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cartItemCountWrapStyle: {
        position: 'absolute',
        right: -8.0,
        height: 17.0,
        width: 17.0,
        borderRadius: 8.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redColor,
        elevation: 10.0,
    },
    sliderActiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5.0,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 15.0
    },
    sliderInactiveDotStyle: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: Colors.primaryColor
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -20.0,
        left: 0.0,
        right: 0.0,
    },
    boughtItemAndPastOrderInfoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(0, 150, 136, 0.3)', //Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flex: 1,
        paddingHorizontal: Sizes.fixPadding,
        height: 65.0,
    },
    boughtItemAndPastOrderTextStyle: {
        flex: 1,
        paddingTop: 10.0,
        marginLeft: Sizes.fixPadding,
        ...Fonts.blackColor20Medium,
        lineHeight: 24.0,
    },
    boughtItemAndPastOrderInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between',
    },
    orderAndProductInfoStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 3.0,
    },
    percentageOffWrapStyle: {
        position: 'absolute',
        left: -0.60,
        top: -0.50,
        backgroundColor: Colors.redColor,
        borderTopLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding - 4.0,
    },
    handPickedItemsImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
        width: 190.0,
        height: 180.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featuredBrandsImageStyle: {
        width: 165.0,
        height: 240.0,
        borderColor: 'rgba(0, 150, 136, 0.5)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0
    },
    dealsOfTheDayInfoWrapStlye: {
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
        width: 190.0,
        height: 180.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
   
    topCategoriesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        width: width / 2.0,
        alignItems: 'center'
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;