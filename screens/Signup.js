import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, LeftIcon, PageLogo, PageTitle, StyledContainer, StyledFormArea, SubTitle, Colors, StyledInputLabel, StyledTextInput, RightIcon, StyledButton, ButtonText, MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent } from '../components/styles'
import { Formik } from 'formik';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWraper from '../components/keyboardAvoidingWraper';
import axios from 'axios';

const {brand, darkLight, primary} = Colors;

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [dob, setDob] = useState();
    const [mode, setMode] = useState('date');
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();


    
    const onChange =(event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = (mode) => {
        
        setShow(true);
        setMode('date')
    }

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        console.log(credentials)
        const url = 'http://172.16.68.6/app_data/insert.php';
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
                <PageTitle> Let's Start </PageTitle>
                <SubTitle> Create Account </SubTitle>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <Formik
                    initialValues={{name: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        values = {...values, dateOfBirth: dob};
                        if(values.email == '' || values.password == '' || values.name == '' || values.dateOfBirth == '' || values.confirmPassword == ''){
                            handleMessage('Please Fill all the fields');
                            setSubmitting(false);
                        }else if(values.password !== values.confirmPassword){
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        }
                        else{
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput 
                        label="Full Name"
                        icon="person"
                        placeholder="Kartik Tara"
                        placeholderTextColors={darkLight}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        values={values.name}
                    />
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
                        label="Date of birth"
                        icon="calendar"
                        placeholder="DD - MM - YYYY"
                        placeholderTextColors={darkLight}
                        onChangeText={handleChange('dateOfBirth')}
                        onBlur={handleBlur('dateOfBirth')}
                        values={dob ? dob.toDateString() : ''}
                        isDate={true}
                        editable={false}
                        showDatePicker={showDatePicker}
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
                    <MyTextInput 
                        label="Confirm Password"
                        icon="lock"
                        placeholder="* * * * * * * * *"
                        placeholderTextColors={darkLight}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        values={values.confirmPassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox type={messageType}>{message}</MsgBox>

                    {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                        <ButtonText>Signup</ButtonText>
                    </StyledButton>)}

                    {isSubmitting && (<StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} /> 
                    </StyledButton>)}

                    <Line/>
                    <ExtraView>
                        <ExtraText>Already have an account? </ExtraText>
                        <TextLink>
                            <TextLinkContent onPress={() => navigation.navigate('Login')}>Login</TextLinkContent>
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

const MyTextInput = ({label, icon,isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup
