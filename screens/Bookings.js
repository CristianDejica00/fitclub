import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon, Touchable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';


export default function BookingsScreen({route, navigation}) {

    const { sessiondata } = route.params;
    const sdata = JSON.parse(sessiondata);

    const modalizeRef = useRef(null);
    const modalizeRef2 = useRef(null);

    const onOpenMemberCard = () => {
        modalizeRef.current?.open();
    };
    const onOpenSideMenu = () => {
        modalizeRef2.current?.open();
    };

    const goToScreen = (x) => {
        if(x == "home") {
            navigation.navigate('HomeScreen', { sessiondata: JSON.stringify(sdata) });
        } else if(x == "bookings") {
            navigation.navigate('BookingsScreen', { sessiondata: JSON.stringify(sdata) });
        }
    }

    var sesdata = [];

    JSON.parse(sdata, (key1, value1) => {
        sesdata[key1] = value1;
    });


    return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.homeScreen}>
            <StatusBar backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.homeHeader}>
                    <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Your bookings</Text>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Cardio</Text>
                        <Text style={{color: "#696969"}}>Wednesday, 3 Dec 2021</Text>
                    </View>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#282828"}}>8:00</Text>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Strength</Text>
                        <Text style={{color: "#696969"}}>Tuesday, 9 Dec 2021</Text>
                    </View>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#282828"}}>10:00</Text>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Resistance</Text>
                        <Text style={{color: "#696969"}}>Thursday, 18 Dec 2021</Text>
                    </View>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#282828"}}>9:30</Text>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Strength</Text>
                        <Text style={{color: "#696969"}}>Friday, 19 Dec 2021</Text>
                    </View>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#282828"}}>14:00</Text>
                </View>
                
                <View style={{height:40}}></View>




                {/*<Text>access_token : {sesdata['access_token']}</Text>
                <Text>token_type : {sesdata['token_type']}</Text>
                <Text>expires_at : {sesdata['expires_at']}</Text>
                <Text>id : {sesdata['id']}</Text>
                <Text>first_name : {sesdata['first_name']}</Text>
                <Text>last_name : {sesdata['last_name']}</Text>
                <Text>email : {sesdata['email']}</Text>
                <Text>fitclub_id : {sesdata['fitclub_id']}</Text>
                <Text>fitclub_name : {sesdata['fitclub_name']}</Text>
                <Text>fitclub_feedback_email : {sesdata['fitclub_feedback_email']}</Text>
                <Text>member_card : {sesdata['member_card']}</Text>
    <Image style={{height: 200}} resizeMode="contain" source={{ uri: sesdata['member_card'] }} />*/}
            </SafeAreaView> 
        </ScrollView>
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen('home')}>
                <Svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M0 13.7333L14 0L28 13.7333L26.46 15.7522L24.1818 14.0144V26H15.5V17.5H12.5V26H3.81818V14.0144L1.54 15.765L0 13.7333Z" fill="#007AFF"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen('bookings')}>
                <Svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M23.1111 2.8H21.6667V0H18.7778V2.8H7.22222V0H4.33333V2.8H2.88889C1.3 2.8 0 4.06 0 5.6V25.2C0 26.74 1.3 28 2.88889 28H23.1111C24.7 28 26 26.74 26 25.2V5.6C26 4.06 24.7 2.8 23.1111 2.8ZM23.1111 25.2H2.88889V11.2H23.1111V25.2ZM2.88889 8.4V5.6H23.1111V8.4H2.88889ZM10.92 23.044L19.4856 14.742L17.9544 13.258L10.92 20.076L7.87222 17.122L6.34111 18.606L10.92 23.044Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem}>
                <Svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12 28C13.65 28 15 26.7077 15 25.1282H9C9 26.7077 10.35 28 12 28ZM21 19.3846V12.2051C21 7.79692 18.555 4.10667 14.25 3.13026V2.15385C14.25 0.962051 13.245 0 12 0C10.755 0 9.75 0.962051 9.75 2.15385V3.13026C5.46 4.10667 3 7.78256 3 12.2051V19.3846L0 22.2564V23.6923H24V22.2564L21 19.3846ZM18 20.8205H6V12.2051C6 8.6441 8.265 5.74359 12 5.74359C15.735 5.74359 18 8.6441 18 12.2051V20.8205Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem}>
                <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M21 14H16V16H21V14Z" fill="#BEBEBE"/>
                    <Path d="M21 18H16V20H21V18Z" fill="#BEBEBE"/>
                    <Path d="M9 18C10.1046 18 11 17.1046 11 16C11 14.8954 10.1046 14 9 14C7.89543 14 7 14.8954 7 16C7 17.1046 7.89543 18 9 18Z" fill="#BEBEBE"/>
                    <Path d="M9 19C9.98666 19 10.92 19.2667 11.7733 19.7644C12.52 20.1912 13 21.1511 13 22.2356V23H5V22.2356C5 21.1511 5.48 20.1912 6.22667 19.7644C7.08 19.2667 8.01334 19 9 19Z" fill="#BEBEBE"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M18.2 7H25.2C26.74 7 28 8.26001 28 9.80005V25.2C28 26.74 26.74 28 25.2 28H2.8C1.25999 28 0 26.74 0 25.2V9.80005C0 8.26001 1.25999 7 2.8 7H9.8V2.80005C9.8 1.26001 11.06 0 12.6 0H15.4C16.94 0 18.2 1.26001 18.2 2.80005V7ZM12.6 2.80005V9.80005H15.4V2.80005H12.6ZM2.8 25.2H25.2V9.80005H18.2C18.2 11.34 16.94 12.6 15.4 12.6H12.6C11.06 12.6 9.8 11.34 9.8 9.80005H2.8V25.2Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem}>
                <Svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7.14286 9.8C7.14286 8.26003 8.42857 7 10 7C10.7578 7 11.4845 7.29497 12.0203 7.82014C12.5561 8.34514 12.8571 9.05745 12.8571 9.8C12.8571 10.5426 12.5561 11.2549 12.0203 11.7799C11.4845 12.305 10.7578 12.6 10 12.6C8.42857 12.6 7.14286 11.34 7.14286 9.8Z" fill="#BEBEBE"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.01C0 3.44395 5.32857 0 10 0C14.6714 0 20 3.44395 20 10.01C20 14.378 16.6714 18.9841 10 23.8C3.32857 18.9841 0 14.378 0 10.01ZM17.1429 10.01C17.1429 4.76003 12.7571 2.8 10 2.8C7.24286 2.8 2.85714 4.76003 2.85714 10.01C2.85714 13.0201 5.31429 16.5479 10 20.258C14.6857 16.5479 17.1429 13.0341 17.1429 10.01Z" fill="#BEBEBE"/>
                    <Path d="M20 28V25.2H0V28H20Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
        </View>
        <Modalize adjustToContentHeight modalStyle={styles.membercardmodal} ref={modalizeRef}>
            <Image style={{height: 260}} resizeMode="contain" source={{ uri: sesdata['member_card'] }} />
            <TouchableOpacity style={styles.modalButton}>
                <Text style={{color: "#B4B4B4", fontSize: 16}}>Memberships</Text>
                <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M10.5169 15.3165C10.1282 15.6964 9.50728 15.6964 9.11866 15.3165L8.73079 14.9372C8.32959 14.545 8.32959 13.8995 8.73079 13.5072L13.2526 9.08607L0.999999 9.08606C0.447714 9.08606 -1.26377e-06 8.63835 -1.21549e-06 8.08606L-1.17054e-06 7.57191C-1.12226e-06 7.01962 0.447715 6.57191 0.999999 6.57191L12.9028 6.57191L8.73079 2.4928C8.32959 2.10054 8.32959 1.45502 8.73079 1.06275L9.11866 0.683529C9.50728 0.303562 10.1282 0.303562 10.5169 0.683529L17.2687 7.28497C17.6699 7.67724 17.6699 8.32276 17.2687 8.71502L10.5169 15.3165Z" fill="#B4B4B4"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton2}>
                <Text style={{color: "#B4B4B4", fontSize: 16}}>Services</Text>
                <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M10.5169 15.3165C10.1282 15.6964 9.50728 15.6964 9.11866 15.3165L8.73079 14.9372C8.32959 14.545 8.32959 13.8995 8.73079 13.5072L13.2526 9.08607L0.999999 9.08606C0.447714 9.08606 -1.26377e-06 8.63835 -1.21549e-06 8.08606L-1.17054e-06 7.57191C-1.12226e-06 7.01962 0.447715 6.57191 0.999999 6.57191L12.9028 6.57191L8.73079 2.4928C8.32959 2.10054 8.32959 1.45502 8.73079 1.06275L9.11866 0.683529C9.50728 0.303562 10.1282 0.303562 10.5169 0.683529L17.2687 7.28497C17.6699 7.67724 17.6699 8.32276 17.2687 8.71502L10.5169 15.3165Z" fill="#B4B4B4"/>
                </Svg>
            </TouchableOpacity>
        </Modalize>
        <Modalize adjustToContentHeight modalStyle={styles.menumodal} ref={modalizeRef2}>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#007AFF", fontWeight: "bold"}}>Home</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Bookings</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Memberships</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Services</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Vouchers</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Our Locations</Text></TouchableOpacity>
            <View style={{height: 1, backgroundColor: "#E6E6E6", marginVertical: 10, marginBottom:20}}></View>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Club Rules</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Terms & Conditions</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Legal</Text></TouchableOpacity>
            <View style={{height: 1, backgroundColor: "#E6E6E6", marginVertical: 10, marginBottom:20}}></View>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Settings</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menulink}><Text style={{fontSize:20, color: "#E57D6F"}}>Log out</Text></TouchableOpacity>
            <View style={{flexDirection: "row", marginVertical: 20}}>
                <TouchableOpacity style={{marginRight:20}}>
                    <Svg width="24" height="24" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M30.1826 15.0913C30.1826 6.75456 23.428 0 15.0913 0C6.75456 0 0 6.75456 0 15.0913C0 22.6235 5.51866 28.8669 12.7333 30V19.4538H8.89959V15.0913H12.7333V11.7663C12.7333 7.98438 14.9848 5.89533 18.4333 5.89533C20.0848 5.89533 21.8118 6.18986 21.8118 6.18986V9.90183H19.9083C18.0341 9.90183 17.4493 11.0653 17.4493 12.2586V15.0913H21.6347L20.9653 19.4538H17.4493V30C24.6639 28.8669 30.1826 22.6235 30.1826 15.0913Z" fill="#A0A0A0"/>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:20}}>
                    <Svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15.0033 7.30838C10.7468 7.30838 7.31344 10.7425 7.31344 15C7.31344 19.2575 10.7468 22.6916 15.0033 22.6916C19.2599 22.6916 22.6933 19.2575 22.6933 15C22.6933 10.7425 19.2599 7.30838 15.0033 7.30838ZM15.0033 20.0006C12.2527 20.0006 10.0039 17.758 10.0039 15C10.0039 12.242 12.246 9.99944 15.0033 9.99944C17.7607 9.99944 20.0028 12.242 20.0028 15C20.0028 17.758 17.754 20.0006 15.0033 20.0006V20.0006ZM24.8015 6.99375C24.8015 7.99119 23.9983 8.78779 23.0078 8.78779C22.0106 8.78779 21.2142 7.98449 21.2142 6.99375C21.2142 6.00301 22.0173 5.19971 23.0078 5.19971C23.9983 5.19971 24.8015 6.00301 24.8015 6.99375ZM29.8946 8.81457C29.7808 6.41136 29.232 4.28261 27.4718 2.52873C25.7184 0.774852 23.5901 0.225929 21.1874 0.105433C18.7111 -0.0351445 11.2889 -0.0351445 8.81261 0.105433C6.41662 0.219235 4.28834 0.768158 2.52817 2.52203C0.767987 4.27591 0.225878 6.40466 0.10541 8.80788C-0.0351366 11.2847 -0.0351366 18.7086 0.10541 21.1854C0.219186 23.5886 0.767987 25.7174 2.52817 27.4713C4.28834 29.2251 6.40993 29.7741 8.81261 29.8946C11.2889 30.0351 18.7111 30.0351 21.1874 29.8946C23.5901 29.7808 25.7184 29.2318 27.4718 27.4713C29.2253 25.7174 29.7741 23.5886 29.8946 21.1854C30.0351 18.7086 30.0351 11.2914 29.8946 8.81457V8.81457ZM26.6955 23.843C26.1735 25.1551 25.1629 26.1659 23.8444 26.6947C21.8701 27.478 17.1852 27.2972 15.0033 27.2972C12.8215 27.2972 8.12995 27.4713 6.1623 26.6947C4.85053 26.1726 3.83993 25.1618 3.31121 23.843C2.52817 21.8682 2.70887 17.1823 2.70887 15C2.70887 12.8177 2.53486 8.12507 3.31121 6.15698C3.83324 4.84492 4.84384 3.8341 6.1623 3.30525C8.13664 2.52203 12.8215 2.70278 15.0033 2.70278C17.1852 2.70278 21.8767 2.52873 23.8444 3.30525C25.1562 3.8274 26.1668 4.83822 26.6955 6.15698C27.4785 8.13176 27.2978 12.8177 27.2978 15C27.2978 17.1823 27.4785 21.8749 26.6955 23.843Z" fill="#A0A0A0"/>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Svg width="30" height="24" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M33.9996 7.47654C34.0236 7.80464 34.0236 8.13283 34.0236 8.46093C34.0236 18.4687 26.2091 30 11.9263 30C7.52606 30 3.43844 28.7578 0 26.6016C0.625192 26.6719 1.22625 26.6953 1.8755 26.6953C5.50623 26.6953 8.84853 25.5 11.5175 23.461C8.10314 23.3906 5.24178 21.211 4.25592 18.2109C4.73686 18.2812 5.21773 18.3281 5.72272 18.3281C6.42 18.3281 7.11736 18.2343 7.76653 18.0703C4.20789 17.3671 1.53881 14.3203 1.53881 10.6406V10.5469C2.57271 11.1094 3.77506 11.461 5.04935 11.5078C2.95743 10.1484 1.58692 7.82809 1.58692 5.20307C1.58692 3.79685 1.97157 2.50779 2.64487 1.38278C6.46804 5.97652 12.2148 8.97647 18.6588 9.30466C18.5386 8.74215 18.4664 8.15627 18.4664 7.57032C18.4664 3.3984 21.9289 0 26.233 0C28.4691 0 30.4889 0.91406 31.9076 2.39062C33.6628 2.06251 35.3459 1.42967 36.8368 0.562504C36.2596 2.32036 35.0334 3.79692 33.4224 4.73436C34.9853 4.57037 36.5002 4.1484 37.8947 3.56253C36.8369 5.06246 35.5144 6.39835 33.9996 7.47654V7.47654Z" fill="#A0A0A0"/>
                    </Svg>
                </TouchableOpacity>
            </View>
        </Modalize>
    </View>
    );
    
    

}

