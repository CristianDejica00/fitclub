import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon, Touchable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';


export default function MembershipsScreen({route, navigation}) {

    const goToScreen = (x) => {
        if(x == "home") {
            navigation.navigate('HomeScreen');
        } else if(x == "bookings") {
            navigation.navigate('BookingsScreen');
        } else if(x == "notifications") {
            navigation.navigate('NotificationsScreen');
        } else if(x == "memberships") {
            navigation.navigate('MembershipsScreen');
        } else if(x == "services") {
            navigation.navigate('ServicesScreen');
        }
    }

    return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.homeScreen}>
            <StatusBar backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.homeHeader}>
                    <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Your memberships</Text>
                </View>

                <View style={styles.membershipCard}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>10 Sessions</Text>
                            <Text style={{color: "#696969"}}>3 Dec 2021 - 3 Jan 2021</Text>
                        </View>
                        <Text style={{fontSize: 16, color: "#A0A0A0"}}>1 Month</Text>
                    </View>
                    <Text style={{color: "#979797", marginTop: 10}}>12 days left</Text>
                    <View style={{height: 5, width: "100%", backgroundColor: "#F0F0F0", borderRadius: 100, marginTop:6}}>
                        <View style={{height: 5, width: "66%", backgroundColor: "#5CBBBB", borderRadius: 100}}></View>
                    </View>
                </View>
                <View style={styles.membershipCard}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>10 Session</Text>
                            <Text style={{color: "#696969"}}>3 Dec 2021 - 3 Jan 2021</Text>
                        </View>
                        <Text style={{fontSize: 16, color: "#A0A0A0"}}>Unlimited</Text>
                    </View>
                    <Text style={{color: "#979797", marginTop: 10}}>2 sessions left</Text>
                    <View style={{height: 5, width: "100%", backgroundColor: "#F0F0F0", borderRadius: 100, marginTop:6}}>
                        <View style={{height: 5, width: "85%", backgroundColor: "#5CBBBB", borderRadius: 100}}></View>
                    </View>
                </View>


                
                <View style={styles.membershipCardInvalid}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 16, color: "#A3A3A3", fontWeight: "bold"}}>10 Session</Text>
                            <Text style={{color: "#696969"}}>3 Dec 2021 - 3 Jan 2021</Text>
                        </View>
                        <Text style={{fontSize: 16, color: "#A0A0A0"}}>Expired</Text>
                    </View>
                    <Text style={{color: "#979797", marginTop: 10}}>0 sessions left</Text>
                    <View style={{height: 5, width: "100%", backgroundColor: "#F0F0F0", borderRadius: 100, marginTop:6}}>
                        <View style={{height: 5, width: "100%", backgroundColor: "#A3A3A3", borderRadius: 100}}></View>
                    </View>
                </View>
                <View style={styles.membershipCardInvalid}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 16, color: "#A3A3A3", fontWeight: "bold"}}>10 Session</Text>
                            <Text style={{color: "#696969"}}>3 Dec 2021 - 3 Jan 2021</Text>
                        </View>
                        <Text style={{fontSize: 16, color: "#A0A0A0"}}>Expired</Text>
                    </View>
                    <Text style={{color: "#979797", marginTop: 10}}>0 sessions left</Text>
                    <View style={{height: 5, width: "100%", backgroundColor: "#F0F0F0", borderRadius: 100, marginTop:6}}>
                        <View style={{height: 5, width: "100%", backgroundColor: "#A3A3A3", borderRadius: 100}}></View>
                    </View>
                </View>
                <View style={styles.membershipCardInvalid}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 16, color: "#A3A3A3", fontWeight: "bold"}}>10 Session</Text>
                            <Text style={{color: "#696969"}}>3 Dec 2021 - 3 Jan 2021</Text>
                        </View>
                        <Text style={{fontSize: 16, color: "#A0A0A0"}}>Expired</Text>
                    </View>
                    <Text style={{color: "#979797", marginTop: 10}}>0 sessions left</Text>
                    <View style={{height: 5, width: "100%", backgroundColor: "#F0F0F0", borderRadius: 100, marginTop:6}}>
                        <View style={{height: 5, width: "100%", backgroundColor: "#A3A3A3", borderRadius: 100}}></View>
                    </View>
                </View>
                <View style={styles.membershipCardInvalid}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 16, color: "#A3A3A3", fontWeight: "bold"}}>10 Session</Text>
                            <Text style={{color: "#696969"}}>3 Dec 2021 - 3 Jan 2021</Text>
                        </View>
                        <Text style={{fontSize: 16, color: "#A0A0A0"}}>Expired</Text>
                    </View>
                    <Text style={{color: "#979797", marginTop: 10}}>0 sessions left</Text>
                    <View style={{height: 5, width: "100%", backgroundColor: "#F0F0F0", borderRadius: 100, marginTop:6}}>
                        <View style={{height: 5, width: "100%", backgroundColor: "#A3A3A3", borderRadius: 100}}></View>
                    </View>
                </View>
                <View style={styles.membershipCardInvalid}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 16, color: "#A3A3A3", fontWeight: "bold"}}>10 Session</Text>
                            <Text style={{color: "#696969"}}>3 Dec 2021 - 3 Jan 2021</Text>
                        </View>
                        <Text style={{fontSize: 16, color: "#A0A0A0"}}>Expired</Text>
                    </View>
                    <Text style={{color: "#979797", marginTop: 10}}>0 sessions left</Text>
                    <View style={{height: 5, width: "100%", backgroundColor: "#F0F0F0", borderRadius: 100, marginTop:6}}>
                        <View style={{height: 5, width: "100%", backgroundColor: "#A3A3A3", borderRadius: 100}}></View>
                    </View>
                </View>


                
                <View style={{height: 40}}></View>
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
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M25.2 7H18.2V2.80005C18.2 1.26001 16.94 0 15.4 0H12.6C11.06 0 9.79999 1.26001 9.79999 2.80005V7H2.79999C1.26001 7 0 8.26001 0 9.80005V25.2C0 26.74 1.26001 28 2.79999 28H25.2C26.74 28 28 26.74 28 25.2V9.80005C28 8.26001 26.74 7 25.2 7ZM12.6 9V2.80005H15.4V9H12.6ZM11 16C11 17.1046 10.1046 18 9 18C7.89545 18 7 17.1046 7 16C7 14.8954 7.89545 14 9 14C10.1046 14 11 14.8954 11 16ZM9 19C9.98666 19 10.92 19.2667 11.7733 19.7644C12.52 20.1912 13 21.1511 13 22.2356V23H5V22.2356C5 21.1511 5.47998 20.1912 6.22668 19.7644C7.08002 19.2667 8.01334 19 9 19ZM16 14H22V16H16V14ZM16 18H22V20H16V18Z" fill="#5CBBBB"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'services')}>
                <Svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M8 0C7.44772 0 7 0.447754 7 1V27C7 27.5522 7.44772 28 8 28H11C11.5523 28 12 27.5522 12 27V1C12 0.447754 11.5523 0 11 0H8Z" fill="#BEBEBE"/>
                    <Path d="M1 16C0.447723 16 0 16.4478 0 17V27C0 27.5522 0.447723 28 1 28H4C4.55228 28 5 27.5522 5 27V17C5 16.4478 4.55228 16 4 16H1Z" fill="#BEBEBE"/>
                    <Path d="M14 10C14 9.44775 14.4477 9 15 9H18C18.5523 9 19 9.44775 19 10V27C19 27.5522 18.5523 28 18 28H15C14.4477 28 14 27.5522 14 27V10Z" fill="#BEBEBE"/>
                    <Path d="M22 16C21.4477 16 21 16.4478 21 17V27C21 27.5522 21.4477 28 22 28H25C25.5523 28 26 27.5522 26 27V17C26 16.4478 25.5523 16 25 16H22Z" fill="#BEBEBE"/>
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
    membershipCard: {
        width: "100%",
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 10,
        marginVertical: 5,
        justifyContent: "space-between",
        padding: 20
    },
    membershipCardInvalid: {
        width: "100%",
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 10,
        marginVertical: 5,
        justifyContent: "space-between",
        padding: 20,
        opacity: 0.6
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
