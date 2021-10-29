import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {book} from '../pages/App';
import {ModalBook} from './ModalBook';

export const CardList = (props: book) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View
          style={[
            style.container,
            {backgroundColor: isDarkMode ? Colors.dark : Colors.white},
          ]}>
          <Text style={style.container.dataContent.data as any}>
            {props.ano}
          </Text>
          <Text style={style.container.subtitle as any}>{props.editora}</Text>

          <Text style={style.container.title as any}>{props.titulo}</Text>
          <View style={style.container.dataContent as any}>
            <View>
              <Text>autor</Text>
              <Text style={style.container.dataContent.data as any}>
                {props.autor}
              </Text>
            </View>
          </View>
          <Text>ISBN: {props.isbn}</Text>

          <View style={style.container.detail as any} />
          <View style={style.container.detailBottomTwo as any} />
        </View>
      </TouchableOpacity>
      <ModalBook
        props={props}
        callback={setModalVisible}
        modalVisible={modalVisible}
      />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 25,
    flexDirection: 'column',
    borderRadius: 20,
    marginVertical: 5,
    title: {
      fontSize: 27,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    subtitle: {
      marginBottom: 20,
    },
    dataContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      data: {
        opacity: 0.4,
        fontSize: 18,
      },
    },
    detail: {
      backgroundColor: '#9B7EDE',
      position: 'absolute',
      width: Dimensions.get('window').width / 3,
      bottom: 0,
      height: 100,
      zIndex: -3,
      right: 0,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 100,
    },
    detailBottomTwo: {
      backgroundColor: '#F9C80E',
      position: 'absolute',
      width: 100,
      bottom: 70,
      height: 100,
      zIndex: -4,
      right: -40,
      borderRadius: 100,
    },
  },
});
