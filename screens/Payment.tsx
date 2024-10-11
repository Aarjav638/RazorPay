import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {makePayment} from '../utils/services';
import {RootStackParamList} from '../components/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PaymentModal from '../components/PaymentModal';
import TextInputField from '../components/TextInputField';

type PaymentProps = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const Payment: React.FC<PaymentProps> = ({navigation, route}) => {
  const [fullname, setFullname] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [paymentProcess, setPaymentProcessing] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const totalprice = route.params.amount;
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const fullnameRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const pincodeRef = useRef<TextInput>(null);
  const handlePayment = async () => {
    setPaymentProcessing(true);
    try {
      const res = await makePayment({
        fullname,
        address: address1 + ' ' + address2,
        city,
        pincode,
        totalprice,
        email,
        contact: phone,
      });
      if (res) {
        setOrderId(res.orderId);
        setPaymentDone(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
            <TextInputField
              label="Full Name"
              autoComplete="name"
              ref={fullnameRef}
              value={fullname}
              onChangeText={setFullname}
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <TextInputField
              label="Email"
              ref={emailRef}
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
            <TextInputField
              label="Phone"
              ref={phoneRef}
              autoComplete="tel"
              value={phone}
              onChangeText={setPhone}
              onSubmitEditing={() => addressRef.current?.focus()}
            />
            <TextInputField
              label="Address Line 1"
              ref={addressRef}
              autoComplete="address-line1"
              value={address1}
              onChangeText={setAddress1}
              onSubmitEditing={() => cityRef.current?.focus()}
            />
            <TextInputField
              label="Address Line 2"
              autoComplete="address-line2"
              value={address2}
              onChangeText={setAddress2}
            />
            <TextInputField
              label="City"
              ref={cityRef}
              value={city}
              onChangeText={setCity}
              onSubmitEditing={() => pincodeRef.current?.focus()}
            />
            <TextInputField
              label="Pincode"
              ref={pincodeRef}
              autoComplete="postal-code"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              onSubmitEditing={handlePayment}
              returnKeyType="done"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={handlePayment} style={styles.button}>
        {paymentProcess ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>CHECKOUT</Text>
        )}
      </TouchableOpacity>
      <PaymentModal
        visible={paymentDone}
        orderId={orderId}
        onClose={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
  },
  form: {
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#B03F82',
    borderRadius: 10,
    rowGap: 10,
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
  buttonText: {color: '#fff'},
});

export default Payment;
