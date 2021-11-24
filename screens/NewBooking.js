import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon, Touchable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';


export default function NewBookingsScreen({route, navigation}) {

    const goToScreen = (x) => {
        if(x == "home") {
            navigation.navigate('HomeScreen');
        }
    }

    return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.homeScreen}>
            <StatusBar backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.homeHeader}>
                    <TouchableOpacity onPress={goToScreen.bind(this, 'home')}>
                        <Svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.0208 0.707105C12.4114 0.316582 13.0445 0.316582 13.435 0.707106L14.8493 2.12132C15.2398 2.51184 15.2398 3.14501 14.8493 3.53553L7.3848 11H27C27.5523 11 28 11.4477 28 12V14C28 14.5523 27.5523 15 27 15H7.92896L14.8493 21.9203C15.2398 22.3108 15.2398 22.944 14.8493 23.3345L13.435 24.7487C13.0445 25.1393 12.4114 25.1393 12.0208 24.7487L0.707108 13.435C0.316583 13.0445 0.316584 12.4113 0.707109 12.0208L12.0208 0.707105Z" fill="#B3B3B3"/>
                        </Svg>
                    </TouchableOpacity>
                    <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Book class</Text>
                </View>
                
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bookingCard}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>Cardio</Text>
                            <Text style={{fontSize: 16, color: "#A0A0A0", marginLeft: 10}}>(8 available)</Text>
                        </View>
                        <Text style={{color: "#696969"}}>3 Dec 2021, 8:00</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: "#5CBBBB", height:40, paddingHorizontal:30, justifyContent: "center", borderRadius: 100}}>
                        <Text style={{color: "white"}}>Book</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height:40}}></View>
            </SafeAreaView> 
        </ScrollView>
        
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
