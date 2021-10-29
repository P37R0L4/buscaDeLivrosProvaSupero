/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';

import {CardList} from '../components/CardList';
import {book} from './App';

interface SearchProps {
  searchedName: string;
}

var typingTimer: any = null;
var doneTypingInterval = 1000;

const Search = ({searchedName}: SearchProps): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [libraryList, setLibraryList] = useState<Array<book>>([]);

  const getLibrarySearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://biblioteca.supero.com.br/api/Livros?Busca=${searchedName}`,
      );

      const json = await response.json();
      setLibraryList(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //user is "finished typing," do something
  function doneTyping() {
    getLibrarySearch();
  }

  useEffect(() => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  }, [searchedName]);

  return (
    <View>
      <SafeAreaView style={styles.listContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text
              style={{marginHorizontal: 15, marginBottom: 10, fontSize: 16}}>
              {libraryList.length} itens Encontrados
            </Text>

            <FlatList
              style={{marginBottom: 170}}
              data={[...libraryList]}
              renderItem={({item}) => <CardList {...item} />}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 25,
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
  },
  listContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 20,
  },
});

export default Search;
