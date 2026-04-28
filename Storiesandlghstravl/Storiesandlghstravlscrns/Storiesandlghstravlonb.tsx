import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Storiesandlghstravllayot from '../Storiesandlghstravlcpn/Storiesandlghstravllayot';

const storiesandlghstravlPages = [
  {
    title: 'Travel Through Humor',
    description:
      'Explore stories and jokes inspired by cultures from around the world.',
    image: require('../../assets/i/storiesandlghon1.png'),
  },
  {
    title: `Different Cultures, 
Different Humor`,
    description:
      'From Greece to China — each region brings its own tone, style, and mood.',
    image: require('../../assets/i/storiesandlghon2.png'),
  },
  {
    title: `Stories & Jokes in 
One Place`,
    description:
      'Read short tales, browse jokes, and save the ones you enjoy the most.',
    image: require('../../assets/i/storiesandlghon3.png'),
  },
  {
    title: `Choose the Funniest 
Ending`,
    description:
      'Complete jokes by picking the punchline that feels the most fitting.',
    image: require('../../assets/i/storiesandlghon4.png'),
  },
  {
    title: `Track Your Humor Style`,
    description:
      'See your quiz results and progress as you explore more content.',
    image: require('../../assets/i/storiesandlghon5.png'),
  },
];

const Storiesandlghstravlonb = () => {
  const [storiesandlghstravlCurrentPage, setStoriesandlghstravlCurrentPage] =
    useState(0);
  const navigation = useNavigation();

  const storiesandlghstravlNext = () => {
    storiesandlghstravlCurrentPage < 4
      ? setStoriesandlghstravlCurrentPage(storiesandlghstravlCurrentPage + 1)
      : navigation.navigate('Storiesandlghstravtabs' as never);
  };

  const storiesandlghstravlSkip = () => {
    navigation.navigate('Storiesandlghstravtabs' as never);
  };

  return (
    <Storiesandlghstravllayot>
      <View style={styles.storiesandlghstravlContainer}>
        <View>
          <View style={styles.storiesandlghspagination}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <View
                key={item}
                style={[
                  styles.storiesandlghspaginationItem,
                  {
                    backgroundColor:
                      storiesandlghstravlCurrentPage >= index
                        ? '#FFD36A'
                        : '#FFD36A33',
                  },
                ]}></View>
            ))}
          </View>

          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.storiesandlghstravlTitle}>
              {storiesandlghstravlPages[storiesandlghstravlCurrentPage].title}
            </Text>
            <Text style={styles.storiesandlghstravlDescription}>
              {
                storiesandlghstravlPages[storiesandlghstravlCurrentPage]
                  .description
              }
            </Text>
          </View>
        </View>

        <Image
          source={
            storiesandlghstravlPages[storiesandlghstravlCurrentPage].image
          }
          style={{marginVertical: 30}}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 16,
            width: '90%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={styles.storiesandlghstravlSkipButton}
            onPress={storiesandlghstravlSkip}
            activeOpacity={0.8}>
            <Text style={styles.storiesandlghstravlSkipButtonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={storiesandlghstravlNext}
            activeOpacity={0.8}>
            <View style={styles.storiesandlghstravlNextButtonShadow}>
              <LinearGradient
                colors={['#2A5CFF', '#2D1AD9', '#1429B5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.storiesandlghstravlNextButton}>
                <Text style={styles.storiesandlghstravlNextButtonText}>
                  {storiesandlghstravlCurrentPage === 4
                    ? 'Start Your Journey '
                    : 'Next'}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Storiesandlghstravllayot>
  );
};

const styles = StyleSheet.create({
  storiesandlghstravlNextButtonShadow: {
    flex: 1,
    borderRadius: 16,
    shadowColor: 'rgb(14, 83, 133)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
  },

  storiesandlghstravlContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 50,
    alignItems: 'center',
  },
  storiesandlghspagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  storiesandlghspaginationItem: {
    flex: 1,
    height: 4,
    borderRadius: 10,
    backgroundColor: '#FFD36A33',
  },
  storiesandlghstravlSkipButton: {
    borderWidth: 1.1,
    borderColor: '#3A1C16',
    borderRadius: 16,
    width: 82,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravlSkipButtonText: {
    color: '#FFFFFF99',
    fontFamily: 'Commissioner-Medium',
    fontSize: 16,
  },

  storiesandlghstravlNextButton: {
    backgroundColor: '#0031F2',
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  storiesandlghstravlNextButtonText: {
    color: '#FFFFFFF2',
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 16,
  },
  storiesandlghstravlTitle: {
    fontFamily: 'Commissioner-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  storiesandlghstravlDescription: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 16,
    color: '#FFFFFF99',
  },
});

export default Storiesandlghstravlonb;
