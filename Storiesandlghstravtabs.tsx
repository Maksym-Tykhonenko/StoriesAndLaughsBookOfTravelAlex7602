import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Storiesandlghstravlstrs from './Storiesandlghstravl/Storiesandlghstravlscrns/Storiesandlghstravlstrs';
import Storiesandlghstravljoks from './Storiesandlghstravl/Storiesandlghstravlscrns/Storiesandlghstravljoks';
import Storiesandlghstravlsavd from './Storiesandlghstravl/Storiesandlghstravlscrns/Storiesandlghstravlsavd';
import Storiesandlghstravlquz from './Storiesandlghstravl/Storiesandlghstravlscrns/Storiesandlghstravlquz';
import Storiesandlghstravlachv from './Storiesandlghstravl/Storiesandlghstravlscrns/Storiesandlghstravlachv';
import Storiesandlghstreslt from './Storiesandlghstravl/Storiesandlghstravlscrns/Storiesandlghstreslt';

const Tab = createBottomTabNavigator();

const StoriesandlghstravtabsAnimatedButton = (
  props: Record<string, unknown>,
) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const storiesandlghstravtabsScale = useRef(new Animated.Value(1)).current;

  const storiesandlghstravtabsHandlePressIn = () => {
    Animated.spring(storiesandlghstravtabsScale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const storiesandlghstravtabsHandlePressOut = () => {
    Animated.spring(storiesandlghstravtabsScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={storiesandlghstravtabsHandlePressIn}
      onPressOut={storiesandlghstravtabsHandlePressOut}
      style={[style as ViewStyle, styles.storiesandlghstravtabsButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.storiesandlghstravtabsButtonInner,
          {transform: [{scale: storiesandlghstravtabsScale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const StoriesandlghstravtabsIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.storiesandlghstravtabsIconWrap}>
      <View style={styles.storiesandlghstravtabsIconImageWrap}>
        <Image source={source} tintColor={focused ? undefined : '#FFFFFF99'} />
        {focused ? (
          <Image
            source={require('./assets/i/storiesandlghsel.png')}
            style={[
              styles.storiesandlghstravtabsIconSel,
              styles.storiesandlghstravtabsIconSelFocused,
            ]}
          />
        ) : null}
      </View>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        numberOfLines={1}
        style={[
          styles.storiesandlghstravtabsLabel,
          focused
            ? styles.storiesandlghstravtabsLabelFocused
            : styles.storiesandlghstravtabsLabelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const storiesandlghstravtabsBarBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#1E0F0BF2', '#2A1410F2']}
    style={StyleSheet.absoluteFill}
  />
);

const storiesandlghstravtabsIconPlaces = ({focused}: {focused: boolean}) => (
  <StoriesandlghstravtabsIcon
    focused={focused}
    label="Stories"
    source={require('./assets/i/storiesandlghtab1.png')}
  />
);

const storiesandlghstravtabsIconSaved = ({focused}: {focused: boolean}) => (
  <StoriesandlghstravtabsIcon
    focused={focused}
    label="Jokes"
    source={require('./assets/i/storiesandlghtab2.png')}
  />
);

const storiesandlghstravtabsIconMap = ({focused}: {focused: boolean}) => (
  <StoriesandlghstravtabsIcon
    focused={focused}
    label="Saved"
    source={require('./assets/i/storiesandlghtab3.png')}
  />
);

const storiesandlghstravtabsIconBlog = ({focused}: {focused: boolean}) => (
  <StoriesandlghstravtabsIcon
    focused={focused}
    label="Quiz"
    source={require('./assets/i/storiesandlghtab4.png')}
  />
);

const storiesandlghstravtabsIconFacts = ({focused}: {focused: boolean}) => (
  <StoriesandlghstravtabsIcon
    focused={focused}
    label="Relics"
    source={require('./assets/i/storiesandlghtab5.png')}
  />
);

const storiesandlghstravtabsIconQuiz = ({focused}: {focused: boolean}) => (
  <StoriesandlghstravtabsIcon
    focused={focused}
    label="Results"
    source={require('./assets/i/storiesandlghtab6.png')}
  />
);

const storiesandlghstravtabsButton = (props: Record<string, unknown>) => (
  <StoriesandlghstravtabsAnimatedButton {...props} />
);

const Storiesandlghstravtabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.storiesandlghstravtabsBar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarButton: storiesandlghstravtabsButton,
        tabBarBackground: storiesandlghstravtabsBarBackground,
      }}>
      <Tab.Screen
        name="Storiesandlghstravlstrs"
        component={Storiesandlghstravlstrs}
        options={{
          tabBarIcon: storiesandlghstravtabsIconPlaces,
        }}
      />
      <Tab.Screen
        name="Storiesandlghstravljoks"
        component={Storiesandlghstravljoks}
        options={{
          tabBarIcon: storiesandlghstravtabsIconSaved,
        }}
      />
      <Tab.Screen
        name="Storiesandlghstravlsavd"
        component={Storiesandlghstravlsavd}
        options={{
          tabBarIcon: storiesandlghstravtabsIconMap,
        }}
      />
      <Tab.Screen
        name="Storiesandlghstravlquz"
        component={Storiesandlghstravlquz}
        options={{
          tabBarIcon: storiesandlghstravtabsIconBlog,
        }}
      />
      <Tab.Screen
        name="Storiesandlghstravlachv"
        component={Storiesandlghstravlachv}
        options={{
          tabBarIcon: storiesandlghstravtabsIconFacts,
        }}
      />
      <Tab.Screen
        name="Storiesandlghstreslt"
        component={Storiesandlghstreslt}
        options={{
          tabBarIcon: storiesandlghstravtabsIconQuiz,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  storiesandlghstravtabsLabelFocused: {
    color: '#FFD966',
  },
  storiesandlghstravtabsBar: {
    elevation: 0,
    paddingTop: 16,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 10,
    borderColor: '#303030',
    borderTopWidth: 1,
    borderTopColor: '#303030',
    backgroundColor: 'transparent',
    height: 65,
    paddingBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    bottom: 30,
    borderRadius: 28,
    marginHorizontal: 15,
  },

  storiesandlghstravtabsButton: {
    flex: 1,
  },
  storiesandlghstravtabsButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  storiesandlghstravtabsIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravtabsIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravtabsIconSel: {
    position: 'absolute',
    top: -19,
  },
  storiesandlghstravtabsIconSelFocused: {
    zIndex: -1,
  },

  storiesandlghstravtabsIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravtabsIconCircleFocused: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  storiesandlghstravtabsLabel: {
    fontSize: 9,
    fontFamily: 'Commissioner-Medium',
    marginTop: 4,
    maxWidth: 72,
    textAlign: 'center',
  },
  storiesandlghstravtabsLabelIdle: {
    color: '#B8B8B8',
  },
});

export default Storiesandlghstravtabs;
