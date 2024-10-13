import {Alert} from 'react-native';
import {RAZORPAY_KEY, RAZORPAY_SECRET} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
type userDetails = {
  fullname: string;
  address: string;
  city: string;
  pincode: string;
  email: string;
  contact: string;
  totalprice: number;
};

// const orderIds = new Set();

async function generateUniqueOrderId(totalPrice: number) {
  try {
    const response = await axios.post(
      'https://ewe-pretty-newt.ngrok-free.app/order',
      {
        key: RAZORPAY_KEY,
        secret: RAZORPAY_SECRET,
        amount: totalPrice * 100,
        currency: 'INR',
      },
    );
    const data = await response.data;
    return data.order_id;
  } catch (errr) {
    console.log(errr);
  }
}

export async function makePayment({
  fullname,
  address,
  city,
  pincode,
  email,
  contact,

  totalprice,
}: userDetails) {
  let orderid = await generateUniqueOrderId(totalprice);
  console.log(orderid);
  console.log(RAZORPAY_KEY);

  var options = {
    description: 'Sample Payment',
    image: require('../assets/razorpay-icon.svg'),
    order_id: orderid,
    currency: 'INR',
    key: RAZORPAY_KEY,
    amount: totalprice * 100,
    name: 'Razorpay',
    prefill: {
      email,
      name: fullname,
      contact,
    },
    theme: {color: '#B03F82'},
  };

  if (
    !fullname ||
    !address.split(' ')[0] ||
    !city ||
    !pincode ||
    !email ||
    !contact
  ) {
    throw new Error('Enter the details first!');
  } else {
    try {
      const res = await RazorpayCheckout.open(options);
      Alert.alert(`Success: ${res.razorpay_payment_id}`);
      return {paymentId: res.razorpay_payment_id, orderId: orderid};
    } catch (err) {
      const errorMessage =
        (err as {error: {description: string}})?.error.description ||
        'Payment failed';
      throw new Error(errorMessage);
    }
  }
}
