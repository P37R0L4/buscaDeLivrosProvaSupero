/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Home from './Home';
import Search from './Search';

export type book = {
  id?: string;
  titulo?: string;
  isbn?: string;
  autor?: string;
  editora?: string;
  ano?: number;
};

interface TagYearProps {
  year?: number;
}

const TagYear = ({year}: TagYearProps): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: isDarkMode ? Colors.dark : Colors.white,
      }}>
      <Text>{year}</Text>
    </View>
  );
};

const App = (): JSX.Element => {
  const [libraryList, setLibraryList] = useState<Array<book>>([]);
  const [libraryListYear, setLibraryListYear] = useState<Array<book>>([]);
  const [libraryListfiltered, setLibraryListfilterred] = useState<Array<book>>(
    [],
  );
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchBarViewed, setSearchBarViewed] = useState<boolean>(false);
  const [searchTxt, setSearchTxt] = useState<string>('');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getLibraryList = async () => {
    try {
      const response = await fetch(
        'http://biblioteca.supero.com.br/api/Livros',
      );

      const json = await response.json();
      setLibraryList(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByYear = (year?: number) => {
    setLibraryListfilterred(libraryList.filter(item => item.ano === year));
  };

  useEffect(() => {
    getLibraryList();
  }, []);

  useEffect(() => {
    setLibraryListfilterred(libraryList);
    setLibraryListYear(
      libraryList.filter(
        (arr, index, self) => index === self.findIndex(t => t.ano === arr.ano),
      ),
    );
  }, [libraryList]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <View style={styles.header.titledMenu as any}>
          {searchBarViewed ? (
            <View style={styles.header.searchBackground as any}>
              <TextInput
                style={styles.header.searchBackground.searchInput}
                placeholder="Buscar..."
                value={searchTxt}
                onChangeText={setSearchTxt}
              />
            </View>
          ) : (
            <Text style={styles.header.title as any}>Biblioteca</Text>
          )}

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setSearchBarViewed(!searchBarViewed)}>
              <Icon
                style={{marginRight: 20}}
                name={searchBarViewed ? 'close' : 'search'}
                size={30}
                color={searchBarViewed ? '#999' : '#9B7EDE'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={styles.header.menuTime}
          contentContainerStyle={{paddingEnd: 40}}
          horizontal={true}>
          {libraryListYear.map(item => {
            return (
              <TouchableOpacity
                key={item.isbn}
                onPress={() => filterByYear(item.ano)}>
                <TagYear year={item.ano} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {!searchBarViewed ? (
        <Home libraryList={libraryListfiltered} isLoading={isLoading} />
      ) : (
        <Search searchedName={searchTxt} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 10,
    flexDirection: 'column',
    titledMenu: {
      margin: 10,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    menuTime: {
      margin: 10,
      width: Dimensions.get('window').width,
      height: 50,
    },
    searchBackground: {
      flex: 1,
      alignItens: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      searchInput: {
        height: 40,
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors.white,
        width: Dimensions.get('window').width - 100,
        marginRight: 20,
      },
    },
  },
});

export default App;
