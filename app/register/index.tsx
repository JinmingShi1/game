import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

function Register({ navigation }): JSX.Element {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {register} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      
      
      <Image style={styles.pic} source={require('../../assets/pics/loginBanner.png')} />

      <Text style={styles.text}>Register</Text>

      <View style={{flexDirection: 'row', borderBottomColor: '#ccc', marginBottom: 20, borderBottomWidth: 1}}>
        <TextInput placeholder='Username' 
          onChangeText={v => setUserName(v)}
          style={styles.placeholder} 
          />
      </View>

      <View style={{flexDirection: 'row', borderBottomColor: '#ccc', marginBottom: 20, borderBottomWidth: 1}}>
        <TextInput placeholder='Password' 
          onChangeText={v => setPassword(v)}
          style={styles.placeholder} secureTextEntry={true} />
      </View>

      <TouchableOpacity onPress={() => {
        if (userName === '' || password === '') {
          Alert.alert('username or password empty');
          return;
        }
        register({username: userName, password});
      }} style={styles.button} >
        <Text style={styles.textStyle}>Register</Text>
      </TouchableOpacity>

      {/** sign up */}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
          <Text style={{textAlign:'center', color: '#68C2FE'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(233, 241, 242)',
  },
  pic: {
    width: 240,
    height: 240,
  },
  text: {
    width: '100%',
    textAlign: 'left',
    fontSize: 28, 
    fontWeight: '500', 
    color: '#333',
    marginTop: 24,
    marginBottom: 24,
  },
  placeholder: {
    paddingVertical: 0,
    flex: 1
  },
  button: {
    width: 240,
    backgroundColor: '#68C2FE',
    padding: 20, 
    borderRadius: 10,
    marginBottom: 30
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff'
  }
  
});

export default Register;
