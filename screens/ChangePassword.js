import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon, Touchable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Rect, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';


export default function ChangePasswordScreen({route, navigation}) {

    
    const [sesdata, setSesdata] = useState('');
    
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [new_password2, setNewPassword2] = useState('');

    
    const changePass = async () => {
        if(new_password == new_password2) {
            try {
                const data = await AsyncStorage.getItem("@sessiondata");
                if (data !== null) {
                    setSesdata(data);
                    
                    let myTempToken = JSON.parse(data)['token_type'] + " " + JSON.parse(data)['access_token'];
    
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", myTempToken);
                
                
                    var formdata = new FormData();
                    formdata.append("old_pin", old_password);
                    formdata.append("new_pin", new_password);
    
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                    };
    
                    fetch("http://ffapi.moncea.ro/public//api/users/"+ JSON.parse(data)['id'] +"/change-pin", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if(JSON.parse(result)['success']) {
                            navigation.navigate('SettingsScreen');
                        } else {
                            console.log("Wrong password")
                        }
                    })
                    .catch(error => console.log('error', error));
    
                    
                }
                } catch (error) {
                    console.log(error);
            }
        } else {
            console.log("passwords differ")
        }
        
    };

    

    const goToScreen = (x) => {
        if(x == "settings") {
            navigation.navigate('SettingsScreen');
        }
    }

    

    return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.homeScreen}>
            <StatusBar backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.homeHeader}>
                    <TouchableOpacity onPress={goToScreen.bind(this, 'settings')}>
                        <Svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.0208 0.707105C12.4114 0.316582 13.0445 0.316582 13.435 0.707106L14.8493 2.12132C15.2398 2.51184 15.2398 3.14501 14.8493 3.53553L7.3848 11H27C27.5523 11 28 11.4477 28 12V14C28 14.5523 27.5523 15 27 15H7.92896L14.8493 21.9203C15.2398 22.3108 15.2398 22.944 14.8493 23.3345L13.435 24.7487C13.0445 25.1393 12.4114 25.1393 12.0208 24.7487L0.707108 13.435C0.316583 13.0445 0.316584 12.4113 0.707109 12.0208L12.0208 0.707105Z" fill="#B3B3B3"/>
                        </Svg>
                    </TouchableOpacity>
                    <Text style={{color:"#A0A0A0", fontSize:24, fontWeight: "bold"}}>Change password</Text>
                </View>
                
                
                <TextInput
                onChangeText={val => setOldPassword(val)}
                style={styles.textinput} secureTextEntry={true}
                placeholder="Old password"
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={val => setNewPassword(val)}
                style={styles.textinput} secureTextEntry={true}
                placeholder="New password"
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={val => setNewPassword2(val)}
                style={styles.textinput} secureTextEntry={true}
                placeholder="Confirm new password"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.loginButton} onPress={changePass.bind(this)}>
                <Text style={{color: "white", fontSize: 16 }}>Change Password</Text>
              </TouchableOpacity>

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
    },
    loginButton: {
      backgroundColor: "#5CBBBB",
      height: 50,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10
    },
    textinput: {
      height: 60,
      borderRadius: 10,
      paddingHorizontal: 20,
      fontSize: 14,
      borderWidth: 2,
      borderColor: "#EBEBEB",
      marginBottom: 10
    },
});
