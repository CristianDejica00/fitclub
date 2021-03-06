import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon, Touchable, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path, Defs, Pattern } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackActions, NavigationActions, CommonActions  } from 'react-navigation';


export default function HomeScreen({route, navigation}) {
    
    const [sesdata, setSesdata] = useState('');
    const [socialMedia, setSocialMedia] = useState('');

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
            
                fetch("http://ffapi.moncea.ro/public/api/v1/settings", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setSocialMedia(JSON.parse(result)['social_media']);
                    console.log(socialMedia);
                })
                .catch(error => console.log('error', error));

              }
            } catch (error) {
            console.log(error);
          }
        };
        f();
    }, []);


    const goToScreen = (x) => {
        if(x == "home") {
            navigation.navigate('HomeScreen');
        } else if(x == "bookings") {
            navigation.navigate('BookingsScreen');
        } else if(x == "notifications") {
            navigation.navigate('NotificationsScreen');
        } else if(x == "memberships") {
            navigation.navigate('MembershipsScreen');
            modalizeRef.current?.close();
        } else if(x == "checkins") {
            navigation.navigate('CheckinsScreen');
        } else if(x == "settings") {
            navigation.navigate('SettingsScreen');
            modalizeRef2.current?.close();
        } else if(x == "services") {
            navigation.navigate('ServicesScreen');
            modalizeRef2.current?.close();
        } else if(x == "vouchers") {
            navigation.navigate('VouchersScreen');
            modalizeRef2.current?.close();
        } else if(x == "training") {
            navigation.navigate('TrainingScreen');
            modalizeRef2.current?.close();
        } else if(x == "locations") {
            navigation.navigate('LocationsScreen');
            modalizeRef2.current?.close();
        } else if(x == "clubrules") {
            navigation.navigate('ClubRulesScreen');
            modalizeRef2.current?.close();
        } else if(x == "terms") {
            navigation.navigate('TermsScreen');
            modalizeRef2.current?.close();
        } else if(x == "newbookings") {
            navigation.navigate('NewBookingsScreen');
            modalizeRef2.current?.close();
        }
    }

    const modalizeRef = useRef(null);
    const modalizeRef2 = useRef(null);

    const onOpenMemberCard = () => {
        modalizeRef.current?.open();
    };

    const onOpenSideMenu = () => {
        modalizeRef2.current?.open();
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("@isremembered");
            navigation.navigate('LoginScreen');
        }
        catch(exception) {
            console.log(exception);
        }
    }

    const goToSite = (u) => {
        Linking.openURL(u);
    }

    if(sesdata) {
    return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.homeScreen}>
            <StatusBar backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.homeHeader}>
                    <TouchableOpacity onPress={onOpenSideMenu}>
                        <Svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Rect y="20" width="24" height="4" rx="1" fill="#AAAAAA"/>
                            <Rect y="10" width="15" height="4" rx="1" fill="#AAAAAA"/>
                            <Rect width="32" height="4" rx="1" fill="#AAAAAA"/>
                        </Svg>
                    </TouchableOpacity>
                    <Image style={{height:34, width:31}} resizeMode="contain" source={require('../assets/icon.png')} />
                    <TouchableOpacity onPress={goToScreen.bind(this, 'settings')}>
                        <Svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M25.587 16.4687C25.6491 16 25.6801 15.5156 25.6801 15C25.6801 14.5 25.6491 14 25.5714 13.5312L28.7236 11.0625C29.0031 10.8437 29.0807 10.4219 28.9099 10.1094L25.9286 4.92188C25.7422 4.57812 25.354 4.46875 25.0124 4.57812L21.3012 6.07812C20.5248 5.48437 19.7019 4.98437 18.7857 4.60937L18.2267 0.640625C18.1646 0.265625 17.854 0 17.4814 0H11.5186C11.146 0 10.8509 0.265625 10.7888 0.640625L10.2298 4.60937C9.31366 4.98437 8.47516 5.5 7.71429 6.07812L4.00311 4.57812C3.66149 4.45312 3.27329 4.57812 3.08696 4.92188L0.121119 10.1094C-0.0652168 10.4375 -0.00310523 10.8437 0.307454 11.0625L3.45963 13.5312C3.38199 14 3.31988 14.5156 3.31988 15C3.31988 15.4844 3.35093 16 3.42857 16.4687L0.276398 18.9375C-0.0031052 19.1562 -0.0807448 19.5781 0.0900627 19.8906L3.07143 25.0781C3.25776 25.4219 3.64596 25.5312 3.98758 25.4219L7.69876 23.9219C8.47515 24.5156 9.29814 25.0156 10.2143 25.3906L10.7733 29.3594C10.8509 29.7344 11.146 30 11.5186 30H17.4814C17.854 30 18.1646 29.7344 18.2112 29.3594L18.7702 25.3906C19.6863 25.0156 20.5248 24.5156 21.2857 23.9219L24.9969 25.4219C25.3385 25.5469 25.7267 25.4219 25.913 25.0781L28.8944 19.8906C29.0807 19.5469 29.0031 19.1562 28.7081 18.9375L25.587 16.4687ZM14.5 20.625C11.4255 20.625 8.90994 18.0938 8.90994 15C8.90994 11.9062 11.4255 9.375 14.5 9.375C17.5745 9.375 20.0901 11.9062 20.0901 15C20.0901 18.0938 17.5745 20.625 14.5 20.625Z" fill="#AAAAAA"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.seemembercardbutton} onPress={onOpenMemberCard}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M0 8H8V0H0V8ZM2 2H6V6H2V2Z" fill="white"/>
                            <Path d="M0 18H8V10H0V18ZM2 12H6V16H2V12Z" fill="white"/>
                            <Path d="M10 0V8H18V0H10ZM16 6H12V2H16V6Z" fill="white"/>
                            <Path d="M18 16H16V18H18V16Z" fill="white"/>
                            <Path d="M12 10H10V12H12V10Z" fill="white"/>
                            <Path d="M14 12H12V14H14V12Z" fill="white"/>
                            <Path d="M12 14H10V16H12V14Z" fill="white"/>
                            <Path d="M14 16H12V18H14V16Z" fill="white"/>
                            <Path d="M16 14H14V16H16V14Z" fill="white"/>
                            <Path d="M16 10H14V12H16V10Z" fill="white"/>
                            <Path d="M18 12H16V14H18V12Z" fill="white"/>
                        </Svg>
                        <Text style={{color:"white",marginLeft:10, fontSize:16}}>View member card</Text>
                    </View>
                    <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M10.5169 15.3165C10.1282 15.6964 9.50728 15.6964 9.11866 15.3165L8.73079 14.9372C8.32959 14.545 8.32959 13.8995 8.73079 13.5072L13.2526 9.08607L0.999999 9.08606C0.447714 9.08606 -1.26377e-06 8.63835 -1.21549e-06 8.08606L-1.17054e-06 7.57191C-1.12226e-06 7.01962 0.447715 6.57191 0.999999 6.57191L12.9028 6.57191L8.73079 2.4928C8.32959 2.10054 8.32959 1.45502 8.73079 1.06275L9.11866 0.683529C9.50728 0.303562 10.1282 0.303562 10.5169 0.683529L17.2687 7.28497C17.6699 7.67724 17.6699 8.32276 17.2687 8.71502L10.5169 15.3165Z" fill="white"/>
                    </Svg>
                </TouchableOpacity>
                <View style={styles.homeSectionTitleArea}>
                    <Text style={styles.homeSectionTitle}>Available classes</Text>
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

                <TouchableOpacity style={styles.newbookingbutton} onPress={goToScreen.bind(this, 'newbookings')}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{color:"white", fontSize:16}}>See more classes</Text>
                    </View>
                </TouchableOpacity>
                
                <Image style={{width: "100%", marginTop: 20}} resizeMode="contain" source={require('../assets/adexample.png')} />


                <TouchableOpacity style={styles.voucherCTA} onPress={goToScreen.bind(this, 'vouchers')}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.voucherCTAGradient} colors={['#007AFF', '#7CB8F9']}>
                        <View>
                            <View style={{flexDirection:"row", alignItems: "center"}}>
                                <Text style={{color: "white", fontSize:18, fontWeight: "bold"}}>Vouchers</Text>
                                <Svg style={{marginLeft: 10, marginTop: 1}} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M9.42034 13.3326C9.03314 13.7052 8.42064 13.7052 8.03344 13.3326L7.85926 13.1649C7.45053 12.7716 7.45053 12.1173 7.85926 11.7239L11.7801 7.95031L0.999998 7.95031C0.447713 7.95031 -1.33933e-06 7.50259 -1.29104e-06 6.95031L-1.27357e-06 6.75042C-1.22529e-06 6.19813 0.447714 5.75042 0.999998 5.75042L11.4692 5.75042L7.85926 2.27606C7.45053 1.88267 7.45053 1.22844 7.85926 0.835051L8.03344 0.66741C8.42064 0.294751 9.03315 0.294752 9.42034 0.667411L15.2514 6.27949C15.6601 6.67288 15.6601 7.32712 15.2514 7.72051L9.42034 13.3326Z" fill="white"/>
                                </Svg>
                            </View>
                            <Text style={{color: "white", fontSize:13, marginTop:5}}>Share and build your community</Text>
                        </View>
                        <Svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M36.5 73C56.6584 73 73 56.6584 73 36.5C73 16.3416 56.6584 0 36.5 0C16.3416 0 0 16.3416 0 36.5C0 56.6584 16.3416 73 36.5 73Z" fill="#FAE554"/>
                            <Path d="M12.775 0C10.7592 0 9.125 1.63417 9.125 3.65V60.6433C15.8131 68.2207 25.5984 73 36.5 73C47.4015 73 57.1867 68.2207 63.875 60.6433V3.65C63.875 1.63417 62.2409 0 60.225 0H12.775Z" fill="#C5D2DD"/>
                            <Path d="M9.125 3.65C9.125 1.63416 10.7592 0 12.775 0H60.225C62.2409 0 63.875 1.63416 63.875 3.65V10.95H9.125V3.65Z" fill="#89589A"/>
                            <Path d="M17.155 3.65C17.155 1.63416 18.7891 0 20.805 0H60.225C62.2409 0 63.875 1.63416 63.875 3.65V10.95H17.155V3.65Z" fill="#A86DBD"/>
                            <Path d="M17.155 10.9501H63.875V60.5901H20.805C18.7891 60.5901 17.155 58.956 17.155 56.9401V10.9501Z" fill="#D9E3EC"/>
                            <Path d="M43.8 3.65002H14.6C13.592 3.65002 12.775 4.4671 12.775 5.47502C12.775 6.48294 13.592 7.30002 14.6 7.30002H43.8C44.8079 7.30002 45.625 6.48294 45.625 5.47502C45.625 4.4671 44.8079 3.65002 43.8 3.65002Z" fill="#C5D1DD"/>
                            <Path d="M43.8 3.65002H21.9C20.8921 3.65002 20.075 4.4671 20.075 5.47502C20.075 6.48294 20.8921 7.30002 21.9 7.30002H43.8C44.8079 7.30002 45.625 6.48294 45.625 5.47502C45.625 4.4671 44.8079 3.65002 43.8 3.65002Z" fill="#D9E3EC"/>
                            <Path d="M60.225 5.47502C60.225 4.4671 59.4079 3.65002 58.4 3.65002C57.3921 3.65002 56.575 4.4671 56.575 5.47502C56.575 6.48294 57.3921 7.30002 58.4 7.30002C59.4079 7.30002 60.225 6.48294 60.225 5.47502Z" fill="#FF6C6C"/>
                            <Path d="M52.925 5.47502C52.925 4.4671 52.1079 3.65002 51.1 3.65002C50.092 3.65002 49.275 4.4671 49.275 5.47502C49.275 6.48294 50.092 7.30002 51.1 7.30002C52.1079 7.30002 52.925 6.48294 52.925 5.47502Z" fill="#FAE554"/>
                            <Path d="M48.18 64.24H24.82C24.2153 64.24 23.725 64.7302 23.725 65.335C23.725 65.9397 24.2153 66.43 24.82 66.43H48.18C48.7848 66.43 49.275 65.9397 49.275 65.335C49.275 64.7302 48.7848 64.24 48.18 64.24Z" fill="#97A4B0"/>
                            <Path d="M44.53 59.4949H28.47C27.8652 59.4949 27.375 59.9851 27.375 60.5899C27.375 61.1946 27.8652 61.6849 28.47 61.6849H44.53C45.1348 61.6849 45.625 61.1946 45.625 60.5899C45.625 59.9851 45.1348 59.4949 44.53 59.4949Z" fill="#97A4B0"/>
                            <Path d="M45.99 43.7999H27.01C25.1958 43.7999 23.725 45.2707 23.725 47.0849C23.725 48.8992 25.1958 50.3699 27.01 50.3699H45.99C47.8043 50.3699 49.275 48.8992 49.275 47.0849C49.275 45.2707 47.8043 43.7999 45.99 43.7999Z" fill="#669CD7"/>
                            <Path d="M45.99 43.7999H32.12C30.3057 43.7999 28.835 45.2707 28.835 47.0849C28.835 48.8992 30.3057 50.3699 32.12 50.3699H45.99C47.8042 50.3699 49.275 48.8992 49.275 47.0849C49.275 45.2707 47.8042 43.7999 45.99 43.7999Z" fill="#6EADF2"/>
                            <Path d="M48.2191 58.1405C47.6267 58.7329 46.6204 58.5227 46.3149 57.7419L42.7528 48.6388C42.3835 47.695 43.315 46.7635 44.2588 47.1329L53.3619 50.6949C54.1427 51.0004 54.3529 52.0067 53.7605 52.5991L51.8939 54.4657L55.3457 57.9175C55.7998 58.3716 55.7998 59.1074 55.3457 59.5615L55.1815 59.7257C54.7274 60.1798 53.9916 60.1798 53.5375 59.7257L50.0857 56.2739L48.2191 58.1405Z" fill="#5C5C5C"/>
                            <Path d="M22.265 26.8578C22.265 25.9339 22.956 25.1849 23.8084 25.1849H50.6518C51.5041 25.1849 52.195 25.9339 52.195 26.8578V27.527C52.195 28.451 51.5041 29.1999 50.6518 29.1999H23.8084C22.956 29.1999 22.265 28.451 22.265 27.527V26.8578Z" fill="#2C3737"/>
                            <Path d="M22.265 24.8656C22.265 24.4372 22.6123 24.09 23.0406 24.09H30.2494C30.6778 24.09 31.025 24.4372 31.025 24.8656V29.5193C31.025 29.9477 30.6778 30.295 30.2494 30.295H23.0406C22.6123 30.295 22.265 29.9477 22.265 29.5193V24.8656Z" fill="#1D2223"/>
                            <Path d="M22.265 25.9834C22.265 25.5424 22.6123 25.1849 23.0406 25.1849H30.2494C30.6778 25.1849 31.025 25.5424 31.025 25.9834V29.4965C31.025 29.9375 30.6778 30.2949 30.2494 30.2949H23.0406C22.6123 30.2949 22.265 29.9375 22.265 29.4965V25.9834Z" fill="#242A2A"/>
                            <Path d="M33.215 26.8578C33.215 25.9339 33.9043 25.1849 34.7545 25.1849H50.6555C51.5059 25.1849 52.195 25.9339 52.195 26.8578V27.527C52.195 28.451 51.5059 29.1999 50.6555 29.1999H34.7545C33.9043 29.1999 33.215 28.451 33.215 27.527V26.8578Z" fill="#374243"/>
                            <Path d="M41.975 24.8656C41.975 24.4372 42.3222 24.09 42.7507 24.09H49.9594C50.3879 24.09 50.735 24.4372 50.735 24.8656V29.5193C50.735 29.9477 50.3879 30.295 49.9594 30.295H42.7507C42.3222 30.295 41.975 29.9477 41.975 29.5193V24.8656Z" fill="#1D2223"/>
                            <Path d="M41.975 25.9834C41.975 25.5424 42.3222 25.1849 42.7507 25.1849H49.9594C50.3879 25.1849 50.735 25.5424 50.735 25.9834V29.4965C50.735 29.9375 50.3879 30.2949 49.9594 30.2949H42.7507C42.3222 30.2949 41.975 29.9375 41.975 29.4965V25.9834Z" fill="#242A2A"/>
                            <Path d="M48.545 36.8519C48.545 37.2625 48.2183 37.595 47.815 37.595H44.895C44.4917 37.595 44.165 37.2625 44.165 36.8519V17.5331C44.165 17.1227 44.4917 16.79 44.895 16.79H47.815C48.2183 16.79 48.545 17.1227 48.545 17.5331V36.8519Z" fill="#2C3737"/>
                            <Path d="M48.545 36.8563C48.545 37.2644 48.2183 37.5951 47.815 37.5951H44.895C44.4917 37.5951 44.165 37.2644 44.165 36.8563V19.7188C44.165 19.3108 44.4917 18.9801 44.895 18.9801H47.815C48.2183 18.9801 48.545 19.3108 48.545 19.7188V36.8563Z" fill="#384243"/>
                            <Path d="M52.925 33.9267C52.925 34.34 52.5983 34.675 52.195 34.675H48.545V19.71H52.195C52.5983 19.71 52.925 20.045 52.925 20.4582V33.9267Z" fill="#1D2223"/>
                            <Path d="M52.925 33.9236C52.925 34.3386 52.5983 34.675 52.195 34.675H48.545V21.9H52.195C52.5983 21.9 52.925 22.2365 52.925 22.6515V33.9236Z" fill="#242A2B"/>
                            <Path d="M24.455 36.8519C24.455 37.2625 24.7818 37.595 25.185 37.595H28.105C28.5082 37.595 28.835 37.2625 28.835 36.8519V17.5331C28.835 17.1227 28.5082 16.79 28.105 16.79H25.185C24.7818 16.79 24.455 17.1227 24.455 17.5331V36.8519Z" fill="#2C3737"/>
                            <Path d="M24.455 36.8563C24.455 37.2644 24.7818 37.5951 25.185 37.5951H28.105C28.5082 37.5951 28.835 37.2644 28.835 36.8563V19.7188C28.835 19.3108 28.5082 18.9801 28.105 18.9801H25.185C24.7818 18.9801 24.455 19.3108 24.455 19.7188V36.8563Z" fill="#384243"/>
                            <Path d="M20.075 33.9267C20.075 34.34 20.4018 34.675 20.805 34.675H24.455V19.71H20.805C20.4018 19.71 20.075 20.045 20.075 20.4582V33.9267Z" fill="#1D2223"/>
                            <Path d="M20.075 33.9236C20.075 34.3386 20.4018 34.675 20.805 34.675H24.455V21.9H20.805C20.4018 21.9 20.075 22.2365 20.075 22.6515V33.9236Z" fill="#242A2B"/>
                        </Svg>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.trainingCTA} onPress={goToScreen.bind(this, 'training')}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.trainingCTAGradient} colors={['#FFC700', '#F9F47C']}>
                        <View>
                            <View style={{flexDirection:"row", alignItems: "center"}}>
                                <Text style={{color: "#323232", fontSize:18, fontWeight: "bold"}}>Online training</Text>
                                <Svg style={{marginLeft: 10, marginTop: 1}} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M9.42034 13.3326C9.03314 13.7052 8.42064 13.7052 8.03344 13.3326L7.85926 13.1649C7.45053 12.7716 7.45053 12.1173 7.85926 11.7239L11.7801 7.95031L0.999998 7.95031C0.447713 7.95031 -1.33933e-06 7.50259 -1.29104e-06 6.95031L-1.27357e-06 6.75042C-1.22529e-06 6.19813 0.447714 5.75042 0.999998 5.75042L11.4692 5.75042L7.85926 2.27606C7.45053 1.88267 7.45053 1.22844 7.85926 0.835051L8.03344 0.66741C8.42064 0.294751 9.03315 0.294752 9.42034 0.667411L15.2514 6.27949C15.6601 6.67288 15.6601 7.32712 15.2514 7.72051L9.42034 13.3326Z" fill="#323232"/>
                                </Svg>
                            </View>
                            <Text style={{color: "#5B5B5B", fontSize:13, marginTop:5}}>Keep up with our exercises</Text>
                        </View>
                        <Svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M61.9261 12.0741C76.0927 26.2405 76.0927 49.2089 61.9261 63.3752C47.7598 77.5419 24.7913 77.5419 10.6249 63.3752C-3.54162 49.2089 -3.54162 26.2405 10.6249 12.0741C24.7913 -2.0924 47.7598 -2.0924 61.9261 12.0741Z" fill="#FCD62B"/>
                            <Path d="M61.9261 12.0741C76.0927 26.2405 76.0927 49.2089 61.9261 63.3752C47.7598 77.5419 24.7913 77.5419 10.6249 63.3752C-3.54162 49.2089 -3.54162 26.2405 10.6249 12.0741C24.7913 -2.0924 47.7598 -2.0924 61.9261 12.0741Z" fill="#67ADF9"/>
                            <Path d="M13.2993 59.6748C11.8827 58.2582 11.8827 55.9613 13.2993 54.5447L63.9782 3.86583C65.3948 2.44919 67.6917 2.44918 69.1083 3.86583L70.1345 4.89184C71.5511 6.30851 71.5511 8.60533 70.1345 10.022L19.4555 60.701C18.0388 62.1176 15.742 62.1176 14.3253 60.701L13.2993 59.6748Z" fill="#C7E0E1"/>
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M16.268 67.9924C14.2739 66.6712 12.3817 65.1321 10.6248 63.3753C8.86792 61.6184 7.32893 59.7263 6.00781 57.7319L22.1676 41.5722C22.8759 40.8638 24.0243 40.8638 24.7326 41.5722L32.4278 49.2674C33.1362 49.9758 33.1362 51.1243 32.4278 51.8324L16.268 67.9924Z" fill="#9CC7CA"/>
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M16.268 67.9924C14.2739 66.6713 12.3817 65.1321 10.6248 63.3753C9.58309 62.3338 8.61802 61.2444 7.72952 60.1145L24.2196 43.6244C24.9279 42.9159 26.0764 42.9159 26.7847 43.6244L32.4278 49.2674C33.1362 49.9758 33.1362 51.1243 32.4278 51.8324L16.268 67.9924Z" fill="#B0D8DB"/>
                            <Path d="M1.64709 39.0072C0.938764 38.2987 0.938764 37.1506 1.64709 36.4421L6.77722 31.312C7.48553 30.6037 8.63394 30.6037 9.34229 31.312L42.6881 64.6579C43.3966 65.366 43.3966 66.5145 42.6881 67.223L37.558 72.353C36.8496 73.0615 35.7012 73.0615 34.9929 72.353L1.64709 39.0072Z" fill="#2C3737"/>
                            <Path d="M5.23821 42.5984C4.52989 41.89 4.52989 40.7415 5.23821 40.033L10.3683 34.9031C11.0766 34.1947 12.2251 34.1947 12.9334 34.9031L42.6881 64.6579C43.3966 65.366 43.3966 66.5145 42.6881 67.2229L37.558 72.353C36.8496 73.0615 35.7013 73.0615 34.9929 72.353L5.23821 42.5984Z" fill="#384243"/>
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.6079 63.3582C5.94513 58.6896 2.81958 53.0665 1.23111 47.1184L5.49466 42.855L31.1453 68.5054L26.8817 72.7692C20.9336 71.1807 15.3106 68.0552 10.6419 63.3923C10.6362 63.3869 10.6305 63.3811 10.6248 63.3753C10.6192 63.3699 10.6135 63.364 10.6079 63.3582Z" fill="#1D2323"/>
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.6096 63.36C7.45851 60.2055 5.00933 56.6149 3.26208 52.7824L9.34226 46.7023L31.1453 68.5053L26.8817 72.7691C20.9328 71.1802 15.3091 68.054 10.64 63.3904C10.635 63.3854 10.6299 63.3803 10.6248 63.3752C10.6198 63.3701 10.6147 63.365 10.6096 63.36Z" fill="#242A2B"/>
                            <Path d="M31.4019 41.5722C29.9852 40.1557 29.9852 37.8587 31.4019 36.4421L63.9782 3.86583C65.3947 2.44918 67.6917 2.44918 69.1083 3.86583L70.1345 4.89184C71.551 6.30851 71.551 8.60533 70.1345 10.022L37.558 42.5985C36.1415 44.015 33.8445 44.015 32.4279 42.5985L31.4019 41.5722Z" fill="#DFF0F1"/>
                            <Path d="M40.1231 26.1819C39.4146 25.4735 39.4146 24.3251 40.1231 23.6168L58.0784 5.66136C58.7868 4.95305 59.9353 4.95305 60.6438 5.66136L68.3389 13.3566C69.047 14.0649 69.047 15.2133 68.3389 15.9216L50.3832 33.8771C49.6751 34.5854 48.5267 34.5854 47.8182 33.8771L40.1231 26.1819Z" fill="#B0D8DB"/>
                            <Path d="M70.9039 36.4421C71.612 37.1506 71.612 38.2987 70.9039 39.0072L65.7738 44.1373C65.0653 44.8457 63.9169 44.8457 63.2088 44.1373L29.8628 10.7915C29.1545 10.0832 29.1545 8.93474 29.8628 8.22643L34.9929 3.09631C35.7012 2.38798 36.8495 2.38798 37.558 3.09631L70.9039 36.4421Z" fill="#384243"/>
                            <Path d="M73.4689 23.6168C74.177 24.3251 74.177 25.4736 73.4689 26.1819L67.0562 32.5945L41.4058 6.9439L47.8182 0.531242C48.5266 -0.177081 49.6751 -0.177081 50.3832 0.531242L73.4689 23.6168Z" fill="#242A2B"/>
                            <Path d="M40.1231 26.1819C39.4146 25.4735 39.4146 24.3251 40.1231 23.6168L58.0784 5.66136C58.7868 4.95305 59.9353 4.95305 60.6438 5.66136L68.3389 13.3566C69.047 14.0649 69.047 15.2133 68.3389 15.9216L50.3832 33.8771C49.6751 34.5854 48.5267 34.5854 47.8182 33.8771L40.1231 26.1819Z" fill="#9CC7CA"/>
                            <Path d="M42.1752 28.2339C41.4667 27.5255 41.4667 26.3771 42.1752 25.6688L60.1304 7.71337C60.8389 7.00505 61.9874 7.00505 62.6955 7.71337L68.3389 13.3565C69.047 14.0648 69.047 15.2132 68.3389 15.9216L50.3832 33.877C49.6751 34.5853 48.5266 34.5853 47.8182 33.877L42.1752 28.2339Z" fill="#B0D8DB"/>
                            <Path d="M70.9039 36.4421C71.612 37.1506 71.612 38.2987 70.9039 39.0072L65.7738 44.1373C65.0653 44.8457 63.9169 44.8457 63.2088 44.1373L29.8628 10.7915C29.1545 10.0832 29.1545 8.93474 29.8628 8.22643L34.9929 3.09631C35.7012 2.38798 36.8495 2.38798 37.558 3.09631L70.9039 36.4421Z" fill="#2C3737"/>
                            <Path d="M70.9039 36.4421C71.612 37.1506 71.612 38.2987 70.9039 39.0071L65.7738 44.1372C65.0653 44.8457 63.9169 44.8457 63.2088 44.1372L33.4539 14.3826C32.7456 13.6742 32.7456 12.5258 33.4539 11.8175L38.5839 6.68736C39.2923 5.97905 40.4408 5.97905 41.1489 6.68736L70.9039 36.4421Z" fill="#384243"/>
                            <Path d="M73.4689 23.6168C74.177 24.3251 74.177 25.4736 73.4689 26.1819L67.0562 32.5945L41.4058 6.9439L47.8182 0.531242C48.5266 -0.177081 49.6751 -0.177081 50.3832 0.531242L73.4689 23.6168Z" fill="#1D2223"/>
                            <Path d="M73.4689 23.6167C74.177 24.3251 74.177 25.4735 73.4689 26.1818L67.0561 32.5945L45.2531 10.7914L51.6659 4.37877C52.374 3.67046 53.5225 3.67046 54.2309 4.37877L73.4689 23.6167Z" fill="#242A2B"/>
                        </Svg>
                    </LinearGradient>
                </TouchableOpacity>

                
                <View style={{height:40}}></View>
            </SafeAreaView> 
        </ScrollView>
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'home')}>
                <Svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M0 13.7333L14 0L28 13.7333L26.46 15.7522L24.1818 14.0144V26H15.5V17.5H12.5V26H3.81818V14.0144L1.54 15.765L0 13.7333Z" fill="#5CBBBB"/>
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
            <TouchableOpacity style={styles.navbarItem} onPress={goToScreen.bind(this, 'services')}>
                <Svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M8 0C7.44772 0 7 0.447754 7 1V27C7 27.5522 7.44772 28 8 28H11C11.5523 28 12 27.5522 12 27V1C12 0.447754 11.5523 0 11 0H8Z" fill="#BEBEBE"/>
                    <Path d="M1 16C0.447723 16 0 16.4478 0 17V27C0 27.5522 0.447723 28 1 28H4C4.55228 28 5 27.5522 5 27V17C5 16.4478 4.55228 16 4 16H1Z" fill="#BEBEBE"/>
                    <Path d="M14 10C14 9.44775 14.4477 9 15 9H18C18.5523 9 19 9.44775 19 10V27C19 27.5522 18.5523 28 18 28H15C14.4477 28 14 27.5522 14 27V10Z" fill="#BEBEBE"/>
                    <Path d="M22 16C21.4477 16 21 16.4478 21 17V27C21 27.5522 21.4477 28 22 28H25C25.5523 28 26 27.5522 26 27V17C26 16.4478 25.5523 16 25 16H22Z" fill="#BEBEBE"/>
                </Svg>
            </TouchableOpacity>
        </View>
        <Modalize adjustToContentHeight modalStyle={styles.membercardmodal} ref={modalizeRef}>
            <Image style={{height: 260}} resizeMode="contain" source={{ uri: JSON.parse(sesdata)['member_card'] }} />
            <TouchableOpacity onPress={goToScreen.bind(this, 'memberships')} style={styles.modalButton}>
                <Text style={{color: "#FFFFFF", fontSize: 16}}>Memberships</Text>
                <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M10.5169 15.3165C10.1282 15.6964 9.50728 15.6964 9.11866 15.3165L8.73079 14.9372C8.32959 14.545 8.32959 13.8995 8.73079 13.5072L13.2526 9.08607L0.999999 9.08606C0.447714 9.08606 -1.26377e-06 8.63835 -1.21549e-06 8.08606L-1.17054e-06 7.57191C-1.12226e-06 7.01962 0.447715 6.57191 0.999999 6.57191L12.9028 6.57191L8.73079 2.4928C8.32959 2.10054 8.32959 1.45502 8.73079 1.06275L9.11866 0.683529C9.50728 0.303562 10.1282 0.303562 10.5169 0.683529L17.2687 7.28497C17.6699 7.67724 17.6699 8.32276 17.2687 8.71502L10.5169 15.3165Z" fill="#FFFFFF"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToScreen.bind(this, 'services')} style={styles.modalButton2}>
                <Text style={{color: "#FFFFFF", fontSize: 16}}>Services</Text>
                <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M10.5169 15.3165C10.1282 15.6964 9.50728 15.6964 9.11866 15.3165L8.73079 14.9372C8.32959 14.545 8.32959 13.8995 8.73079 13.5072L13.2526 9.08607L0.999999 9.08606C0.447714 9.08606 -1.26377e-06 8.63835 -1.21549e-06 8.08606L-1.17054e-06 7.57191C-1.12226e-06 7.01962 0.447715 6.57191 0.999999 6.57191L12.9028 6.57191L8.73079 2.4928C8.32959 2.10054 8.32959 1.45502 8.73079 1.06275L9.11866 0.683529C9.50728 0.303562 10.1282 0.303562 10.5169 0.683529L17.2687 7.28497C17.6699 7.67724 17.6699 8.32276 17.2687 8.71502L10.5169 15.3165Z" fill="#FFFFFF"/>
                </Svg>
            </TouchableOpacity>
        </Modalize>
        <Modalize adjustToContentHeight modalStyle={styles.menumodal} ref={modalizeRef2}>
            <TouchableOpacity onPress={goToScreen.bind(this, 'checkins')} style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Check-ins</Text></TouchableOpacity>
            <TouchableOpacity onPress={goToScreen.bind(this, 'vouchers')} style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Vouchers</Text></TouchableOpacity>
            <TouchableOpacity onPress={goToScreen.bind(this, 'locations')} style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Our Locations</Text></TouchableOpacity>
            <View style={{height: 1, backgroundColor: "#E6E6E6", marginVertical: 10, marginBottom:20}}></View>
            <TouchableOpacity onPress={goToScreen.bind(this, 'clubrules')} style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Club Rules</Text></TouchableOpacity>
            <TouchableOpacity onPress={goToScreen.bind(this, 'terms')} style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Terms & Conditions</Text></TouchableOpacity>
            <View style={{height: 1, backgroundColor: "#E6E6E6", marginVertical: 10, marginBottom:20}}></View>
            <TouchableOpacity onPress={goToScreen.bind(this, 'settings')} style={styles.menulink}><Text style={{fontSize:20, color: "#A0A0A0"}}>Settings</Text></TouchableOpacity>
            <TouchableOpacity onPress={logout.bind(this)} style={styles.menulink}><Text style={{fontSize:20, color: "#E57D6F"}}>Log out</Text></TouchableOpacity>
            <View style={{flexDirection: "row", marginVertical: 20}}>
                <TouchableOpacity style={{marginRight:20}}>
                    <Svg onPress={goToSite.bind(this, socialMedia? socialMedia['facebook'] : "")} width="24" height="24" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M30.1826 15.0913C30.1826 6.75456 23.428 0 15.0913 0C6.75456 0 0 6.75456 0 15.0913C0 22.6235 5.51866 28.8669 12.7333 30V19.4538H8.89959V15.0913H12.7333V11.7663C12.7333 7.98438 14.9848 5.89533 18.4333 5.89533C20.0848 5.89533 21.8118 6.18986 21.8118 6.18986V9.90183H19.9083C18.0341 9.90183 17.4493 11.0653 17.4493 12.2586V15.0913H21.6347L20.9653 19.4538H17.4493V30C24.6639 28.8669 30.1826 22.6235 30.1826 15.0913Z" fill="#A0A0A0"/>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:20}}>
                    <Svg onPress={goToSite.bind(this, socialMedia? socialMedia['instagram'] : "")} width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15.0033 7.30838C10.7468 7.30838 7.31344 10.7425 7.31344 15C7.31344 19.2575 10.7468 22.6916 15.0033 22.6916C19.2599 22.6916 22.6933 19.2575 22.6933 15C22.6933 10.7425 19.2599 7.30838 15.0033 7.30838ZM15.0033 20.0006C12.2527 20.0006 10.0039 17.758 10.0039 15C10.0039 12.242 12.246 9.99944 15.0033 9.99944C17.7607 9.99944 20.0028 12.242 20.0028 15C20.0028 17.758 17.754 20.0006 15.0033 20.0006V20.0006ZM24.8015 6.99375C24.8015 7.99119 23.9983 8.78779 23.0078 8.78779C22.0106 8.78779 21.2142 7.98449 21.2142 6.99375C21.2142 6.00301 22.0173 5.19971 23.0078 5.19971C23.9983 5.19971 24.8015 6.00301 24.8015 6.99375ZM29.8946 8.81457C29.7808 6.41136 29.232 4.28261 27.4718 2.52873C25.7184 0.774852 23.5901 0.225929 21.1874 0.105433C18.7111 -0.0351445 11.2889 -0.0351445 8.81261 0.105433C6.41662 0.219235 4.28834 0.768158 2.52817 2.52203C0.767987 4.27591 0.225878 6.40466 0.10541 8.80788C-0.0351366 11.2847 -0.0351366 18.7086 0.10541 21.1854C0.219186 23.5886 0.767987 25.7174 2.52817 27.4713C4.28834 29.2251 6.40993 29.7741 8.81261 29.8946C11.2889 30.0351 18.7111 30.0351 21.1874 29.8946C23.5901 29.7808 25.7184 29.2318 27.4718 27.4713C29.2253 25.7174 29.7741 23.5886 29.8946 21.1854C30.0351 18.7086 30.0351 11.2914 29.8946 8.81457V8.81457ZM26.6955 23.843C26.1735 25.1551 25.1629 26.1659 23.8444 26.6947C21.8701 27.478 17.1852 27.2972 15.0033 27.2972C12.8215 27.2972 8.12995 27.4713 6.1623 26.6947C4.85053 26.1726 3.83993 25.1618 3.31121 23.843C2.52817 21.8682 2.70887 17.1823 2.70887 15C2.70887 12.8177 2.53486 8.12507 3.31121 6.15698C3.83324 4.84492 4.84384 3.8341 6.1623 3.30525C8.13664 2.52203 12.8215 2.70278 15.0033 2.70278C17.1852 2.70278 21.8767 2.52873 23.8444 3.30525C25.1562 3.8274 26.1668 4.83822 26.6955 6.15698C27.4785 8.13176 27.2978 12.8177 27.2978 15C27.2978 17.1823 27.4785 21.8749 26.6955 23.843Z" fill="#A0A0A0"/>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Svg onPress={goToSite.bind(this, socialMedia? socialMedia['website'] : "")} width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM16.92 6H13.97C13.65 4.75 13.19 3.55 12.59 2.44C14.43 3.07 15.96 4.35 16.92 6ZM10 2.04C10.83 3.24 11.48 4.57 11.91 6H8.09C8.52 4.57 9.17 3.24 10 2.04ZM2.26 12C2.1 11.36 2 10.69 2 10C2 9.31 2.1 8.64 2.26 8H5.64C5.56 8.66 5.5 9.32 5.5 10C5.5 10.68 5.56 11.34 5.64 12H2.26ZM3.08 14H6.03C6.35 15.25 6.81 16.45 7.41 17.56C5.57 16.93 4.04 15.66 3.08 14V14ZM6.03 6H3.08C4.04 4.34 5.57 3.07 7.41 2.44C6.81 3.55 6.35 4.75 6.03 6V6ZM10 17.96C9.17 16.76 8.52 15.43 8.09 14H11.91C11.48 15.43 10.83 16.76 10 17.96ZM12.34 12H7.66C7.57 11.34 7.5 10.68 7.5 10C7.5 9.32 7.57 8.65 7.66 8H12.34C12.43 8.65 12.5 9.32 12.5 10C12.5 10.68 12.43 11.34 12.34 12ZM12.59 17.56C13.19 16.45 13.65 15.25 13.97 14H16.92C15.96 15.65 14.43 16.93 12.59 17.56V17.56ZM14.36 12C14.44 11.34 14.5 10.68 14.5 10C14.5 9.32 14.44 8.66 14.36 8H17.74C17.9 8.64 18 9.31 18 10C18 10.69 17.9 11.36 17.74 12H14.36Z" fill="#A0A0A0"/>
                    </Svg>
                </TouchableOpacity>
            </View>
        </Modalize>
    </View>
    );

} else {
    return(
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <Image style={{width: 60, marginTop: 20}} resizeMode="contain" source={require('../assets/spinner.gif')} />
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
        overflow: "scroll"
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
        backgroundColor: "#5CBBBB",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    newbookingbutton: {
        height: 50,
        backgroundColor: "#5CBBBB",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginTop: 10,
        width:"100%",
        alignSelf: "center"
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
        backgroundColor: "#5CBBBB",
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
        borderRadius: 10,
        backgroundColor: "#5CBBBB",
        height: 60,
        paddingHorizontal: 20
    },
    modalButton2: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#5CBBBB",
        height: 60,
        marginVertical:10,
        paddingHorizontal: 20,
        marginBottom:20
    },
    menulink: {
        height:30,
        marginBottom:10
    }
});
