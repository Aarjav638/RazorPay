import {Alert} from 'react-native';
import {RAZORPAY_API} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
type userDetails = {
  fullname: string;
  address: string;
  city: string;
  pincode: string;
  email: string;
  contact: string;
  totalprice: number;
};

const orderIds = new Set();

async function generateUniqueOrderId(length = 10) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let orderId;

  do {
    orderId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters[randomIndex];
    }
  } while (orderIds.has(orderId));

  orderIds.add(orderId);
  return orderId;
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
  let orderid = await generateUniqueOrderId();
  console.log(RAZORPAY_API);
  var options = {
    description: 'Sample Payment',
    image: require('../assets/razorpay-icon.svg'),
    order_id: orderid,
    currency: 'INR',
    key: RAZORPAY_API,
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
