import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('screen');

const availableProductsList = [
    {
        id: '1',
        image: require('../../assets/images/product/product_1/1.png'),
        allImages: [
            {
                id: '1',
                image: require('../../assets/images/product/product_1/1.png'),
            },
            {
                id: '2',
                image: require('../../assets/images/product/product_1/2.png'),
            },
            {
                id: '3',
                image: require('../../assets/images/product/product_1/3.png'),
            }
        ],
        name: 'Advair Diskus Inhaler -Control asthma, breathe easy, live well.',
        discountPrice: '7',
        price: '8',
        percentageOff: 5,
        flavours: [
            {
                id: '1',
                flavour: 'Flavour 1',
            },
            {
                id: '2',
                flavour: 'Flavour 2',
            }
        ],
        packageSizes: [
            {
                id: '1',
                size: '500g',
            },
            {
                id: '2',
                size: '200g',
            },
        ],
        brand:  'Advair',
        manufacturer: 'GlaxoSmithKline'
    },
    {
        id: '2',
        image: require('../../assets/images/product/product_2/1.png'),
        allImages: [
            {
                id: '1',
                image: require('../../assets/images/product/product_2/1.png'),
            },
            {
                id: '2',
                image: require('../../assets/images/product/product_2/2.png'),
            },
        ],
        name: 'digoxin',
        discountPrice: '1.5',
        price: '1.8',
        percentageOff: 20,
        packageSizes: [
            {
                id: '1',
                size: '100ml',
            },
            {
                id: '2',
                size: '200ml',
            },
            {
                id: '3',
                size: '500ml',
            }
        ],
        brand: 'digoxin',
        manufacturer: 'digoxin Manufactures',
    },
    {
        id: '3',
        image: require('../../assets/images/product/product_3/1.png'),
        allImages: [
            {
                id: '1',
                image: require('../../assets/images/product/product_3/1.png'),
            },
        ],
        name: 'Diuretics -- Chronic Kidney Disease',
        discountPrice: '1',
        price: '1.5',
        percentageOff: 33,
        packageSizes: [
            {
                id: '1',
                size: '50 No\'s',
            },
            {
                id: '2',
                size: '100 No\'s',
            },
        ],
        brand: 'Diuretics',
        manufacturer: 'Diuretics Manufacturer',
    },
    {
        id: '4',
        image: require('../../assets/images/product/product_4/1.png'),
        allImages: [
            {
                id: '1',
                image: require('../../assets/images/product/product_4/1.png'),
            },
            {
                id: '2',
                image: require('../../assets/images/product/product_4/2.png'),
            },
            {
                id: '3',
                image: require('../../assets/images/product/product_4/3.png'),
            },
            {
                id: '4',
                image: require('../../assets/images/product/product_4/4.png'),
            },
        ],
        name: 'Trazodone --Antidepressants',
        discountPrice: 9,
        price: 18,
        percentageOff: 50,
        packageSizes: [
            {
                id: '1',
                size: '50 No\'s',
            },
            {
                id: '2',
                size: '100 No\'s',
            },
        ],
        brand: 'Trazodone',
        manufacturer: 'Trazodone Manufactures',
    },
    {
        id: '5',
        image: require('../../assets/images/product/product_5/1.png'),
        allImages: [
            {
                id: '1',
                image: require('../../assets/images/product/product_5/1.png'),
            },
            {
                id: '2',
                image: require('../../assets/images/product/product_5/2.png'),
            },
            {
                id: '3',
                image: require('../../assets/images/product/product_5/3.png'),
            },
            {
                id: '4',
                image: require('../../assets/images/product/product_5/4.png'),
            },
        ],
        name: 'Osteoarthritis--Acetaminophen',
        discountPrice: '5',
        price: '8',
        percentageOff: 30,
        packageSizes: [
            {
                id: '1',
                size: '10 No\'s',
            },
            {
                id: '2',
                size: '30 No\'s',
            },
        ],
        brand: 'Osteoarthritis--Acetaminophen',
        manufacturer: 'Osteoarthritis Ltd',
    },
    {
        id: '6',
        image: require('../../assets/images/product/product_6/1.png'),
        allImages: [
            {
                id: '1',
                image: require('../../assets/images/product/product_6/1.png'),
            },
            {
                id: '2',
                image: require('../../assets/images/product/product_6/2.png'),
            },
            {
                id: '3',
                image: require('../../assets/images/product/product_6/3.png'),
            },
            {
                id: '4',
                image: require('../../assets/images/product/product_6/4.png'),
            },
            {
                id: '5',
                image: require('../../assets/images/product/product_6/5.png'),
            },
            {
                id: '6',
                image: require('../../assets/images/product/product_6/6.png'),
            },
        ],
        name: 'hiv Abacavir --For HIV/AIDS',
        discountPrice: '2',
        price: '4',
        percentageOff: 50,
        packageSizes: [],
        brand: 'hiv Abacavir',
        manufacturer: 'Abacavir Ltd',
    },
];

const AvailableProductsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        sortBySheet: false,
        currentSortIndex: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        sortBySheet,
        currentSortIndex,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                >
                    {delivertoInfo()}
                    {products()}
                </ScrollView>
                {sortAndFilterButton()}
            </View>
            {sortByBottomSheet()}
        </SafeAreaView>
    )

    function sortByBottomSheet() {
        return (
            <BottomSheet
                isVisible={sortBySheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.5)' }}
                onBackdropPress={() => updateState({ sortBySheet: false })}
            >
                <View style={{ backgroundColor: Colors.whiteColor, }}>
                    <Text style={{ paddingVertical: Sizes.fixPadding - 5.0, ...Fonts.primaryColor19Medium, textAlign: 'center' }}>
                        SORT BY
                    </Text>
                    <View style={{
                        backgroundColor: Colors.bodyBackColor, height: 1.0,
                        marginHorizontal: Sizes.fixPadding,
                        marginBottom: Sizes.fixPadding + 5.0,
                    }} />
                    {sortByOptions({ index: 1, sortBy: 'Popularity' })}
                    {sortByOptions({ index: 2, sortBy: 'Price -- Low to High' })}
                    {sortByOptions({ index: 3, sortBy: 'Price -- High to Low' })}
                    {sortByOptions({ index: 4, sortBy: 'Discount' })}
                </View>
            </BottomSheet >
        )
    }

    function sortByOptions({ index, sortBy }) {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ currentSortIndex: index, sortBySheet: false })}
                style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 4.0, alignItems: 'center' }}>
                <View style={{
                    ...styles.radioButtonStyle,
                    borderColor: currentSortIndex == index ? Colors.primaryColor : 'gray',
                }}>
                    {currentSortIndex == index
                        ?
                        <View style={{ backgroundColor: Colors.primaryColor, width: 10.0, height: 10.0, borderRadius: 5.0 }} />
                        :
                        null
                    }
                </View>
                <Text style={{ marginLeft: Sizes.fixPadding + 10.0, ...Fonts.primaryColor17Regular }}>
                    {sortBy}
                </Text>
            </TouchableOpacity>
        )
    }

    function sortAndFilterButton() {
        return (
            <View style={styles.sortAndFilterButtonWrapStyle}>
                <View style={styles.sortAndFilterButtonStyle}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => updateState({ sortBySheet: true })}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="sort" size={24} color={Colors.primaryColor} />
                        <Text style={{ paddingLeft: Sizes.fixPadding - 2.0, ...Fonts.primaryColor18Medium }}>
                            Sort
                        </Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: Colors.primaryColor, marginVertical: Sizes.fixPadding, height: 32.0, width: 1.5 }} />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('Filter')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="filter-list" size={24} color={Colors.primaryColor} />
                        <Text style={{ paddingLeft: Sizes.fixPadding - 2.0, ...Fonts.primaryColor18Medium }}>
                            Filter
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function products() {
        return (
            <>
                {availableProductsList.map((item) => (
                    <View key={`${item.id}`}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => navigation.push('ProductDescription', { item, from: 'availableProduct' })}
                            style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center', }}
                        >
                            <SharedElement id={item.id}>
                                <Image
                                    source={item.image}
                                    style={{ width: 70.0, height: 70.0, }}
                                    resizeMode="contain"
                                />
                            </SharedElement>
                            <View style={{ paddingLeft: Sizes.fixPadding, }}>
                                <Text style={{
                                    ...Fonts.primaryColor18Medium, width: width - 130,
                                    lineHeight: 23.0,
                                    paddingTop: Sizes.fixPadding - 5.0,
                                }}>
                                    {item.name}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ ...Fonts.primaryColor22Medium, }}>
                                        ${item.discountPrice}
                                    </Text>
                                    <Text style={{ paddingHorizontal: Sizes.fixPadding, textDecorationLine: 'line-through', ...Fonts.primaryColor17Light }}>
                                        ${item.price}
                                    </Text>
                                    <View style={styles.offerWrapStyle}>
                                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                                            {item.percentageOff}% OFF
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{ marginVertical: Sizes.fixPadding + 10.0, backgroundColor: Colors.bodyBackColor, height: 1.5, }}
                        />
                    </View>
                ))}
            </>
        )
    }

    function delivertoInfo() {
        return (
            <View style={styles.deliverToInfoWrapStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="map-marker"
                        style={{ paddingTop: Sizes.fixPadding - 3.0 }}
                        size={20}
                        color={Colors.primaryColor}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.primaryColor15Light }}>
                            Deliver To
                        </Text>
                        <Text style={{ ...Fonts.primaryColor18Medium }}>
                            Kamakis Bypass
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('ChooseLocation')}
                >
                    <Text style={{ ...Fonts.primaryColor18Medium, alignSelf: 'flex-end' }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor}
                        onPress={() => navigation.pop()}
                    />
                    <Text style={{
                        width: width / 1.7,
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.whiteColor19Medium
                    }}>
                        Available Product
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        name="search"
                        size={26}
                        color={Colors.whiteColor}
                        onPress={() => navigation.push('Search')}
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
                            <Text style={{ ...Fonts.whiteColor15Regular }}>
                                1
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryColor,
        height: 56.0,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
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
    deliverToInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.bodyBackColor,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    offerWrapStyle: {
        backgroundColor: Colors.redColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        paddingHorizontal: Sizes.fixPadding - 4.0,
    },
    sortAndFilterButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        borderTopColor: Colors.bodyBackColor,
        borderTopWidth: 1.0,
    },
    sortAndFilterButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding
    },
    radioButtonStyle: {
        borderWidth: 1.0,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AvailableProductsScreen;