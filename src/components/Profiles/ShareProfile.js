import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         ScrollView,
         KeyboardAvoidingView ,
         TouchableOpacity
        } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import Toast from 'react-native-simple-toast';

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
    create_account_text,
    create_account_link
} = customtext;

const {
    loginscreenregisterInput,
    loginscreenregisterContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    loginscreenLoginContainer
} = customstyles;

const {
    white,
    black,
    electricBlue
} = colors;

const { base_url } = environment;

export default class LoginScreen extends Component {
    constructor() {
        super();

        this.onFocus = this.onFocus.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitUserName = this.onSubmitUserName.bind(this);
       // this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.onRegistration = this.onRegistration.bind(this);
        this.usernameRef = this.updateRef.bind(this, 'username');
       // this.passwordRef = this.updateRef.bind(this, 'password');
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.state = {
            username: '',
          //  password: '',
            secureTextEntry: true,
        };
    }
    
    validateEmail(value) {
        let regex = /\w[-._\w]*@[-._\w]*\w\.\w{2,5}/;
        if (regex.test(value) === true) {
            return true;
        } else {
            return false;
        }
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmitUserName() {
        this.username.focus();
    }

    onBlur() {
        let errors = {};
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
    }

    onChangeText(text) {
        ['username']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onSubmitLogin(token) {
        var token;
        let errors = {};

        ['username']
            .forEach((name) => {
                let value = this[name].value();
                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    if ('password' === name && value.length < 6) {
                        errors[name] = 'Too short';
                    }
                    //if ('username' === name && !validateEmail.test(value)) {
                    //  errors[name] = 'Invalid Email ID';
                    //}
                }
            });

        this.setState({ errors });
        return fetch(base_url + '/shareReports', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: this.state.username,
                token:token
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var message = responseJson.message;
            console.log('token'+ token);
            console.log("message"+responseJson.message);
            if (message === 'Invalid Request !') {
                Toast.show(message); 
            } else {
                console.log("Homepage");
                Toast.show(message);
                this.props.navigation.navigate('HomePage',{token:token});
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
        let name = secureTextEntry? 'visibility': 'visibility-off';
   /*     return (
            <MaterialIcon
                size={24}
                name={name}
                color={TextField.defaultProps.baseColor}
                onPress={this.onAccessoryPress}
                suppressHighlighting
            />
        );*/
    }

    onRegistration() {
        console.log("Registerpage");
        this.props.navigation.navigate('RegisterPage');
    }
    
    static navigationOptions = {
        header: null,
    }
    
    render() {
         var {params} = this.props.navigation.state;
         //var phone = params.Phone
         var token = params.token
        let { errors = {}, secureTextEntry, ...data } = this.state;
        let { username = 'username' } = data;
        let { password = 'password' } = data;

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenregisterContainer}>
                <View style={loginscreenLogoContainer}>
                    <Image
                        style={loginscreenLogo}
                        source={require('../../../assets/images/fuegologo.jpg')}
                    />
                    <Text style={loginTitle}>Please Enter Email To Share</Text>
                </View>
                <ScrollView>
                    <View style={loginscreenregisterInput}>
                        <TextField
                            ref={this.usernameRef}
                            value={data.username}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitUserName}
                            returnKeyType='next'
                            label="Email"
                            error={errors.username}
                            tintColor={black}
                            textColor={black}
                            onBlur={this.onBlur}
                        />
                        <View style={loginscreenLoginContainer}>
                            <RaisedTextButton
                                //onPress={this.onSubmitLogin} 
                                onPress={()=>this.onSubmitLogin(token)} 
                                title="Share"
                                color={electricBlue} 
                                titleColor={white} 
                            />
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