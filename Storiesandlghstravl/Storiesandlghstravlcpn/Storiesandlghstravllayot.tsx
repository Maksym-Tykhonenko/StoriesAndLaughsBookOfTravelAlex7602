import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

const Storiesandlghstravllayot = ({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) => {
  return (
    <ImageBackground
      source={require('../../assets/i/storiesandlghstravlbg.png')}
      style={styles.container}
      resizeMode="cover">
      {scrollable ? (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.flexFill}>{children}</View>
      )}
    </ImageBackground>
  );
};

export default Storiesandlghstravllayot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexFill: {
    flex: 1,
  },
});
