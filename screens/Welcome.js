import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, PageTitle, StyledFormArea, SubTitle, StyledButton, ButtonText, Line, WelcomeContainer, Avatar, WelcomeImage } from '../components/styles'

const Welcome = ({navigation}) => {
     
    return (
        <>
            <StatusBar style='dark'/>
            <InnerContainer>
                <WelcomeImage esizeMode="cover" source={require('../assets/banner.jpeg')}/>
                <WelcomeContainer>
                    <PageTitle Welcome={true}>Welcome Buddy!</PageTitle>
                    <SubTitle Welcome={true}>{'This app is made my'}</SubTitle>
                    <SubTitle Welcome={true}>{'Kartik Tara'}</SubTitle>
                    <StyledFormArea>
                    <Avatar resizeMode="cover" source={require('../assets/logo.png')} />
                        <Line />
                    <StyledButton onPress={() => {navigation.navigate('Login')}}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>

                </WelcomeContainer>
            </InnerContainer>
        </>
    )
};

export default Welcome
