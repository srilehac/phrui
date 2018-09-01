/*anything to be set and could be commonly used in all files*/
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import colors from '../../src/utils/colors';

const { turquoise,
        white,
        black, 
        emerald,
        clouds,
        electricBlue,
        aqua,
        powderblue
     } = colors;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    wrapper: {
        backgroundColor: white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
    },

    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    },

    title: {
        color: white,
        fontSize: 35,
        fontWeight: 'bold',
    },

    subtitle: {
        color: black,
         fontSize: 20,
        fontWeight: 'bold'
    },

    subtitleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },

    splashscreenLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },

    splashscreenLoadingWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },

    loginscreenContainer: {
        flex: 1,
        backgroundColor: 'aqua'
    },

    loginscreenLogoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginscreenLogo: {
        width: 100,
        height: 100
    },

    homescreenLogo: {
        paddingBottom: 10,
        paddingTop:10,
        height: 200,
        width: 400
    },

    loginTitle: {
        color: black,
        textAlign: 'center',
        opacity: 0.9,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        width: 300
    },
    logintitle: {
        color: '#80ff00',
        textAlign: 'center',
        opacity: 0.9,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        width: 300
    },

    loginscreenInputContainer: {
        backgroundColor:'powderblue',
        marginHorizontal: 4,
        marginVertical: 8,
       paddingHorizontal: 8
    },

    loginscreenLoginContainer: {
        paddingTop: 20
    },

    homescreenalignmentMyaccount: {
        paddingTop : 20
    },

    headerStyle: {
            backgroundColor: 'black',
                },

    homescreenalignmentMyappointment:{
        paddingTop : 20
    },

    homescreenalignmentNearbyhospital:{
        paddingTop : 20
    },
    
    homescreenalignmentLogout:{
        paddingTop : 20
    },


    loginscreenCreateAccountContainer: {
        flex: 1
    },

    loginscreenCreateAccountWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20,
    },

    loginscreenCreateAccountText: {
        color: black
    },

    loginscreenCreateAccountLinkText: {
        color: black,
        marginLeft: 5,
    },
   
    ViewProfilecontainer:{
        padding: 10,
        margin: 2,
       // borderColor: '#2a4944',
       // borderWidth: 1,
        backgroundColor: electricBlue
    },

    HomeScreenWelcome: {
      
        fontSize: 200,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        alignItems:'center',
        justifyContent:'center'
    },

    myscreenLoginContainer: {
       
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    
        
    },
    myscreenviewcontainer:{
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        
    },

    MyPorfileView :{
        flex: 1,
        color: white

    },

    ViewButtonContainer : {
       padding: 25,
       },

       loginscreenregisterContainer : {
        flex: 1,
        backgroundColor: 'aqua'
       },

       loginscreenregisterInput: {
       flex:1,
       flexDirection: 'column',
       justifyContent: 'space-between',
       backgroundColor: 'powderblue',
       marginHorizontal: 15,
       marginVertical: 15,
      paddingHorizontal: 10
       },
    containerDate: {
        width:315,
        color: 'gainsboro'
    },
        
});