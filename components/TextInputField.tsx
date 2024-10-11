import React, {Ref} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

type TextInputFieldProps = {
  label: string;
  value: string;
  autoComplete?:
    | 'name'
    | 'address-line1'
    | 'address-line2'
    | 'postal-code'
    | 'email'
    | 'tel';

  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  ref?: Ref<TextInput>;
  returnKeyType?: 'next' | 'done';
};

const TextInputField = React.forwardRef<TextInput, TextInputFieldProps>(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      autoComplete,
      keyboardType = 'default',
      returnKeyType = 'next',
    }: TextInputFieldProps,
    ref,
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        autoComplete={autoComplete}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        style={styles.input}
      />
    </View>
  ),
);

export default TextInputField;
const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#EEEEEE',
    color: '#000',
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
});
