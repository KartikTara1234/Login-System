import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, LeftIcon, PageLogo, PageTitle, StyledContainer, StyledFormArea, SubTitle, Colors, StyledInputLabel, StyledTextInput, RightIcon, StyledButton, ButtonText, MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent } from '../components/styles'
import { FastField, Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWraper from '../components/keyboardAvoidingWraper';
import axios from 'axios';

const {brand, darkLight, primary} = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://172.16.68.6/app_data/signin.php';
        axios
            .post(url, credentials)
            .then((responce) => {
                const result = responce.data;

                if(result == "YES")
                {
                    navigation.navigate("Welcome")
                }
            setSubmitting(false); 
            })
            .catch(error => {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occurred. Check your network and try again.");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWraper>
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                <PageTitle> Welcome Back </PageTitle>
                <SubTitle> Account Login </SubTitle>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if(values.email == '' || values.password == ''){
                            handleMessage('Please Fill all the fields');
                            setSubmitting(false);
                        }else{
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput 
                        label="Email Address"
                        icon="mail"
                        placeholder="abc@xyz.com"
                        placeholderTextColors={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        values={values.email}
                        keyboardType="email-address"
                    />
                    <MyTextInput 
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * * * * *"
                        placeholderTextColors={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        values={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox type={messageType}>{message}</MsgBox>
                    {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                        <ButtonText>Login</ButtonText>
                    </StyledButton>)}

                    {isSubmitting && (<StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} /> 
                    </StyledButton>)}

                    <Line/>
                    <StyledButton google={true} onPress={handleSubmit}>
                        <Fontisto name='google' color={primary} size={25}/>
                        <ButtonText google={true}>Sign in with Google</ButtonText>
                    </StyledButton>
                    <ExtraView>
                        <ExtraText>Don't have an account already? </ExtraText>
                        <TextLink onPress={() => navigation.navigate("Signup")}>
                            <TextLinkContent>Signup</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
                )}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWraper>
    )
};

const MyTextInput = ({label, icon,isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login
