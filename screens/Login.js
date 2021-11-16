import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Icon } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Path } from 'react-native-svg';
import Checkbox from 'react-native-modest-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions } from 'react-navigation';


export default function LoginScreen({navigation}) {

  const [isLoggedin, setIsLogged] = useState(false);

  useEffect(() => {
    const f = async () => {
      try {
        const data = await AsyncStorage.getItem("@sessiondata");
          if (data !== null) {
            //console.log(data);
            setIsLogged(true);
            const jsonValue1 = JSON.stringify(data);
            navigation.navigate('HomeScreen', { sessiondata: jsonValue1 });
            return data;
          }
        } catch (error) {
        console.log(error);
      }
    };
    f();
  });


  const [checked, setCheck] = useState(false);
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const login = () => {
    if (phone_number, password) {
			
			var formdata = new FormData();
			formdata.append('phonenumber', phone_number);
			formdata.append('pincode', password);

			var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
			};

			fetch("http://ffapi.moncea.ro/public/api/login", requestOptions)
			.then(response => response.json())
			.then(result => {
				if(result["message"] == "Unauthorized") {
					console.log("Wrong credentials");
				} else {
					const storeData = async (key, value) => {
						try {
						  await AsyncStorage.setItem(key, value);
              const jsonValue = JSON.stringify(result);
              navigation.navigate('HomeScreen', { sessiondata: jsonValue });
						} catch (error) {
						  console.log(error);
						}
					};
          const jsonValueout = JSON.stringify(result);
					storeData("@sessiondata", jsonValueout);
				}
			})
			.catch(error => console.log('error', error));
		}
  }

  if(!isLoggedin) {
    return (
      <View style={styles.loginScreen}>
          <StatusBar/>
          <Image
            source={require('../assets/login_bg.jpg')}
          />
          <SafeAreaView style={styles.safearea}>
            <View behavior="padding" style={styles.formarea}>
              <Svg style={{alignSelf: "center", marginBottom: 30 }} width="163" height="31" viewBox="0 0 163 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M22.7771 21.2752L17.4956 26.4557C16.0692 27.8563 13.7764 27.8372 12.3733 26.4132L12.1223 26.159L9.67242 28.5604L10.0543 28.9452C12.7167 31.6354 17.0545 31.6716 19.7617 29.0265L25.1633 23.7294L22.7771 21.2752ZM9.69723 23.6765L4.53596 18.4254C3.14346 16.9964 3.17035 14.7114 4.59608 13.3155L4.75516 13.1566L2.33365 10.72L2.04375 11.0025C-0.649171 13.6621 -0.68558 17.9953 1.96245 20.6996L7.24389 26.0707L9.69723 23.6765ZM20.3025 8.18442L25.545 13.5097C26.9368 14.934 26.9163 17.2135 25.4991 18.6125L25.2728 18.835L27.6803 21.2787L28.0337 20.9256C30.7248 18.2651 30.7612 13.9336 28.1151 11.2285L22.7311 5.77964L20.3025 8.18442ZM7.22269 10.7341L12.5642 5.48649C13.9943 4.0978 16.2789 4.12468 17.676 5.54658L17.8457 5.71606L20.2919 3.31122L19.9985 3.01103C17.3396 0.314661 12.999 0.272017 10.2876 2.9157L4.81881 8.2904L7.22269 10.7341ZM39.0704 17.2C38.7168 19.4989 37.7482 26.5721 37.7482 26.5721H41.6368L42.5736 19.9085C42.9271 17.4366 43.058 12.7399 49.4424 13.199L49.9868 9.3569C41.598 8.60117 39.484 14.3926 39.0704 17.2ZM106.549 21.6884C107.55 20.4412 108.074 18.8793 108.03 17.2812C108.03 14.3325 106.58 12.6411 104.049 12.6411C102.667 12.6411 101.496 13.2414 100.468 14.4808C99.439 15.7204 98.9513 17.2106 98.9513 19.0716C98.9513 21.7413 100.39 23.4682 102.614 23.4682C104.13 23.5283 105.586 22.8746 106.549 21.7024V21.6884ZM103.911 9.12028C105.778 9.08913 107.573 9.84089 108.861 11.1932L109.09 9.54052H112.77L110.356 26.5475H106.672L106.853 25.1915C105.423 26.3104 103.662 26.9229 101.847 26.9324C99.9833 26.9738 98.2047 26.1558 97.0246 24.7147C95.7626 23.2068 95.1479 21.3564 95.1479 19.0645C95.0811 16.4936 95.974 13.9898 97.6538 12.0408C99.1849 10.166 101.489 9.09184 103.911 9.12383V9.12028ZM154.866 23.4646C152.48 23.4646 150.815 21.5718 150.815 18.8739C150.759 17.2433 151.334 15.654 152.419 14.435C153.383 13.2865 154.808 12.6254 156.308 12.6304C158.076 12.6304 159.094 13.5309 160.137 14.9823L163 12.3056C161.505 10.1231 159.43 9.12732 156.379 9.12732C153.831 9.09887 151.386 10.1314 149.631 11.9771C147.767 13.8197 146.744 16.347 146.803 18.9657C146.803 21.3493 147.509 23.2456 148.955 24.7642C150.38 26.2125 152.343 27.0032 154.374 26.9466C157.591 26.9466 160.19 25.7812 162.099 23.4787L159.716 20.8973C158.086 22.7371 156.718 23.454 154.852 23.454L154.866 23.4646ZM143.359 26.5686L145.756 9.55465H141.868L139.471 26.5475L143.359 26.5686ZM144.409 2.18115C143.757 2.17447 143.13 2.42877 142.666 2.88743C142.21 3.32902 141.955 3.93757 141.959 4.57186C141.961 5.9371 143.07 7.04251 144.437 7.04076C145.082 7.03998 145.701 6.78767 146.163 6.33761C146.624 5.86679 146.879 5.23111 146.869 4.57186C146.871 3.93817 146.616 3.33083 146.163 2.88743C145.7 2.42811 145.072 2.17363 144.419 2.18115H144.409ZM135.706 4.77323H131.86L129.696 20.0639C129.374 22.4653 129.671 24.1497 130.601 25.2126C131.425 26.152 132.722 26.6252 134.607 26.6252C135.334 26.6252 136.045 26.6004 136.728 26.5581L137.201 23.175H135.975C134.819 23.175 134.207 23.0091 133.853 22.5994C133.5 22.1898 133.373 21.42 133.553 19.9968L134.539 13.0224H138.633L139.107 9.57583H134.988L135.706 4.77323ZM125.069 14.4491L127.78 11.9065C126.271 10.049 124.142 9.10615 121.456 9.10615C119.536 9.10615 117.981 9.59351 116.697 10.5964C115.464 11.501 114.753 12.9527 114.796 14.4808C114.796 16.974 116.181 18.6267 118.918 19.3894L121.474 20.0957C122.774 20.4913 123.407 21.0491 123.407 21.7943C123.407 23.0161 122.41 23.6377 120.441 23.6377C118.596 23.6613 116.856 22.7849 115.779 21.2893L113.102 23.6907C114.736 25.8518 117.037 26.9466 119.95 26.9466C124.429 26.9466 127.207 24.8771 127.207 21.5506C127.207 19.0787 125.73 17.313 123.05 16.5714L120.099 15.7875C119.07 15.5015 118.546 14.9647 118.546 14.1913C118.546 13.199 119.628 12.4503 121.057 12.4503C122.615 12.4503 123.959 13.1354 125.054 14.4879L125.069 14.4491ZM91.9129 4.73438H88.0595L85.9034 20.0251C85.5819 22.4264 85.8751 24.1108 86.8083 25.1738C87.6284 26.1131 88.9295 26.5863 90.8135 26.5863C91.5384 26.5863 92.2525 26.5616 92.9346 26.5192L93.4012 23.1327H92.1748C91.0188 23.1327 90.407 22.9667 90.0356 22.557C89.6647 22.1474 89.5551 21.3776 89.7351 19.9545L90.7213 12.98H94.8156L95.2888 9.53348H91.1813L91.9129 4.73438ZM78.2147 9.10615C76.5288 9.06712 74.9008 9.71777 73.7074 10.9071L73.5798 11.0307L73.8062 9.52638H69.9955L67.595 26.5475H71.4839L72.8236 17.1224C73.2191 14.2972 74.8917 12.5951 77.2953 12.5951C79.0949 12.5951 80.2576 13.8276 80.2576 15.731C80.2576 15.8581 80.2401 16.0523 80.2191 16.296C80.2191 16.4019 80.198 16.5185 80.1908 16.6491L78.7975 26.5368H82.669C83.2108 22.61 83.5878 19.9026 83.7997 18.4148C83.9201 17.5531 83.9875 17.08 83.9906 17.0481C84.0791 16.4708 84.1248 15.8878 84.1284 15.3037C84.1284 11.5393 81.817 9.10621 78.2394 9.10621L78.2147 9.10615ZM57.5094 23.4893C59.7083 23.4893 61.3272 21.8225 61.7336 19.1387L63.0914 9.54052H66.9622L64.5617 26.5475H60.7619L60.9491 25.0431L60.8287 25.1667C59.6755 26.3275 58.0964 26.9656 56.4596 26.9324C53.0305 26.9324 50.8033 24.5099 50.8033 20.7667C50.8138 20.1958 50.8599 19.6262 50.9412 19.061L52.2986 9.52638H56.1343L54.7202 19.7002C54.6855 19.9825 54.6736 20.2671 54.6849 20.5512C54.6849 22.4087 55.7136 23.4752 57.513 23.4752" fill="#007AFF"/>
              </Svg>
              <TextInput
                onChangeText={val => setPhoneNumber(val)}
                style={styles.textinput}
                placeholder="Phone number"
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={val => setPassword(val)}
                style={styles.textinput} secureTextEntry={true}
                placeholder="Password"
                keyboardType="numeric"
              />
              <View style={styles.remembermewrapper}>
                  <Checkbox
                    label='Remember me'
                    labelStyle={{fontSize: 14, color:"#787878"}}
                    checkedImage={require('../assets/checked_icon.png')}
                    uncheckedImage={require('../assets/unchecked_icon.png')}
                    checked={checked}
                    style={{padding:0, width:20, height:20}}
                    checkboxStyle={{width:20, height:20}}
                    onChange={() => setCheck(!checked)}
                  />
              </View>
              <TouchableOpacity onPress={login.bind(this)} style={styles.loginButton}>
                <Text style={{color: "white", fontSize: 16 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
      </View>
    );
  } else {
    return (<View></View>);
  }
  
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formarea: {
    flex: 1
  },
  loginButton: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  safearea: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between'
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
  remembermewrapper: {
    flexDirection: "row"
  },
  checkbox: {
    width:20,
    height:20,
    marginRight: 10,
    borderRadius:4,
    borderColor: "#007AFF",
    borderWidth: 2
  }
});
