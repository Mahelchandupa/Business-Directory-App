import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
   
  useWarmUpBrowser();
  
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  
  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 80 }}>
        <Image 
           style={{
              width: 180,
              height: 370,
              borderRadius: 20,
              borderColor: "#000",
              borderWidth: 6
           }}
           source={require('./../assets/images/login.png')} />
      </View>
      <View style={styles.subContainer}>
         <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', textAlign: "center" }}>Your Ulitmate 
            <Text style={{ color: Colors.PRIMARY  }}> Community Business Directory </Text>
          App
         </Text>
         <Text style={{ fontSize: 15, fontFamily: 'outfit', textAlign: 'center', marginVertical: 15, color: Colors.GRAY }}>Find your favorite business near you and post your own business to your community</Text>
         <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'outfit' }}>Lst's Get Started</Text>
         </TouchableOpacity> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: "#fff", 
        padding: 20,
        marginTop: -20,
    },
    btn: { 
        backgroundColor: Colors.PRIMARY,
        padding: 16, 
        borderRadius: 99,
        marginTop: 20 
    }
})