const styles = StyleSheet.create({
    safearea: {
        paddingHorizontal: 20
    },
    homeScreen: {
        flex:1,
        backgroundColor: "white",
        overflow: "scroll",
    },
    loadingScreen: {
        flex:1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    spinnergif: {
        width:80,
        height:80
    },
    homeHeader: {
        height: 100,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    seemembercardbutton: {
        height: 60,
        backgroundColor: "#007AFF",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    homeSectionTitleArea: {
        flexDirection: "row",
        alignItems: "center",
        height:50,
        marginTop: 20,
        marginBottom: 5,
        justifyContent: "space-between"
    },
    homeSectionTitle: {
        fontSize: 18,
        color: "#A0A0A0"
    },
    homeSectionTitleButton: {
        height:30,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        paddingHorizontal: 20,
        borderRadius: 100
    },
    bookingCard: {
        height: 80,
        width: "100%",
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    voucherCTA: {
        borderRadius: 10,
        marginTop: 40
    },
    voucherCTAGradient: {
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row"
    },
    trainingCTA: {
        borderRadius: 10,
        marginTop: 10
    },
    trainingCTAGradient: {
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row"
    },
    navbar: {
        height: 60,
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row"
    },
    navbarItem: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    membercardmodal: {
        padding: 20
    },
    menumodal: {
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    modalButton: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#F0F0F0",
        height: 60,
        paddingHorizontal: 20
    },
    modalButton2: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#F0F0F0",
        height: 60,
        marginVertical:10,
        paddingHorizontal: 20
    },
    menulink: {
        height:30,
        marginBottom:10
    }
});
