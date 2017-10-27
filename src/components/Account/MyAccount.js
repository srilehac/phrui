import React, { Component } from 'react';
import { StyleSheet, Text, View,Button,ScrollView} from 'react-native';
import customstyles from '../../../assets/styles/customstyles';
import { NavigationActions } from 'react-navigation';
import { RaisedTextButton } from 'react-native-material-buttons';
import colors from '../../utils/colors';
import customtext from '../../utils/customtext';

const {
  HomeScreenWelcome,
  /*HomeScreenProfile,
  HomeScreenReport,
  scrollBoxText,
  scrollBox,*/
  loginscreenContainer,
  myscreenLoginContainer,
  loginscreenInputContainer,
  loginTitle
} = customstyles;

const { white,
  black,
  electricBlue
} = colors;
const {
  login_labelmyfamily,
  login_labelmyreport,
  login_labelmyprescription,
  login_labelmyvisits,
  login_labelmyrequests
} = customtext;

export default class MyAccount extends Component {
  constructor() {
    super();
    this.onMyReports = this.onMyReports.bind(this);
  }
  onMyReports(){
    console.log("ReportPage");
    this.props.navigation.navigate('ReportPage');
}

onMyPrescription(){
  console.log("PrescriptionPage");
  this.props.navigation.navigate('PrescriptionPage');
}
onMyRequets(){
  console.log("RequestPage");
  this.props.navigation.navigate('RequestPage');
}

 /* static navigationOptions = {
    header: null
  }*/
 render() {
    return (
     <View style={{flex: 1}}>
      <View style={HomeScreenWelcome}>
        <Text style={loginTitle}>
        My Account
              
       </Text>
        </View>

   
        <View style={loginscreenInputContainer}>
                   
                         <View style={myscreenLoginContainer}>
                  
                         <RaisedTextButton 
                            onPress={this.onMyAccount} 
                            title={login_labelmyfamily} 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                        
                         <View style={myscreenLoginContainer}>
                         <RaisedTextButton 
                            onPress={()=>this.onMyReports()} 
                            title={login_labelmyreport}
                           color={electricBlue} 
                            titleColor={white} 
                        />  
                                    
                    <View style={myscreenLoginContainer}>
                         <RaisedTextButton 
                            onPress={()=>this.onMyPrescription()} 
                            title={login_labelmyprescription} 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                        
                        <View style={myscreenLoginContainer}>
                         <RaisedTextButton 
                            onPress={this.onMyAccount}   
                            title={login_labelmyvisits} 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                       
                        <View style={myscreenLoginContainer}>
                         <RaisedTextButton 
                            onPress={()=>this.onMyRequets()}
                            title={login_labelmyrequests} 
                            color={electricBlue} 
                            titleColor={white} 
                        />
                         
                        </View>

                        </View>
                        </View>
                        </View>
                        </View> 
                        </View>
                        </View>
              
          
   );
  }
}