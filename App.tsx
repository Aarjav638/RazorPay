import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './components/navigation';

type AppProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const App = ({navigation}: AppProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Razorpay</Text>
      <View style={styles.subBody}>
        <Text style={styles.amount}>Amount: Rs. 2500</Text>

        <Text>Click below to make payment</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment', {amount: 2500})}
          style={styles.button}>
          <Text style={styles.buttonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonText: {color: '#fff'},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B03F82',
    marginBottom: '20%',
    alignSelf: 'center',
  },
  subBody: {
    marginBottom: 20,
    padding: 10,
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#B03F82',
    padding: 10,
    alignItems: 'center',
    width: '80%',
    borderRadius: 22,
    alignSelf: 'center',
    margin: 16,
    elevation: 4,
  },
  amount: {
    fontSize: 16,
    color: '#000',
  },
});

export default App;
