/**
 * Created by Rahuld on 2017/08/26
 */
import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         KeyboardAvoidingView ,
         TouchableOpacity,
         Alert,
         ScrollView
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
//import Prompt from 'react-native-prompt';
import Button from 'react-native-button';
import environment from '../../utils/environment';
/*importing and using from const*/
const { 
        loginscreenLogoContainer,
        loginscreenLogo,
        loginTitle 
    } = customstyles;

const { 
    Otp_message,
    Otp_label,
    Otp_button
 } = customtext;
const { loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    loginscreenLoginContainer,
    ViewProfilecontainer,
    MyPorfileView
 } = customstyles;
const { white,
    black,
    electricBlue
 } = colors; 
   var i;
   var member;
const { base_url } = environment;

export default class MembersInfo extends Component {
    constructor() {
        super();

        this.onFocus = this.onFocus.bind(this);
        this.onSubmitSubmit = this.onSubmitSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitOtp = this.onSubmitOtp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.OtpRef = this.updateRef.bind(this, 'Otp');
        this.renderOtpAccessory = this.renderOtpAccessory.bind(this);
        this.onSubmitShareReport = this.onSubmitShareReport.bind(this);
        this.onClickHome = this.onClickHome.bind(this);
        this.onClickShare = this.onClickShare.bind(this);
        
        this.state = {
            basicNoTitleVisible: false
          }

        
      
    }
    

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmitOtp() {
        this.otp.focus();
    }


