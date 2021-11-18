import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';


export default function LocationsScreen({route, navigation}) {

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

    const modalizeRef = useRef(null);

    const openClubDetails = (id) => {
        modalizeRef.current?.open();
    }

    return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.homeScreen}>
            <StatusBar backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.homeHeader}>
                    <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Our locations</Text>
                </View>

                
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Pipera</Text>
                        </View>
                        <Text style={{color: "#757575", fontSize: 12}}>Open</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Nord</Text>
                        </View>
                        <Text style={{color: "#757575", fontSize: 12}}>Open</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Victoriei</Text>
                        </View>
                        <Text style={{color: "#757575", fontSize: 12}}>Open</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Militari</Text>
                        </View>
                        <Text style={{color: "#E57D6F", fontSize: 12}}>Closed</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Afi Park</Text>
                        </View>
                        <Text style={{color: "#E57D6F", fontSize: 12}}>Closed</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Promenada</Text>
                        </View>
                        <Text style={{color: "#E57D6F", fontSize: 12}}>Closed</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Iancu Nicolae</Text>
                        </View>
                        <Text style={{color: "#E57D6F", fontSize: 12}}>Closed</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={openClubDetails.bind(this, '1')} style={styles.bookingCard}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>Fitclub Factory Pipera</Text>
                        </View>
                        <Text style={{color: "#E57D6F", fontSize: 12}}>Closed</Text>
                    </View>
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:90, height:60 }} resizeMode="cover"></ImageBackground>
                </TouchableOpacity>

                <View style={{height:40}}></View>
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

        
        <Modalize adjustToContentHeight modalStyle={{ backgroundColor: "transparent" }} ref={modalizeRef}>
            <View style={{overflow:"hidden", borderTopEndRadius:20, borderTopStartRadius: 20 }}>
                <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:"100%", height:260 }} resizeMode="cover">
                    <View style={{flex:1}}></View>
                    <LinearGradient style={{height:60}} colors={['#00000000', '#000000']} >
                        <View style={{flex:1}}></View>
                        <View style={{height:20, backgroundColor: "white", borderTopEndRadius:20, borderTopStartRadius: 20}}></View>
                    </LinearGradient>
                </ImageBackground>
            </View>
            <View style={{paddingHorizontal:20, backgroundColor: "white" }}>
                <View style={{flexDirection:"row", alignItems: "center", borderBottomColor: "#E6E6E6", borderBottomWidth: 1, paddingBottom:20 }}>
                    <Text style={{fontSize:20, color: "black", flex:1}}>Fitclub Factory Pipera</Text>
                    <TouchableOpacity onPress={Linking.openURL(`tel:${"0727155898"}`)} style={{marginLeft:10}}>
                        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M40 20C40 31.0457 31.0459 40 20 40C8.9541 40 0 31.0457 0 20C0 8.95432 8.9541 0 20 0C31.0459 0 40 8.95432 40 20ZM29.2733 10.9613L25.2108 10.0239C24.7694 9.9223 24.3163 10.1528 24.1366 10.5668L22.2616 14.9417C22.0976 15.3245 22.2069 15.7737 22.5312 16.0355L24.8983 17.9729C23.4921 20.9689 21.0351 23.4611 17.977 24.8947L16.0395 22.5275C15.7738 22.2033 15.3285 22.0939 14.9457 22.258L10.5707 24.1329C10.1527 24.3165 9.92227 24.7697 10.0238 25.211L10.9613 29.2735C11.059 29.6953 11.434 30 11.8754 30C21.8788 30 29.9999 21.8947 29.9999 11.8754C29.9999 11.4379 29.6991 11.059 29.2733 10.9613Z" fill="#007AFF"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={{paddingBottom:20, borderBottomColor: "#E6E6E6", borderBottomWidth: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems:"center", marginTop:20}}>
                        <Text style={{color: "#A0A0A0", fontSize: 16}}>Mon - Fri</Text>
                        <Text style={{color: "#757575", fontSize: 16}}>09:00 - 21:00</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems:"center", marginTop:20}}>
                        <Text style={{color: "#A0A0A0", fontSize: 16}}>Saturday</Text>
                        <Text style={{color: "#757575", fontSize: 16}}>09:00 - 21:00</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems:"center", marginTop:20}}>
                        <Text style={{color: "#A0A0A0", fontSize: 16}}>Sunday</Text>
                        <Text style={{color: "#EA978C", fontSize: 16}}>Closed</Text>
                    </View>
                </View>
                <Text style={{marginVertical:20, color: "#757575", fontSize: 16}}>Bd. Dimitrie Pompeiu, 9-9A, Bucharest, Building 1, 1st Floor</Text>
                
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
    homeSectionTitle: {
        fontSize: 18,
        color: "#A0A0A0"
    },
    bookingCard: {
        width: "100%",
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
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
