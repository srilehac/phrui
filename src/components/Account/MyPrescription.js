import React, { Component } from 'react';
import { StyleSheet, Text, View,Button,ScrollView} from 'react-native';
import customstyles from '../../../assets/styles/customstyles';
import { NavigationActions } from 'react-navigation';
import { RaisedTextButton } from 'react-native-material-buttons';
import colors from '../../utils/colors';
import customtext from '../../utils/customtext';

const {
  HomeScreenWelcome,  
   scrollBox,
    myscreenLoginContainer,
    loginscreenContainer,
    loginscreenInputContainer,
    loginTitle
  } = customstyles;
  
 const { white,
    black,
    electricBlue
  } = colors;
  const {
    login_hospitalmedication,
    login_myuploads
  } = customtext;
  
 
 export default class MyAppoinment extends Component {
   /* static navigationOptions = {
      header: null
    }*/
  
   render() {
      return (
        <View style={{flex: 1}}>
        <View style={HomeScreenWelcome}>
          <Text style={loginTitle}>
           My Prescription     
         </Text>
          </View>
  
     
          <View style={loginscreenInputContainer}>
                     
                           <View style={myscreenLoginContainer}>
                    
                           <RaisedTextButton 
                              onPress={this.onMyPrescription} 
                              title={login_hospitalmedication} 
                              color={electricBlue} 
                              titleColor={white} 
                          />
                           <View style={myscreenLoginContainer}>
                           <RaisedTextButton 
                              onPress={this.onMyPrescription} 
                              title={login_myuploads} 
                              color={electricBlue} 
                              titleColor={white} 
                          />
                           
                          </View>
                      </View>
                      </View>
                      
  
                  </View>
                
            
     );
    }
  }