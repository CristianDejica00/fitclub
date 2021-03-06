import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


export default function LocationsScreen({route, navigation}) {
    
    const [sesdata, setSesdata] = useState('');
    const [locations, setLocations] = useState('');
    
    const [locationProfile, setLocationProfile] = useState('');
    const [locationPhone, setLocationPhone] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [locationName, setLocationName] = useState('');
    const [locationSchedule, setLocationSchedule] = useState('');
    const [locationLatitude, setLatitude] = useState('');
    const [locationLongitude, setLongitude] = useState('');

    



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
            
                fetch("http://ffapi.moncea.ro/public/api/fitclubs", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setLocations(result);
                })
                .catch(error => console.log('error', error));

                
              }
            } catch (error) {
                console.log(error);
          }
        };
        f();
    });

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

        let myTempToken = JSON.parse(sesdata)['token_type'] + " " + JSON.parse(sesdata)['access_token'];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", myTempToken);
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        fetch("http://ffapi.moncea.ro/public/api/fitclubs/"+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result)['image']);
            setLocationProfile(JSON.parse(result)['image']);
            setLocationAddress(JSON.parse(result)['address']);
            setLocationPhone(JSON.parse(result)['phone_numbers']);
            setLocationName(JSON.parse(result)['name']);
            setLocationSchedule(JSON.parse(result)['schedule']);
            setLatitude(JSON.parse(result)['latitude']);
            setLongitude(JSON.parse(result)['longitude']);
            modalizeRef.current?.open();
        })
        .catch(error => console.log('error ' + id, error));
    }

    const goToCallAgenda = (nr) => {
        Linking.openURL(`tel:${nr}`)
    }

    if(locations) {
        return (
            <View style={{flex: 1}}>
            <ScrollView style={styles.homeScreen}>
                <StatusBar backgroundColor="#FFFFFF"/>
                <SafeAreaView style={styles.safearea}>
                    <View style={styles.homeHeader}>
                        <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Our locations</Text>
                    </View>

                    <View style={{borderRadius: 20 / 2, overflow: "hidden", marginBottom:10}}>
                        <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" }} style={{ width:"100%", height:200, borderRadius:10 }} resizeMode="cover"></ImageBackground>
                    </View>
                    
                    {
                        JSON.parse(locations)['data'].map(n => (
                            <TouchableOpacity key={n['fitclub_id']} onPress={openClubDetails.bind(this, n['fitclub_id'])} style={styles.bookingCard}>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{fontSize: 16, color: "#007AFF", fontWeight: "bold"}}>{n['name']}</Text>
                                    </View>
                                    <Text style={{color: "#757575", fontSize: 12}}>{n['city']}</Text>
                                </View>
                            </TouchableOpacity>
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
                        <Path d="M8 0C7.44772 0 7 0.447754 7 1V27C7 27.5522 7.44772 28 8 28H11C11.5523 28 12 27.5522 12 27V1C12 0.447754 11.5523 0 11 0H8Z" fill="#BEBEBE"/>
                        <Path d="M1 16C0.447723 16 0 16.4478 0 17V27C0 27.5522 0.447723 28 1 28H4C4.55228 28 5 27.5522 5 27V17C5 16.4478 4.55228 16 4 16H1Z" fill="#BEBEBE"/>
                        <Path d="M14 10C14 9.44775 14.4477 9 15 9H18C18.5523 9 19 9.44775 19 10V27C19 27.5522 18.5523 28 18 28H15C14.4477 28 14 27.5522 14 27V10Z" fill="#BEBEBE"/>
                        <Path d="M22 16C21.4477 16 21 16.4478 21 17V27C21 27.5522 21.4477 28 22 28H25C25.5523 28 26 27.5522 26 27V17C26 16.4478 25.5523 16 25 16H22Z" fill="#BEBEBE"/>
                    </Svg>
                </TouchableOpacity>
            </View>

            
            <Modalize adjustToContentHeight modalStyle={{ backgroundColor: "transparent" }} ref={modalizeRef}>
                <View style={{overflow:"hidden", borderTopEndRadius:20, borderTopStartRadius: 20 }}>
                    <ImageBackground source={{ uri: locationProfile }} style={{ width:"100%", height:260 }} resizeMode="cover">
                        <View style={{flex:1}}></View>
                        <LinearGradient style={{height:60}} colors={['#00000000', '#000000']} >
                            <View style={{flex:1}}></View>
                            <View style={{height:20, backgroundColor: "white", borderTopEndRadius:20, borderTopStartRadius: 20}}></View>
                        </LinearGradient>
                    </ImageBackground>
                </View>
                <View style={{paddingHorizontal:20, backgroundColor: "white" }}>
                    <View style={{flexDirection:"row", alignItems: "center", borderBottomColor: "#E6E6E6", borderBottomWidth: 1, paddingBottom:20 }}>
                        <Text style={{fontSize:20, color: "black", flex:1}}>{locationName}</Text>
                        <TouchableOpacity onPress={goToCallAgenda.bind(this, locationPhone)} style={{marginLeft:10}}>
                            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M40 20C40 31.0457 31.0459 40 20 40C8.9541 40 0 31.0457 0 20C0 8.95432 8.9541 0 20 0C31.0459 0 40 8.95432 40 20ZM29.2733 10.9613L25.2108 10.0239C24.7694 9.9223 24.3163 10.1528 24.1366 10.5668L22.2616 14.9417C22.0976 15.3245 22.2069 15.7737 22.5312 16.0355L24.8983 17.9729C23.4921 20.9689 21.0351 23.4611 17.977 24.8947L16.0395 22.5275C15.7738 22.2033 15.3285 22.0939 14.9457 22.258L10.5707 24.1329C10.1527 24.3165 9.92227 24.7697 10.0238 25.211L10.9613 29.2735C11.059 29.6953 11.434 30 11.8754 30C21.8788 30 29.9999 21.8947 29.9999 11.8754C29.9999 11.4379 29.6991 11.059 29.2733 10.9613Z" fill="#007AFF"/>
                            </Svg>
                        </TouchableOpacity>
                    </View>

                    <View style={{paddingBottom:20, borderBottomColor: "#E6E6E6", borderBottomWidth: 1}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                            <Text style={{color: "#A0A0A0", fontSize: 16}}>Monday</Text>
                            <View>
                            {locationSchedule["mon"] ? locationSchedule["mon"].map(n => (
                                <View key={locationSchedule['mon'].indexOf(n)}>
                                    <Text style={{color: "#757575", fontSize: 16, marginBottom:5}}>{n['start_time'].substring(0, n['start_time'].length-3)} - {n['end_time'].substring(0, n['end_time'].length-3)}</Text>
                                </View>
                            )) : <View><Text style={{color: "#E57D6F"}}>Closed</Text></View>}
                            </View>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                            <Text style={{color: "#A0A0A0", fontSize: 16}}>Tuesday</Text>
                            <View>
                            {locationSchedule["tue"] ? locationSchedule["tue"].map(n => (
                                <View key={locationSchedule['tue'].indexOf(n)}>
                                    <Text style={{color: "#757575", fontSize: 16, marginBottom:5}}>{n['start_time'].substring(0, n['start_time'].length-3)} - {n['end_time'].substring(0, n['end_time'].length-3)}</Text>
                                </View>
                            )) : <View><Text style={{color: "#E57D6F"}}>Closed</Text></View>}
                            </View>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                            <Text style={{color: "#A0A0A0", fontSize: 16}}>Wednesday</Text>
                            <View>
                            {locationSchedule["wed"] ? locationSchedule["wed"].map(n => (
                                <View key={locationSchedule['wed'].indexOf(n)}>
                                    <Text style={{color: "#757575", fontSize: 16, marginBottom:5}}>{n['start_time'].substring(0, n['start_time'].length-3)} - {n['end_time'].substring(0, n['end_time'].length-3)}</Text>
                                </View>
                            )) : <View><Text style={{color: "#E57D6F"}}>Closed</Text></View>}
                            </View>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                            <Text style={{color: "#A0A0A0", fontSize: 16}}>Thursday</Text>
                            <View>
                            {locationSchedule["thu"] ? locationSchedule["thu"].map(n => (
                                <View key={locationSchedule['thu'].indexOf(n)}>
                                    <Text style={{color: "#757575", fontSize: 16, marginBottom:5}}>{n['start_time'].substring(0, n['start_time'].length-3)} - {n['end_time'].substring(0, n['end_time'].length-3)}</Text>
                                </View>
                            )) : <View><Text style={{color: "#E57D6F"}}>Closed</Text></View>}
                            </View>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                            <Text style={{color: "#A0A0A0", fontSize: 16}}>Friday</Text>
                            <View>
                            {locationSchedule["fri"] ? locationSchedule["fri"].map(n => (
                                <View key={locationSchedule['fri'].indexOf(n)}>
                                    <Text style={{color: "#757575", fontSize: 16, marginBottom:5}}>{n['start_time'].substring(0, n['start_time'].length-3)} - {n['end_time'].substring(0, n['end_time'].length-3)}</Text>
                                </View>
                            )) : <View><Text style={{color: "#E57D6F"}}>Closed</Text></View>}
                            </View>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                            <Text style={{color: "#A0A0A0", fontSize: 16}}>Saturday</Text>
                            <View>
                            {locationSchedule["sat"] ? locationSchedule["sat"].map(n => (
                                <View key={locationSchedule['sat'].indexOf(n)}>
                                    <Text style={{color: "#757575", fontSize: 16, marginBottom:5}}>{n['start_time'].substring(0, n['start_time'].length-3)} - {n['end_time'].substring(0, n['end_time'].length-3)}</Text>
                                </View>
                            )) : <View><Text style={{color: "#E57D6F"}}>Closed</Text></View>}
                            </View>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                            <Text style={{color: "#A0A0A0", fontSize: 16}}>Sunday</Text>
                            <View>
                            {locationSchedule["sun"] ? locationSchedule["sun"].map(n => (
                                <View key={locationSchedule['sun'].indexOf(n)}>
                                    <Text style={{color: "#757575", fontSize: 16, marginBottom:5}}>{n['start_time'].substring(0, n['start_time'].length-3)} - {n['end_time'].substring(0, n['end_time'].length-3)}</Text>
                                </View>
                            )) : <View><Text style={{color: "#E57D6F"}}>Closed</Text></View>}
                            </View>
                        </View>
                    </View>

                    <Text style={{marginVertical:20, color: "#757575", fontSize: 16}}>{locationAddress}</Text>


                    {/*<MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{width:"100%", height:300}}
                    initialRegion={{
                        latitude: locationLatitude.toString(),
                        longitude: locationLongitude.toString(),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                    
                    </MapView>*/}

                    <View style={{height:40}}></View>


                    
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
