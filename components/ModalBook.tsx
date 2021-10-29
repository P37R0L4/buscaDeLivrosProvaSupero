import React, {Dispatch, SetStateAction} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import {book} from '../pages/App';

interface ModalBook {
  modalVisible: boolean;
  callback: Dispatch<SetStateAction<boolean>>;
  props: book;
}

export const ModalBook = ({modalVisible, callback, props}: ModalBook) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button]}
              onPress={() => callback(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>

            <Text style={styles.modalText}>{props.titulo}</Text>

            <FlatList
              renderItem={({item}) => (
                <View>
                  <Text style={{color: 'rgba(255,255,255, 0.8)'}}>ano</Text>
                  <Text style={styles.contentText}>{item.ano}</Text>

                  <Text style={{color: 'rgba(255,255,255, 0.8)'}}>editora</Text>
                  <Text style={styles.contentText}>{item.editora}</Text>

                  <Text style={{color: 'rgba(255,255,255, 0.8)'}}>autor</Text>
                  <Text style={styles.contentText}>{item.autor}</Text>

                  <Text style={styles.contentText}>({item.isbn})</Text>
                </View>
              )}
              data={[props]}
            />
            <View style={styles.detail as any} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').height / 2,
    margin: 20,
    backgroundColor: '#9B7EDE',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginBottom: 15,
  },
  textStyle: {
    color: 'rgba(255,255,255, 0.8)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentText: {
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  detail: {
    backgroundColor: '#F9C80E',
    position: 'absolute',
    width: Dimensions.get('window').width - 100,
    bottom: 0,
    height: Dimensions.get('window').width - 100,
    zIndex: -3,
    right: 0,
    borderTopLeftRadius: 500,
    borderBottomRightRadius: 20,
  },
});
