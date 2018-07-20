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
import { TextField } from 'react-native-material-textfield';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import Toast from 'react-native-simple-toast';
import ImageSlider from 'react-native-image-slider';
import Drawer from 'react-native-drawer';

import environment from '../../utils/environment';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
// import LoginForm from './LoginForm';
import colors from '../../utils/colors';

/*importing and using from const*/
const {
    loginscreenLogoContainer,
    loginscreenLogo,
    loginTitle 
} = customstyles;

const { login_welcome } = customtext;

const { 
    username_label,
    password_label,
    login_label,
    update_profile,
    built_profile,
    view_profile,
    terms_profile,
    nearby_profile,
    create_account_text,
    create_account_link,
    add_documents,
    myfamily_members,
    emergencycontacts
} = customtext;

const { 
    loginscreenInputContainer,
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

const { 
    white,
    black,
    electricBlue
} = colors;

const { base_url } = environment;
var user;

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.onBuildProfile = this.onBuildProfile.bind(this);
        this.onUpdateProfile = this.onUpdateProfile.bind(this); 
        this.onViewProfile = this.onViewProfile.bind(this);
        this.onTerms = this.onTerms.bind(this);
        this.onEmergencyContacts = this.onEmergencyContacts.bind(this);
        // this.onNearByhospital = this.onNearByhospital.bind(this);
        this.state = {
            position: 1,
            user:user,
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
       
    onBuildProfile(token){
        console.log("BuildedPage");
        console.log('token'+token);
        let errors = {};
        this.setState({ errors });
        return fetch(base_url + '/builded', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var message = responseJson.message;
            console.log("message"+responseJson.message);
            console.log('token'+token);
         
            if (message === 'Profile Already Built' || message === 'Internal Server Error' ) {
                Toast.show(message); 
            } else {
                //  Toast.show(message);
                console.log("HomePage");
                // this.props.navigation.navigate('HomePage');
                this.props.navigation.navigate('BuildProfilePage', {token:token});
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    onUpdateProfile(token) {
        console.log("UpdateprofilePage");
        console.log('token'+token);
        this.props.navigation.navigate('UpdateProfilePage', {token:token});
    }

    onFamilyProfile(token) {
        console.log("FamilyProfile");
        console.log('token'+token);
        this.props.navigation.navigate('FirstProfilePage', {token:token});
    }

    onAddDocuments(token){
        console.log("My Documents");
        console.log('token'+token);
        this.props.navigation.navigate('UploadFilesPage',{token:token});
    }

    onViewProfile(token) {
        console.log('token'+token);
        console.log("ViewProfilePage");
        
        return fetch(base_url + '/getProfile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((response) => response.json()).then((responseJson) => {
            var profileObj = responseJson.profileObj;
            var growableObj = responseJson.growableObj;
            var date = responseJson.data;
            var time = responseJson.time;
            var message = responseJson.message;
            //  console.log("message"+JSON.stringify(profileObj.GenderType));
            // var message = message;  
            if (message === 'Profile of the user not built yet' || message === 'Internal Server Error!' ) {
                Toast.show(message); 
            } else {
                //  Toast.show(message);
                console.log("viewPage"); 
                this.props.navigation.navigate('ViewProfilePage',{token:token,profileObj:profileObj,growableObj:growableObj,date:date,time:time});     
                this.setState({loading_blur: false});
                this.setState({showComponent: true});
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    onEmergencyContacts(token) {
        console.log('token'+token);
        console.log('GeoLocation');
        this.props.navigation.navigate('GeoLocationPage',{token:token});
    }

    onTerms() {
        Alert.alert('Once Profile is Build it cannot be rebuild.')
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    
    openControlPanel = () => {
        this._drawer.open()
    };
    
    static navigationOptions = {
        title: 'HOME',
        headerStyle: { backgroundColor: 'powderblue' },
        headerTitleStyle: { color:'Black',alignSelf:'center' },
    }
     
    render() {
        var {params} = this.props.navigation.state;
        var token = params.token
        user = params.user
        console.log("user"+user);
        // var rapidId=params.rapidID
        // console.log("inhomepage"+rapidId)
        let { errors = {}, secureTextEntry, ...data } = this.state;
        let { username = 'username' } = data;

        return (  
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                <View>
                    <Text style={{fontSize: 20}}>Hello {this.state.user} </Text>
                </View>
                {/* <Image
                    style={homescreenLogo}
                    source={require('../../../assets/images/homeimage.jpg')}
                /> */}

                <View style={homescreenLogo}>
                    <ImageSlider
                        images={[
                            `https://bakertillykuwait.com/wp-content/uploads/2016/12/PHR-2.jpg`,                        
                            `https://omowizard.files.wordpress.com/2010/04/defining-the-phr.jpg`,
                            `https://www.owu.edu/files/pages/medical-and-health-2.jpg`,
                            `https://oup.silverchair-cdn.com/ImageLibrary/contact-medical.png`,
                            `http://academicmedicineblog.org/wp-content/uploads/2014/10/medical-family1.jpg`,
                        ]}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({position})}/>
                </View>
                
                <ScrollView>
                    <View style={loginscreenLogoContainer}>
                        <Text style={loginTitle}>Welcome To Personal Health Record</Text>
                    </View>
                
                    <View style={loginscreenInputContainer}>
                        <View style={homescreenalignmentNearbyhospital}>
                            <RaisedTextButton 
                                onPress={this.onTerms} 
                                title={terms_profile} 
                                color={electricBlue} 
                                titleColor={white} 
                            />
                        </View>
                   
                        <View style={homescreenalignmentMyaccount}>
                            <RaisedTextButton 
                                onPress={()=>this.onBuildProfile(token)} 
                                title={built_profile} 
                                color={electricBlue} 
                                titleColor={white} 
                            />
                            
                            <View style={homescreenalignmentMyappointment}>
                                <RaisedTextButton 
                                    onPress={()=>this.onUpdateProfile(token)} 
                                    title={update_profile} 
                                    color={electricBlue} 
                                    titleColor={white} 
                                />
                                
                                <View style={homescreenalignmentNearbyhospital}>
                                    <RaisedTextButton 
                                        onPress={()=>this.onViewProfile(token)} 
                                        title={view_profile} 
                                        color={electricBlue} 
                                        titleColor={white} 
                                    />
                                </View>

                                {/* <View style={homescreenalignmentNearbyhospital}>
                                <RaisedTextButton 
                                    onPress={()=>this.onAddDocuments(token)} 
                                    title={add_documents} 
                                    color={electricBlue} 
                                    titleColor={white} 
                                />
                                </View> */}

                                <View style={homescreenalignmentNearbyhospital}>
                                    <RaisedTextButton 
                                        onPress={()=>this.onFamilyProfile(token)} 
                                        title={myfamily_members} 
                                        color={electricBlue} 
                                        titleColor={white} 
                                    />
                                </View>

                                <View style={homescreenalignmentNearbyhospital}>
                                    <RaisedTextButton 
                                        onPress={()=>this.onEmergencyContacts(token)} 
                                        title={emergencycontacts} 
                                        color={electricBlue} 
                                        titleColor={white} 
                                    />
                                </View>
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