    onBlur() {
        let errors = {};
        
        ['Otp']
        .forEach((name) => {
            let value = this[name].value();
            
               (!value) 
                errors[name] = 'Should not be empty';
            
        });
        
        this.setState({ errors });
    }

    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onChangeText(text) {
        ['Otp']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
                this.setState({ [name]: text });
            }
        });
    }
     updateRef(name, ref) {
        this[name] = ref;
    }
       renderOtpAccessory() {
        let {secureTextEntry} = this.state;
        let name = secureTextEntry
            ? 'visibility'
            : 'visibility-off';
       /* return (<MaterialIcon
            size={24}
            name={name}
            color={TextField.defaultProps.baseColor}
            onPress={this.onAccessoryPress}
            suppressHighlighting/>); */
    }

    /*onSubmitShareReport(){
        Alert.alert(
        <Prompt
            title="Say something"
            placeholder="Start typing"
            defaultValue="Hello"
            //visible={this.state.promptVisible}
            //onCancel={() => this.setState({ promptVisible: false, message: "You cancelled" })}
            onSubmit={(value) => this.setState({ promptVisible: false, message: `You said "${value}"` })}/>
      )
    }*/
    onClickHome(token){
        console.log("Homepage");
        console.log('token',token);
        this.props.navigation.navigate('HomePage',{token:token});
    }

    onClickShare(token){
        console.log("ShareMemberPage");
        console.log('token',token)
        console.log('member',member)
        this.props.navigation.navigate('ShareFamilyProfilePage',{token:token,member:member});
    }

    onSubmitSubmit(phone) {
       
        let errors = {};
        this.setState({loading_blur: true});
        ['Otp']
        .forEach((name) => {
            let value = this[name].value();

             (!value) 
                errors[name] = 'Should not be empty';
             
        });

        this.setState({ errors });
        return fetch(base_url + '/user/phoneverification', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
Otp: this.state.otp,
Phone:phone
 })
})
.then((response) => response.json())
      .then((responseJson) => {
        var message = responseJson.message;
        console.log("message"+responseJson.message);
        if (message === 'not a valid phone no' || message === 'cant fetch !' || message === 'Please enter a valid otp') {
                 Toast.show(message); 
                  }
                       else {
                (message === 'otp verified')
                 console.log("Loginpage");
                 Toast.show(message);
                 this.props.navigation.navigate('LoginPage');
            }
       
      })
      .catch((error) => {
        console.error(error);
      });
        

    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;

        let name = secureTextEntry?
            'visibility':
            'visibility-off';

  
    }

 static navigationOptions = {
  title: 'FAMILY HEALTH RECORD',
  headerStyle: { backgroundColor: 'powderblue' },
  headerTitleStyle: { color:'Black',alignSelf:'center' },
}
    

    
    render() {
        var {params} = this.props.navigation.state;
        var token = params.token;
        // var message = params.message;
        console.log("my page")
      //  var rapidId=params.rapidID
       // console.log("inhomepage"+rapidId)
        var profileObj = params.profileObj;
        var growableObj = params.growableObj;
        var date = params.date;
        var time = params.time;
        member = params.member;
        console.log("xyz"+JSON.stringify(profileObj));
        console.log("abc"+JSON.stringify(growableObj));
        console.log("date"+JSON.stringify(date));
        console.log("RapidId"+member)
       // var profileObj=message[0].profileObj
      //  console.log('message'+message);
        
        // var growableObj1 = [];

        // for( i = 1; i < message.length ; i++)   
        //     {
        //         growableObj1.push(message[i].growableObj);
        //     }      
        //     console.log('growable1 line 236',growableObj1);
        //     // console.log('profileObj abc',profileObj1);
        
        let { errors = {}, secureTextEntry, ...data } = this.state;
        
  

        return (
             <KeyboardAvoidingView behavior="padding" style={MyPorfileView}>
              <ScrollView>
                   <View style={{backgroundColor: 'aqua'}} />
                    <View style={MyPorfileView}>
                      
                        
                 <View style={MyPorfileView}>
                        
                    
            
                        <View style={customstyles.ViewProfilecontainer}>
                           
                       <Text style={loginTitle}>PROFILE</Text>
                            <Text style={customstyles.MyPorfileView}>Name: {profileObj.Name}</Text>
                            <Text style={customstyles.MyPorfileView}>Family Physician Name: Dr. {profileObj.FamilyPhysicianName}</Text>
                            <Text style={customstyles.MyPorfileView}>DOB: {profileObj.DOB}</Text>
                            <Text style={customstyles.MyPorfileView}>Medical History: {profileObj.MedicalHistory}</Text>
                            <Text style={customstyles.MyPorfileView}>Address: {profileObj.Address}</Text>
                            <Text style={customstyles.MyPorfileView}>Gender Type: {profileObj.GenderType}</Text>
                          </View>
                          {growableObj.map((item, index) => (
                           <View style={customstyles.ViewProfilecontainer}>
                             <Text style={loginTitle}>HISTORY</Text>
                            <Text style={customstyles.MyPorfileView}>Blood Group: {item.growableObj.Blood}</Text>
                            <Text style={customstyles.MyPorfileView}>Height: {item.growableObj.Height} Feet</Text>
                            <Text style={customstyles.MyPorfileView}>Weight: {item.growableObj.Weight} Kg</Text>
                            <Text style={customstyles.MyPorfileView}>Blood Pressure: {item.growableObj.BloodPressure} mm Hg</Text>
                            <Text style={customstyles.MyPorfileView}>Pulse Rate: {item.growableObj.PulseRate} BPM</Text>
                            <Text style={customstyles.MyPorfileView}>is Suffering from any Disease?: {item.growableObj.DiseaseType}</Text>
                            <Text style={customstyles.MyPorfileView}>Remarks: {item.growableObj.Remarks}</Text>
                            <Text style={customstyles.MyPorfileView}>Date: {item.date}</Text>
                             <Text style={customstyles.MyPorfileView}>Time: {item.time}</Text>
                            </View>
                        
                    ))
                    }
                    </View>
                   
                
                </View>
                                    
                
                
               
                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <View style={{ height: 80, justifyContent: 'flex-end' }}>
            <Button style={{ fontSize: 20, color: white }} 
           containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: electricBlue}}
           onPress={() =>this.onClickShare(token)}>
                Share My Report
                </Button>
          
        </View>

                <View style={{ height: 80, justifyContent: 'flex-end' }}>
          <Button style={{ fontSize: 20, color: white }} 
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: electricBlue}}
            onPress={()=>this.onClickHome(token)}>
            Go To Home
          </Button>
          
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 }}>
            {this.state.message}
          </Text>
        </View>
       
      </View>

               
         </ScrollView>
            </KeyboardAvoidingView>
            
             
            
                    )
        
    }
}