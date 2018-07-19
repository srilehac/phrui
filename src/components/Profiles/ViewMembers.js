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
import { TextField } from 'react-native-material-textfield';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import Toast from 'react-native-simple-toast';
//import Prompt from 'react-native-prompt';
import Button from 'react-native-button';

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

const { 
    Otp_message,
    Otp_label,
    Otp_button
 } = customtext;

const {
    loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    loginscreenLoginContainer,
    ViewProfilecontainer,
    MyPorfileView
 } = customstyles;

const {
    white,
    black,
    electricBlue
 } = colors;

const { base_url } = environment;

var _id;
var name,token;
var member;
var i;

export default class ViewProfile extends Component {
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
       // this.onSubmitShareReport = this.onSubmitShareReport.bind(this);
        this.onClickHome = this.onClickHome.bind(this.item);
      //  this.onClickShare = this.onClickShare.bind(this);
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
        let name = secureTextEntry ? 'visibility' : 'visibility-off';
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

    onClickHome = (item) => {
        this.setState({basicNoTitleVisible: true});
        console.log('token',token);
        member=item.member;
        console.log("displying member")
        console.log('member',item.member);
        {
            let errors = {};
            this.setState({loading_blur: true});
        // .forEach((name) => {
        //     let value = this[name].value();
        //      (!value) 
        //         errors[name] = 'Should not be empty';
        // });

     //   this.setState({ errors });
            return fetch(base_url + '/fmgetProfile', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ 
                    rapidID: member
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var profileObj = responseJson.profileObj;
                var growableObj = responseJson.growableObj;
                var date = responseJson.date;
                var time = responseJson.time;
                var message = responseJson.message
                // console.log('phone'+ phone);
                console.log("growable"+responseJson.growableObj);
                //  console.log("profgender"+JSON.stringify(profileObj.GenderType));
         
                if (message === 'Profile Not Built Yet' || message === 'Internal Server Error!' || message === 'invalid token') {
                    Toast.show(message); 
                } else {
                    //Toast.show(message);
                    console.log("memberInfoPage");
                    this.props.navigation.navigate('MembersInfoPage', {token:token, profileObj:profileObj, growableObj:growableObj, date:date, time:time, member:member});
                    this.setState({loading_blur: false});
                    this.setState({showComponent: true});
                }
            }).catch((error) => {
                console.error(error);
            });
        }
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
            } else {
                (message === 'otp verified')
                console.log("Loginpage");
                Toast.show(message);
                this.props.navigation.navigate('LoginPage');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;
        let name = secureTextEntry ? 'visibility' : 'visibility-off';  
    }

    static navigationOptions = {
        title: 'MY FAMILY MEMBERS',
        headerStyle: { backgroundColor: 'powderblue' },
        headerTitleStyle: { color:'Black', alignSelf:'center' },
    }
    
    //  getItem = (item) => {
    //     this.setState({basicNoTitleVisible: true});
    //     name = item.name;
    //     member = item.member;
    //  }
    
    render() {
        var {params} = this.props.navigation.state;
        token = params.token;
        var message = params.message;
        console.log("token",token);
        console.log("message",message);
        //  console.log("name",name);
        var name1 = [];

        for(i = 0; i < message.length; i++) {
            name1.push(message[i]);
        }      
        
        // console.log('message1 line 236',name1);
        // console.log('profileObj abc',profileObj1);
        let { errors = {}, secureTextEntry, ...data } = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                <ScrollView>
                    <View style={MyPorfileView}>
                        {message.map((item, index) => (
                            <View key={item.name}  style={customstyles.ViewProfilecontainer}>
                                <TouchableOpacity onPress={() => this.onClickHome(item)}>                      
                                    <Text style={customstyles.MyPorfileView}>Name: {item.name}</Text>
                                    <Text style={customstyles.MyPorfileView}>Rapid Id:{item.member}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>
                                {this.state.message}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}