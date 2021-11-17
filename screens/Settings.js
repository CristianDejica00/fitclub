import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon, Touchable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';


export default function SettingsScreen({route, navigation}) {

    const goToScreen = (x) => {
        if(x == "home") {
            navigation.navigate('HomeScreen');
        } else if(x == "bookings") {
            navigation.navigate('BookingsScreen');
        } else if(x == "notifications") {
            navigation.navigate('NotificationsScreen');
        } else if(x == "memberships") {
            navigation.navigate('MembershipsScreen');
        } else if(x == "checkins") {
            navigation.navigate('CheckinsScreen');
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("@isremembered");
            navigation.navigate('LoginScreen');
        }
        catch(exception) {
            console.log(exception);
        }
    }

    return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.homeScreen}>
            <StatusBar backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.homeHeader}>
                    <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Settings</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#E6E6E6", paddingVertical: 20 }}>
                    <Text style={{color: "#B3B3B3", fontSize: 16}}>Phone number</Text>
                    <Text style={{color: "#535353", fontSize: 16}}>0766102864</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#E6E6E6", paddingVertical: 20 }}>
                    <Text style={{color: "#B3B3B3", fontSize: 16}}>Email</Text>
                    <Text style={{color: "#535353", fontSize: 16}}>username@domain.com</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#E6E6E6", paddingVertical: 20 }}>
                    <Text style={{color: "#B3B3B3", fontSize: 16}}>Password</Text>
                    <TouchableOpacity>
                        <Text style={{color: "#5CBBBB", fontSize: 16, fontWeight: "bold"}}>Change password</Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: "center", paddingVertical: 50}}>
                    <Svg width="116" height="22" viewBox="0 0 116 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.2094 14.4571L12.4509 18.1438C11.4357 19.1405 9.80406 19.127 8.80553 18.1136L8.62689 17.9327L6.88344 19.6416L7.15518 19.9155C9.04993 21.83 12.1369 21.8558 14.0635 19.9733L17.9076 16.2037L16.2094 14.4571ZM6.90109 16.166L3.22805 12.429C2.23707 11.412 2.2562 9.78594 3.27083 8.79254L3.38404 8.67941L1.66076 6.94538L1.45445 7.14643C-0.461987 9.03917 -0.487897 12.1229 1.39659 14.0474L5.15516 17.8698L6.90109 16.166ZM14.4484 5.14095L18.1793 8.93075C19.1697 9.94436 19.1551 11.5665 18.1466 12.5622L17.9856 12.7205L19.6988 14.4596L19.9504 14.2083C21.8655 12.3149 21.8914 9.23238 20.0083 7.30728L16.1768 3.42957L14.4484 5.14095ZM5.14008 6.95544L8.9414 3.22095C9.95913 2.23267 11.585 2.25181 12.5792 3.26371L12.7 3.38432L14.4408 1.6729L14.232 1.45927C12.3398 -0.459621 9.25085 -0.489967 7.32122 1.39143L3.42933 5.21637L5.14008 6.95544ZM27.8047 11.557C27.5531 13.193 26.8638 18.2267 26.8638 18.2267H29.6311L30.2978 13.4845C30.5494 11.7253 30.6425 8.38287 35.186 8.70958L35.5734 5.97534C29.6035 5.43753 28.099 9.55905 27.8047 11.557ZM75.8259 14.7511C76.5385 13.8636 76.9117 12.752 76.88 11.6147C76.88 9.51629 75.8482 8.31255 74.0473 8.31255C73.0635 8.31255 72.2305 8.73976 71.4987 9.62184C70.7664 10.504 70.4193 11.5645 70.4193 12.8889C70.4193 14.7888 71.4434 16.0177 73.0258 16.0177C74.1047 16.0605 75.1412 15.5953 75.8259 14.7611V14.7511ZM73.9492 5.80696C75.2779 5.78479 76.5552 6.31978 77.4713 7.28216L77.6346 6.10602H80.2534L78.5352 18.2091H75.9138L76.0423 17.2441C75.0251 18.0404 73.7718 18.4763 72.4799 18.483C71.1538 18.5125 69.888 17.9304 69.0482 16.9048C68.1501 15.8317 67.7126 14.5149 67.7126 12.8838C67.6651 11.0542 68.3005 9.27236 69.496 7.88533C70.5856 6.55113 72.2254 5.78671 73.9492 5.80948V5.80696ZM110.211 16.0152C108.513 16.0152 107.328 14.6682 107.328 12.7482C107.289 11.5878 107.698 10.4567 108.47 9.58918C109.156 8.7719 110.17 8.30137 111.238 8.30497C112.496 8.30497 113.22 8.94581 113.963 9.97873L116 8.07379C114.936 6.52065 113.459 5.81197 111.288 5.81197C109.475 5.79172 107.735 6.52652 106.486 7.84005C105.159 9.15135 104.431 10.9499 104.473 12.8135C104.473 14.5098 104.976 15.8594 106.005 16.94C107.019 17.9708 108.416 18.5334 109.862 18.4931C112.151 18.4931 114 17.6638 115.359 16.0252L113.663 14.1882C112.503 15.4975 111.53 16.0077 110.201 16.0077L110.211 16.0152ZM102.022 18.2242L103.728 6.11608H100.961L99.2553 18.2091L102.022 18.2242ZM102.77 0.868677C102.306 0.863926 101.859 1.0449 101.529 1.37131C101.205 1.68557 101.023 2.11865 101.026 2.57005C101.028 3.54162 101.817 4.32829 102.789 4.32705C103.248 4.3265 103.689 4.14694 104.017 3.82665C104.346 3.49159 104.527 3.03921 104.521 2.57005C104.521 2.11908 104.34 1.68685 104.017 1.37131C103.688 1.04443 103.242 0.863327 102.777 0.868677H102.77ZM96.576 2.71335H93.8389L92.2989 13.595C92.0701 15.304 92.2814 16.5028 92.9429 17.2592C93.5291 17.9277 94.4525 18.2644 95.7936 18.2644C96.3117 18.2644 96.8173 18.2468 97.3032 18.2167L97.64 15.8091H96.7671C95.9445 15.8091 95.5091 15.691 95.2576 15.3995C95.0061 15.108 94.9157 14.5601 95.0438 13.5473L95.7456 8.58391H98.6589L98.9961 6.13115H96.0653L96.576 2.71335ZM89.006 9.59924L90.9355 7.7898C89.8613 6.46788 88.3466 5.7969 86.4347 5.7969C85.0687 5.7969 83.962 6.14373 83.0484 6.85742C82.1705 7.50118 81.6649 8.53435 81.6953 9.62184C81.6953 11.3961 82.6812 12.5723 84.6287 13.1151L86.4476 13.6177C87.3731 13.8992 87.8234 14.2962 87.8234 14.8265C87.8234 15.696 87.1139 16.1383 85.7127 16.1383C84.3999 16.1552 83.1615 15.5314 82.3946 14.4671L80.49 16.1761C81.6524 17.7141 83.2901 18.4931 85.3631 18.4931C88.5506 18.4931 90.528 17.0204 90.528 14.6531C90.528 12.8939 89.4765 11.6374 87.5693 11.1096L85.4689 10.5517C84.7366 10.3482 84.3643 9.96614 84.3643 9.41574C84.3643 8.70958 85.1343 8.17682 86.1506 8.17682C87.26 8.17682 88.2159 8.66434 88.9958 9.62689L89.006 9.59924ZM65.4104 2.6857H62.6681L61.1337 13.5674C60.9049 15.2763 61.1136 16.4751 61.7777 17.2315C62.3613 17.9 63.2873 18.2367 64.628 18.2367C65.1439 18.2367 65.6521 18.2192 66.1375 18.189L66.4696 15.779H65.5968C64.7741 15.779 64.3388 15.6609 64.0744 15.3693C63.8104 15.0778 63.7325 14.5299 63.8606 13.5172L64.5624 8.55378H67.4761L67.8129 6.10101H64.8898L65.4104 2.6857ZM55.662 5.7969C54.4622 5.76912 53.3036 6.23216 52.4544 7.07859L52.3635 7.16654L52.5246 6.09596H49.8128L48.1044 18.2091H50.872L51.8254 11.5017C52.1069 9.49116 53.2972 8.27985 55.0077 8.27985C56.2884 8.27985 57.1158 9.15696 57.1158 10.5115C57.1158 10.6019 57.1034 10.7402 57.0884 10.9136C57.0884 10.989 57.0734 11.0719 57.0683 11.1649L56.0768 18.2016H58.8319C59.2175 15.407 59.4858 13.4803 59.6366 12.4214C59.7223 11.8082 59.7703 11.4715 59.7724 11.4489C59.8354 11.038 59.868 10.6231 59.8705 10.2074C59.8705 7.52844 58.2256 5.79694 55.6796 5.79694L55.662 5.7969ZM40.927 16.0328C42.4918 16.0328 43.6439 14.8466 43.9331 12.9366L44.8994 6.10602H47.6541L45.9457 18.2091H43.2416L43.3748 17.1386L43.2891 17.2265C42.4685 18.0526 41.3447 18.5067 40.1798 18.483C37.7395 18.483 36.1545 16.7591 36.1545 14.0952C36.162 13.6889 36.1948 13.2835 36.2526 12.8814L37.2187 6.09596H39.9483L38.942 13.3362C38.9173 13.5371 38.9088 13.7396 38.9169 13.9419C38.9169 15.2638 39.649 16.0227 40.9295 16.0227" fill="#D9D9D9"/>
                    </Svg>
                    <Text style={{color: "#C8C8C8", marginTop: 2}}>Version 1.0</Text>
                </View>
                <TouchableOpacity onPress={logout.bind(this)} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20 }}>
                    <Text style={{color: "#E57D6F", fontSize: 16}}>Log out</Text>
                </TouchableOpacity>
            </SafeAreaView> 
        </ScrollView>
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'home')}>
                <Svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M14 0L0 13.7333L1.54 15.765L3.81818 14.0144V26H12.5V17.5H15.5V26H24.1818V14.0144L26.46 15.7522L28 13.7333L14 0ZM18 15V23.4445H21.6364V12.0723L14 4.21997L6.36364 12.0723V23.4445H10V15H18Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'bookings')}>
                <Svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M23.1111 2.8H21.6667V0H18.7778V2.8H7.22222V0H4.33333V2.8H2.88889C1.3 2.8 0 4.06 0 5.6V25.2C0 26.74 1.3 28 2.88889 28H23.1111C24.7 28 26 26.74 26 25.2V5.6C26 4.06 24.7 2.8 23.1111 2.8ZM23.1111 25.2H2.88889V11.2H23.1111V25.2ZM2.88889 8.4V5.6H23.1111V8.4H2.88889ZM10.92 23.044L19.4856 14.742L17.9544 13.258L10.92 20.076L7.87222 17.122L6.34111 18.606L10.92 23.044Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'notifications')}>
                <Svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12 28C13.65 28 15 26.7077 15 25.1282H9C9 26.7077 10.35 28 12 28ZM21 19.3846V12.2051C21 7.79692 18.555 4.10667 14.25 3.13026V2.15385C14.25 0.962051 13.245 0 12 0C10.755 0 9.75 0.962051 9.75 2.15385V3.13026C5.46 4.10667 3 7.78256 3 12.2051V19.3846L0 22.2564V23.6923H24V22.2564L21 19.3846ZM18 20.8205H6V12.2051C6 8.6441 8.265 5.74359 12 5.74359C15.735 5.74359 18 8.6441 18 12.2051V20.8205Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'memberships')}>
                <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M21 14H16V16H21V14Z" fill="#BEBEBE"/>
                    <Path d="M21 18H16V20H21V18Z" fill="#BEBEBE"/>
                    <Path d="M9 18C10.1046 18 11 17.1046 11 16C11 14.8954 10.1046 14 9 14C7.89543 14 7 14.8954 7 16C7 17.1046 7.89543 18 9 18Z" fill="#BEBEBE"/>
                    <Path d="M9 19C9.98666 19 10.92 19.2667 11.7733 19.7644C12.52 20.1912 13 21.1511 13 22.2356V23H5V22.2356C5 21.1511 5.48 20.1912 6.22667 19.7644C7.08 19.2667 8.01334 19 9 19Z" fill="#BEBEBE"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M18.2 7H25.2C26.74 7 28 8.26001 28 9.80005V25.2C28 26.74 26.74 28 25.2 28H2.8C1.25999 28 0 26.74 0 25.2V9.80005C0 8.26001 1.25999 7 2.8 7H9.8V2.80005C9.8 1.26001 11.06 0 12.6 0H15.4C16.94 0 18.2 1.26001 18.2 2.80005V7ZM12.6 2.80005V9.80005H15.4V2.80005H12.6ZM2.8 25.2H25.2V9.80005H18.2C18.2 11.34 16.94 12.6 15.4 12.6H12.6C11.06 12.6 9.8 11.34 9.8 9.80005H2.8V25.2Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'checkins')}>
                <Svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7.14286 9.8C7.14286 8.26003 8.42857 7 10 7C10.7578 7 11.4845 7.29497 12.0203 7.82014C12.5561 8.34514 12.8571 9.05745 12.8571 9.8C12.8571 10.5426 12.5561 11.2549 12.0203 11.7799C11.4845 12.305 10.7578 12.6 10 12.6C8.42857 12.6 7.14286 11.34 7.14286 9.8Z" fill="#BEBEBE"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.01C0 3.44395 5.32857 0 10 0C14.6714 0 20 3.44395 20 10.01C20 14.378 16.6714 18.9841 10 23.8C3.32857 18.9841 0 14.378 0 10.01ZM17.1429 10.01C17.1429 4.76003 12.7571 2.8 10 2.8C7.24286 2.8 2.85714 4.76003 2.85714 10.01C2.85714 13.0201 5.31429 16.5479 10 20.258C14.6857 16.5479 17.1429 13.0341 17.1429 10.01Z" fill="#BEBEBE"/>
                    <Path d="M20 28V25.2H0V28H20Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
        </View>
        
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
    homeSectionTitle: {
        fontSize: 18,
        color: "#A0A0A0"
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
    }
});
