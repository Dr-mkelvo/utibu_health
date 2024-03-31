import React, { useState, useRef, } from "react";
import { SafeAreaView, StatusBar, View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const notificationsList = [
    {
        key: '1',
        title: 'Get your meds!',
        description: 'Your health matters. Order your medicines now.',
        date: '2nd April, 08:40 PM',
    },
    {
        key: '2',
        title: 'Check this out!',
        description: 'Exciting offers inside. Don\'t miss it!',
        date: '2nd April, 02:30 PM',
        
    },
    {
        key: '3',
        title: 'Don\'t miss out!',
        description: 'Great discounts available today. Order now!',
        
        date: '1st April, 09:00 AM',
    },
    {
        key: '4',
        title: 'Stay healthy!',
        description: 'Keep up with your medications. Order now!',
        date: '31st March, 08:20 PM',
    },
    {
        key: '5',
        title: 'Act now!',
        description: 'Limited-time offer. Order your meds now!',
        date: '30th March, 03:10 PM',
    },
    {
        key: '6',
        title: 'Don\'t forget to reorder!',
        description: 'Ensure your supply. Reorder now!',
        date: '30th March, 10:15 AM',
    },
    {
        key: '7',
        title: 'Stay on track!',
        description: 'Stay ahead with your medications. Reorder now!',
        date: '28th March, 05:45 AM',
    },
    {
        key: '8',
        title: 'Time to refill!',
        description: 'Refill now & enjoy hassle-free delivery.',
        date: '29th March, 12:30 PM',
    },
    {
        key: '9',
        title: 'Special Offer Inside!',
        description: 'Exclusive offer: Get a discount today. Check it out now.',
        date: '29th March, 03:45 PM',
    },
    {
        key: '10',
        title: 'Your health matters!',
        description: 'Keep your health in check. Refill now!',
        date: '27th March, 11:00 AM',
    }
];



const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 195],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text numberOfLines={2} style={{ lineHeight: 24.0, width: width - 200.0, ...Fonts.blackColor19Medium }}>
                            {data.item.title}
                        </Text>
                        <Text numberOfLines={8} style={{ ...Fonts.grayColor18Medium, marginBottom: Sizes.fixPadding - 5.0, }}> 
                            {data.item.date}
                        </Text>
                    </View>
                    <Text numberOfLines={4} style={{ paddingTop: Sizes.fixPadding, lineHeight: 22.0, ...Fonts.grayColor18Regular }}>
                        {data.item.description}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

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
                        Notifications
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

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{
                backgroundColor: Colors.bodyBackColor,
                flex: 1
            }}>
                {header()}
                {listData.length == 0 ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons name="notifications-off" size={46} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding * 2.0 }}>No Notifications</Text>
                    </View>
                    :
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-width}
                        leftOpenValue={width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                        contentContainerStyle={{
                            paddingTop: Sizes.fixPadding,
                            paddingBottom: Sizes.fixPadding * 6.0,
                        }}
                    />
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    <Text style={{ ...Fonts.whiteColor16Regular }}>
                        {snackBarMsg}
                    </Text>
                </Snackbar>
            </View>
        </SafeAreaView>
    );
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
    notificationWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        height: 185.0,
        marginHorizontal: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginTop: Sizes.fixPadding - 14.0,
        marginVertical: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        elevation: 0.0,
        backgroundColor: '#333333'
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

export default NotificationScreen;