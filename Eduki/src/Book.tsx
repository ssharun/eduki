import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {styles} from './styles';

const Book = ({route}) => {
  const {book} = route.params;
  const [orientation, setOrientation] = useState('portrait');
  const landscape = orientation === 'landscape';
  const getOrientation = () => {
    const {width, height} = Dimensions.get('window');
    if (width > height) {
      setOrientation('landscape');
    } else {
      setOrientation('portrait');
    }
  };

  useEffect(() => {
    getOrientation();
    const change = Dimensions.addEventListener('change', getOrientation);
    return () => change.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={[
            {padding: 20},
            {
              flexDirection: landscape ? 'row' : 'column',
              justifyContent: 'space-between',
            },
          ]}>
          <Image
            style={[styles.oneBookImg, {width: landscape ? '50%' : '100%'}]}
            source={{uri: book.firstPreviewImage.watermarked}}
          />
          <View style={{width: landscape ? '50%' : '100%', padding: 20}}>
            <Text numberOfLines={3} style={styles.bookTitle}>
              {book.title}
            </Text>
            <Text style={styles.bookDescription}>
              {book.author.details.publicName}
            </Text>
            <Text style={styles.bookPrice}>{book.price}€</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Book;
