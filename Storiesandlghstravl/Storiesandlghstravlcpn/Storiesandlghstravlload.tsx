// loader html

import WebView from 'react-native-webview';

import {Animated, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const storiesandlghstravlLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body {
    margin: 0;
    padding: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loaderBar {
    width: calc(160px / 0.707);
    height: 10px;
    background: #F9F9F9;
    border-radius: 10px;
    border: 1px solid #006DFE;
    position: relative;
    overflow: hidden;
  }

  .loaderBar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 5px;
    background: repeating-linear-gradient(
      45deg,
      #0031F2 0 30px,
      #006DFE 0 40px
    );
    background-size: 200% 100%;
    animation: fillProgress 6s ease-in-out infinite,
               lightEffect 1s linear infinite;
  }

  @keyframes fillProgress {
    0% { width: 0; }
    33% { width: 33.333%; }
    66% { width: 66.67%; }
    100% { width: 100%; }
  }

  @keyframes lightEffect {
    0%,20%,40%,60%,80%,100% {
      background: repeating-linear-gradient(
        45deg,
        #0031F2 0 30px,
        #006DFE 0 40px
      );
      background-size: 200% 100%;
    }

    10%,30%,50%,70%,90% {
      background: repeating-linear-gradient(
        45deg,
        #0031F2 0 30px,
        #006DFE 0 40px,
        rgba(255,255,255,0.3) 0 40px
      );
      background-size: 200% 100%;
    }
  }
</style>
</head>
<body>
  <div class="loaderBar"></div>
</body>
</html>
`;

const Storiesandlghstravlload = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const storiesandlghstravlTimer = setTimeout(() => {
      navigation.navigate('Storiesandlghstravlonb' as never);
    }, 6000);

    return () => clearTimeout(storiesandlghstravlTimer);
  }, [navigation]);

  return (
    <View style={styles.storiesandlghstravlImageBg}>
      <ScrollView
        contentContainerStyle={styles.storiesandlghstravlScrollContent}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            height: 550,
          }}>
          <Image source={require('../../assets/i/storiesandlgload.png')} />
        </View>
        <View style={styles.storiesandlghstravlWebviewDock}>
          <WebView
            originWhitelist={['*']}
            source={{html: storiesandlghstravlLoaderHTML}}
            style={styles.storiesandlghstravlWebview}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Storiesandlghstravlload;

const styles = StyleSheet.create({
  storiesandlghstravlImageBg: {
    flex: 1,
    backgroundColor: '#000',
  },
  storiesandlghstravlScrollContent: {
    flexGrow: 1,
  },
  storiesandlghstravlWebviewDock: {
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  storiesandlghstravlWebview: {
    backgroundColor: 'transparent',
    width: 260,
    height: 150,
  },
});
