import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, TextInput, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Api from './Api';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginForm, setToken, setFormError, selectLoginError, setFormPassword, setFormUsername, setFormStatus, resetAllErr } from './store/Login';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const form = useSelector(selectLoginForm);
  const error = useSelector(selectLoginError);
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    dispatch(setFormStatus(true));
    try {
      const response = await Api.post('auth/login', form);
      if (response.data.code === 200) {
        var value = response.data.data.token_type + " " + response.data.data.access_token;
        dispatch(setToken(value));
        navigation.replace('Main')
      }
      else if (response.data.code === 400) {
        dispatch(setFormError(response.data.errors));
      }
    }
    catch (e) {
      console.log("login", e);
    }
  }

  useEffect(()=>{
    console.log('form', form);
    if(form.isSubmitted){
      dispatch(resetAllErr());
      dispatch(setFormStatus(false));
    }
  }, [form.isSubmitted])

  const handlePressIcon = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={styles.view}>
      <Image
        style={styles.tinyLogo}
        source={require('./favicon.png')}
      />
      <Text style={styles.textErr}>{error}</Text>
      <Text style={styles.text}>Tên tài khoản</Text>
      <TextInput
        style={styles.input(form.errUsername)}
        value={form.username}
        onChangeText={(e) => dispatch(setFormUsername(e))}
        placeholder="Nhập tên tài khoản" />
      <Text style={styles.textErr}>{form.errUsername}</Text>
      <Text style={styles.text}>Mật khẩu</Text>
      <View style={{ width: '80%', position: 'relative', paddingBottom: 10, }}>
        <TextInput style={{
          height: 40,
          margin: 0,
          marginTop: 12,
          borderWidth: 1,
          borderColor: (form.errPassword === null) ? '#dddddd' : 'red',
          padding: 10,
          borderRadius: 10,
        }}
          value={form.password}
          onChangeText={(e) => dispatch(setFormPassword(e))}
          secureTextEntry={!showPassword}
          placeholder="Nhập mật khẩu" />
        <Icon
          name={showPassword ? "eye" : "eye-slash"}
          color="#0a8d9d"
          size={20}
          style={{ position: 'absolute', right: 10, top: 22 }}
          onPress={(handlePressIcon)} />
      </View>
      <Text style={styles.textErr}>{form.errPassword}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={login}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  input: (err) => {
    return {
      height: 40,
      width: '80%',
      margin: 12,
      borderWidth: 1,
      borderColor: (err === null) ? '#dddddd' : 'red',
      padding: 10,
      borderRadius: 10,
    }
  },
  text: {
    width: '80%',
    fontWeight: 'bold',
    color: 'black',
  },
  textErr: {
    width: '80%',
    color: 'red',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#0a8d9d',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  tinyLogo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
});

export default Login;