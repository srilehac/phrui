/**
 * Created by Rahuld on 2017/08/26
 */
import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         Alert,
         ScrollView,
         KeyboardAvoidingView ,
         TouchableOpacity
        } from 'react-native';
import { NavigationActions } from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
// import LoginForm from './LoginForm';
import colors from '../../utils/colors';
import { TextField } from 'react-native-material-textfield';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import Toast from 'react-native-simple-toast';
import ImageSlider from 'react-native-image-slider';
import Drawer from 'react-native-drawer';
import environment from '../../utils/environment';
/*importing and using from const*/
const { 
        loginscreenLogoContainer,
        loginscreenLogo,
        loginTitle 
    } = customstyles;
const { login_welcome } = customtext;
const { username_label,
    password_label,
    login_label,
    update_profile,
    built_profile,
    view_profile,
    terms_profile,
    nearby_profile,
    create_account_text,
    create_account_link,
    myfamily_members
 } = customtext;
const { loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    homescreenalignmentMyaccount,
    homescreenalignmentMyappointment,
    homescreenalignmentNearbyhospital,
    homescreenLogo,
    headerStyle,
    loginscreenLoginContainer
 } = customstyles;
const { white,
    black,
    electricBlue
 } = colors;
const { base_url } = environment;

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.onFamilyMembers = this.onFamilyMembers.bind(this);
        this.onUpdateProfile = this.onUpdateProfile.bind(this); 
        this.onViewProfile = this.onViewProfile.bind(this);
        this.onViewMembers = this.onViewMembers.bind(this);
        this.onClickHome = this.onClickHome.bind(this);
        this.onClickExit = this.onClickExit.bind(this);
        this.onTerms = this.onTerms.bind(this);
       // this.onNearByhospital = this.onNearByhospital.bind(this);
        this.state = {
            position: 1,
            interval: null
        };
    }
        componentWillMount() {
        this.setState({interval: setInterval(() => {
            this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
        }, 3000)});
    }
 
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
       
    onFamilyMembers(token){
        console.log("familymembers");
        console.log('token'+token);
        this.props.navigation.navigate('FamilyMemberPage',{token:token});
    }
    onClickHome(token){
         this.props.navigation.navigate('HomePage',{token:token});
    }
        onClickExit(){
         this.props.navigation.navigate('LoginPage');
    }
    
       

    onViewMembers(token){
      console.log("View Members");
      console.log('token'+token);
  
        

        return fetch(base_url + '/fetchfamilyMembers', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((response) => response.json()).then((responseJson) => {
             var message = responseJson.names;
             var message1 = responseJson.message
             console.log("message"+JSON.stringify(message));
            // var message = message;        
             this.setState({loading_blur: false});
             this.setState({showComponent: true});
             console.log('message',message);
             if (message1 === 'profile not built yet' || message1 === 'internal server error' || message1 === 'invalid token' ) {
                 Toast.show(message1); 
                  } else {
              //  Toast.show(message);
                console.log("viewPage"); 
             this.props.navigation.navigate('ViewMemberPage',{token:token,message:message});
        }
        }).catch((error) => {
            console.error(error);
        });

    }

    onUpdateProfile(token){
        console.log("UpdateprofilePage");
         console.log('token'+token);
        this.props.navigation.navigate('UpdateProfilePage',{token:token});
    }

    onFamilyProfile(token){
        console.log("FamilyProfile");
        console.log('token'+token);
        this.props.navigation.navigate('FirstProfilePage',{token:token});
        
    }

    onViewProfile(token){
        console.log('token'+token);
        console.log("ViewProfilePage");
        

        return fetch('http://192.168.0.20:8000/getProfile', {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((response) => response.json()).then((responseJson) => {
             var message = responseJson.names;
             console.log("message"+message)        
             this.setState({loading_blur: false});
             this.setState({showComponent: true});
             console.log('message',message);
            //this.props.navigation.navigate('ViewProfilePage',{token:token,message:message});
        }).catch((error) => {
            console.error(error);
        });
        
    }
    
   

    onTerms(){
         Alert.alert(
         'Once Profile is Build it cannot be rebuild.'
         )
    }

     closeControlPanel = () => {
    this._drawer.close()
         };
        openControlPanel = () => {
            this._drawer.open()
  };
 static navigationOptions = {
  title: 'Family Members',
  headerStyle: { backgroundColor: 'powderblue' },
  headerTitleStyle: { color: 'Black',alignSelf:'center' },
}
 
    
    render() {
       var {params} = this.props.navigation.state;
        var token = params.token
        let { errors = {}, secureTextEntry, ...data } = this.state;
        let { username = 'username' } = data;

        return (  
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                
                    {/* <Image
                        style={homescreenLogo}
                        source={require('../../../assets/images/homeimage.jpg')}
                    /> */}
                                <View style={homescreenLogo}>
                <ImageSlider
                    images={[
                        `https://familydoctor.org/wp-content/uploads/2017/01/41429331_l-705x472.jpg`,     
                    ]}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({position})}/>
            </View>
                    <ScrollView>
                   
                
                <View style={loginscreenInputContainer}>

                   
                         <View style={homescreenalignmentMyaccount}>

                        <RaisedTextButton 
                            
                            title="About" 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                        </View>
                         <View style={homescreenalignmentMyaccount}>
                         <RaisedTextButton 
                            onPress={()=>this.onFamilyMembers(token)} 
                            title="Add Members" 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                        </View>
                         <View style={homescreenalignmentMyappointment}>
                         <RaisedTextButton 
                           onPress={()=>this.onViewMembers(token)} 
                            title="View Members" 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                         <View style={homescreenalignmentMyappointment}>
                         <RaisedTextButton 
                           onPress={()=>this.onClickHome(token)} 
                            title="Go To Home" 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                        </View>

                         <View style={homescreenalignmentMyappointment}>
                         <RaisedTextButton 
                           onPress={()=>this.onClickExit(token)} 
                            title="Exit" 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                        </View>

                        

                        
                    </View>
                    
                    
                    

                </View>
                
                
                </ScrollView>
                { /* Due to parent child relation of (this.props.navigation.navigate)
                 page is not navigating from LoginScreen to RegisterScreen */}
                {/* <LoginForm /> */}
            </KeyboardAvoidingView>
            
        );
    }
}
