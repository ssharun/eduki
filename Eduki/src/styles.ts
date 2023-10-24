import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchWrap: {
    marginTop: 10,
    marginHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchClear: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  booksWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 100,
    paddingBottom: 20,
  },
  bookWrap: {
    width: 160,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 80,
  },
  bookImg: {
    width: 140,
    height: 160,
    marginTop: -80,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  bookTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 12,
  },
  bookDescription: {
    marginBottom: 30,
    color: '#333',
    fontSize: 12,
  },
  bookPrice: {
    fontWeight: 'bold',
  },
  oneBookImg: {
    height: 500,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  token: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
