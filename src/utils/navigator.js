/**
 * Created by Rahuld on 2017/08/26
 */

import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.11
import Fuego from '../components/SplashScreen/Fuego';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import RegisterScreen from '../components/RegisterScreen/RegisterScreen';
import HomeScreen from '../components/Home/HomeScreen';
import MyAccount from '../components/Account/MyAccount';
import MyAppoinment from '../components/Appoinment/MyAppoinment';
import MyReports from '../components/Account/MyReports';
import MyPrescription from '../components/Account/MyPrescription';
import Otp from '../components/OTPScreen/Otp';
import BuildProfile from '../components/Profiles/BuildProfile';
import UpdateProfile from '../components/Profiles/UpdateProfile';
import ViewProfile from '../components/Profiles/ViewProfile';
import ShareProfile from '../components/Profiles/ShareProfile';
//import NearbyHospital from '../components/Profiles/NearbyHospital';
import FirstPage from '../components/Profiles/FirstPage';
import FamilyMember from '../components/Profiles/FamilyMember';
import UploadFiles from '../components/Profiles/UploadFiles';
import ViewMembers from '../components/Profiles/ViewMembers';
import MembersInfo from '../components/Profiles/MembersInfo';
import Nomine from '../components/Profiles/Nomine';
//import ShareMembers from '../components/Profiles/ShareMembers';
import GeoLocation from '../components/Profiles/GeoLocation';
import ShareFamilyProfile from '../components/Profiles/ShareFamilyProfile';


/*Routing at difernt page */
export const Navigator  = StackNavigator({
  SplashPage: {screen: Fuego},
  LoginPage: {screen: LoginScreen},
  RegisterPage: {screen: RegisterScreen},
  HomePage: {screen: HomeScreen},
  AccountPage: {screen: MyAccount},
  AppoinmentPage: {screen: MyAppoinment},
  ReportPage: {screen: MyReports},
  PrescriptionPage: {screen:MyPrescription},
  OtpPage: {screen:Otp},
  BuildProfilePage: {screen:BuildProfile},
  UpdateProfilePage:{screen:UpdateProfile},
  ViewProfilePage:{screen:ViewProfile},
 ShareProfilePage:{screen:ShareProfile},
  //NearByHospitalPage:{screen:NearbyHospital}
  ViewMemberPage:{screen:ViewMembers},
  FirstProfilePage:{screen:FirstPage},
  UploadFilesPage:{screen: UploadFiles},
  MembersInfoPage:{screen:MembersInfo},
  //ShareMembersPage:{screen:ShareMembers},
 FamilyMemberPage:{screen:FamilyMember},
 NominePage:{screen:Nomine},
 GeoLocationPage:{screen:GeoLocation},
 ShareFamilyProfilePage:{screen:ShareFamilyProfile}

});