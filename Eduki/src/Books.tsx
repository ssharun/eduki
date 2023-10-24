import React, {useState, useEffect, useRef} from 'react';

import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {axiosInstance} from './api';
import {styles} from './styles';
import {Book} from './types';
import {token} from './api';

const Books = ({navigation}): JSX.Element => {
  const flatListRef = useRef();

  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allowRequest, setAllowRequest] = useState(true);

  const loadBooks = async (newPage: number, newBooks: any) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const params = {
        limit: 20,
        p: newPage,
        q: searchText,
        world: 'de',
      };
      const response = await axiosInstance.get('elastic', {params});
      const data = response.data.data.items.materials;
      if (data.length > 0) {
        setBooks([...newBooks, ...data]);
        setPage(newPage + 1);
        setAllowRequest(true);
      } else {
        setAllowRequest(false);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token?.length) {
      const delay = 500;
      const timer = setTimeout(() => {
        if (flatListRef) {
          flatListRef?.current?.scrollToOffset({offset: 0, animated: false});
        }
        loadBooks(1, []);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [searchText, token]);

  return (
    <SafeAreaView style={styles.container}>
      {token ? (
        <>
          <View style={styles.searchWrap}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText && (
              <TouchableOpacity
                style={styles.searchClear}
                onPress={() => setSearchText('')}>
                <Text>X</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            ref={flatListRef}
            numColumns={2}
            columnWrapperStyle={{gap: 20}}
            horizontal={false}
            contentContainerStyle={styles.booksWrap}
            data={books}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}: {item: Book}) => {
              return (
                <TouchableOpacity
                  style={styles.bookWrap}
                  onPress={() => navigation.navigate('Book', {book: item})}>
                  <Image
                    source={{uri: item.firstPreviewImage.watermarked}}
                    style={styles.bookImg}
                  />
                  <Text numberOfLines={3} style={styles.bookTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.bookDescription}>
                    {item.author.details.publicName}
                  </Text>
                  <Text style={styles.bookPrice}>{item.price}€</Text>
                </TouchableOpacity>
              );
            }}
            onEndReached={() => {
              if (token && allowRequest) {
                loadBooks(page, books);
              }
            }}
            onEndReachedThreshold={0.3}
            ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
          />
        </>
      ) : (
        <View style={styles.token}>
          <Text>Please set up valid token in api file</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Books;
