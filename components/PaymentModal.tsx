import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';
type PaymentModalProps = {
  visible: boolean;
  orderId: string;
  onClose: () => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  orderId,
  onClose,
}) => (
  <Modal transparent={true} visible={visible}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text>Order Placed</Text>
            <Text style={styles.orderIdText}>
              Your Order Id is: <Text style={styles.boldText}>{orderId}</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default PaymentModal;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    height: '30%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderIdText: {
    color: '#000',
    fontSize: 14,
  },
  boldText: {
    fontSize: 16,
  },
});
