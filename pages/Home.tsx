/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

interface HomeProps {
  isLoading: boolean;
  libraryList: Array<book>;
}

const Home = ({isLoading, libraryList}: HomeProps): JSX.Element => {
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

export default Home;
