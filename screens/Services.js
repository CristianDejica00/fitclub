import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';
import OpenSms from '@lowkey/react-native-open-sms';


export default function ServicesScreen({route, navigation}) {
    const [sesdata, setSesdata] = useState('');
    const [services, setServices] = useState('');

    
    useEffect(() => {
        const f = async () => {
          try {
            const data = await AsyncStorage.getItem("@sessiondata");
              if (data !== null) {
                setSesdata(data);

                let myTempToken = JSON.parse(data)['token_type'] + " " + JSON.parse(data)['access_token'];

                var myHeaders = new Headers();
                myHeaders.append("Authorization", myTempToken);
            
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
            
                fetch("http://ffapi.moncea.ro/public//api/users/"+ JSON.parse(data)['id'] +"/services", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setServices(JSON.parse(result)['data']);
                })
                .catch(error => console.log('error', error));

                
              }
            } catch (error) {
                console.log(error);
          }
        };
        f();
    }, []);

    const consultant_mobile = "+40727155898";

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

    const textWhatsapp = (x) => {
        Linking.openURL('whatsapp://send?text=' + x + '&phone=' + consultant_mobile);
    }

    const textSMS = (x) => {
        Linking.openURL('sms:'+consultant_mobile+'?body='+x);
    }

    if(services) {
        return (
            <View style={{flex: 1}}>
            <ScrollView style={styles.homeScreen}>
                <StatusBar backgroundColor="#FFFFFF"/>
                <SafeAreaView style={styles.safearea}>
                    <View style={styles.homeHeader}>
                        <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Your services</Text>
                    </View>
                    
    
                    {
                        services.map(n => (
                            <View key={n['id']} style={styles.bookingCard}>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{fontSize: 16, color: "#5CBBBB", fontWeight: "bold"}}>{n['details']['en']['service']}</Text>
                                    </View>
                                    <Text style={{color: "#696969", fontSize: 12}}>{n['details']['en']['description']}</Text>
                                </View>
                                <TouchableOpacity onPress={textWhatsapp.bind(this, "https://twitter.com/Google?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor")} style={styles.whatsappbutton}>
                                    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M12.7533 2.17969C11.3504 0.773437 9.48214 0 7.49665 0C3.39844 0 0.0636161 3.33482 0.0636161 7.43304C0.0636161 8.74219 0.405134 10.0212 1.05469 11.1496L0 15L3.94085 13.9654C5.02567 14.558 6.24777 14.8694 7.4933 14.8694H7.49665C11.5915 14.8694 15 11.5346 15 7.43638C15 5.45089 14.1562 3.58594 12.7533 2.17969V2.17969ZM7.49665 13.6172C6.38504 13.6172 5.29687 13.3192 4.34933 12.7567L4.125 12.6228L1.78795 13.2355L2.41071 10.9554L2.26339 10.721C1.64397 9.73661 1.3192 8.60156 1.3192 7.43304C1.3192 4.0279 4.09152 1.25558 7.5 1.25558C9.15067 1.25558 10.7009 1.89844 11.8661 3.06696C13.0312 4.23549 13.7478 5.78571 13.7444 7.43638C13.7444 10.8449 10.9018 13.6172 7.49665 13.6172V13.6172ZM10.885 8.98996C10.7009 8.89621 9.78683 8.44754 9.61607 8.38728C9.44531 8.32366 9.32143 8.29353 9.19754 8.48103C9.07366 8.66853 8.71875 9.08371 8.60826 9.21094C8.50112 9.33482 8.39062 9.35156 8.20647 9.25781C7.11496 8.71205 6.39844 8.28348 5.67857 7.04799C5.48772 6.71987 5.86942 6.7433 6.22433 6.03348C6.2846 5.9096 6.25446 5.80246 6.20759 5.70871C6.16071 5.61496 5.78906 4.70089 5.63504 4.32924C5.48437 3.96763 5.33036 4.01786 5.21652 4.01116C5.10937 4.00446 4.98549 4.00446 4.86161 4.00446C4.73772 4.00446 4.53683 4.05134 4.36607 4.23549C4.19531 4.42299 3.71652 4.87165 3.71652 5.78571C3.71652 6.69978 4.38281 7.58371 4.47321 7.70759C4.56696 7.83147 5.78237 9.70647 7.64732 10.5134C8.82589 11.0223 9.28795 11.0658 9.87723 10.9788C10.2355 10.9252 10.9754 10.5301 11.1295 10.0949C11.2835 9.6596 11.2835 9.28795 11.2366 9.21094C11.1931 9.12723 11.0692 9.08036 10.885 8.98996Z" fill="white"/>
                                    </Svg>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={textSMS.bind(this, "https://twitter.com/Google?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor")} style={styles.smsbutton}>
                                    <Svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop: 2}}>
                                        <Path d="M12.25 0H1.75C0.784766 0 0 0.78472 0 1.7499V9.62444C0 10.5896 0.784766 11.3743 1.75 11.3743H4.375L3.375 14.6711C3.375 14.939 3.68125 15.0949 3.89727 14.9363L8.3125 11.3743H12.25C13.2152 11.3743 14 10.5896 14 9.62444V1.7499C14 0.78472 13.2152 0 12.25 0Z" fill="white"/>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
    
                    
    
    
    
    
    
    
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
                    <Svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 0C7.44772 0 7 0.447754 7 1V27C7 27.5522 7.44772 28 8 28H11C11.5523 28 12 27.5522 12 27V1C12 0.447754 11.5523 0 11 0H8Z" fill="#5CBBBB"/>
                        <Path d="M1 16C0.447723 16 0 16.4478 0 17V27C0 27.5522 0.447723 28 1 28H4C4.55228 28 5 27.5522 5 27V17C5 16.4478 4.55228 16 4 16H1Z" fill="#5CBBBB"/>
                        <Path d="M14 10C14 9.44775 14.4477 9 15 9H18C18.5523 9 19 9.44775 19 10V27C19 27.5522 18.5523 28 18 28H15C14.4477 28 14 27.5522 14 27V10Z" fill="#5CBBBB"/>
                        <Path d="M22 16C21.4477 16 21 16.4478 21 17V27C21 27.5522 21.4477 28 22 28H25C25.5523 28 26 27.5522 26 27V17C26 16.4478 25.5523 16 25 16H22Z" fill="#5CBBBB"/>
                    </Svg>
                </TouchableOpacity>
            </View>
            
        </View>
        );
    } else {
        return(
            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                <Image style={{width: 60, height:60, marginTop: 20}} resizeMode="contain" source={require('../assets/spinner.gif')} />
                <Text style={{marginTop:10}}>This might take a minute</Text>
            </View>
        );
    }
    
    

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
        paddingHorizontal: 20,
        paddingVertical: 14
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
    whatsappbutton: {
        height: 40, 
        width: 40,
        backgroundColor: "#25d366",
        borderRadius: 100,
        alignItems: "center",
        marginLeft: 10,
        justifyContent: "center"
    },
    smsbutton: {
        height: 40, 
        width: 40,
        backgroundColor: "#5CBBBB",
        marginLeft: 10,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    }
});
