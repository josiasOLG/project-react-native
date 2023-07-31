/* eslint-disable prettier/prettier */
// Arquivo: FormikField.tsx
import { FieldProps } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './FormikField.style';

const FormikField: React.FC<FieldProps> = ({ field, form, ...props }) => {
  const showError = form.touched[field.name] && form.errors[field.name];
  return (
    <View style={styles.card}>
      <Text style={[styles.form.label]}>{props['placeholder']}</Text>
      <TextInput
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        value={field.value}
        error={showError}
        style={[styles.form.input]}
        disabled={props['disabled']}
        {...props}
      />
      {showError && <Text style={styles.form.error}>{form.errors[field.name]}</Text>}
    </View>
  );
};

export default FormikField;
