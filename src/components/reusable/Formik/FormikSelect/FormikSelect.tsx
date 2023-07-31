/* eslint-disable prettier/prettier */
// Arquivo: FormikSelect.tsx
import { FieldProps } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './FormikSelect.style';

interface Option {
  label: string;
  value: string;
}

interface Props extends FieldProps {
  options: Option[];
}

const FormikSelect: React.FC<Props> = ({ field, form, options, ...props }) => {
  const showError = form.touched[field.name] && form.errors[field.name];
  return (
    <View style={styles.card}>
      <Text style={[styles.form.label]}>{props['placeholder']}</Text>
      <Picker
        selectedValue={field.value}
        style={[styles.form.input]}
        onValueChange={(value) => form.setFieldValue(field.name, value)}
        {...props}
      >
        <Picker.Item key="" label="" value="" />
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
      {showError && <Text style={styles.form.error}>{form.errors[field.name]}</Text>}
    </View>
  );
};

export default FormikSelect;
