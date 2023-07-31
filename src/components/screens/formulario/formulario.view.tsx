/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { TextInput, Button, Card, Title, Text } from 'react-native-paper';
import { Formik, Field, FieldProps, useFormik } from 'formik';
import * as yup from 'yup';
import { styles } from './formulario.style';

interface FormField {
  id: string;
  type: string;
  label: string;
  validation: {
    type: string;
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
  };
}

// Simulando o resultado de um fetch para um endpoint
const formFields: FormField[] = [
  {
    id: 'firstName',
    type: 'text',
    label: 'Nome',
    validation: {
      type: 'string',
      required: true,
      min: 2,
      max: 30,
    },
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    validation: {
      type: 'email',
      required: true,
      email: true,
    },
  },
];

const generateValidationSchema = (fields: FormField[]) => {
  let validations: { [key: string]: any } = {};

  fields.forEach((field) => {
    const { id, validation } = field;

    let validator: yup.Schema<any>;

    if (validation.type === 'string') {
      validator = yup.string();
      if (validation.required) validator = validator.required();
      if (validation.email) validator = validator.email();
      if (validation.min) validator = validator.min(validation.min);
      if (validation.max) validator = validator.max(validation.max);
    } else if (validation.type === 'number') {
      validator = yup.number();
      if (validation.required) validator = validator.required();
      if (validation.min) validator = validator.min(validation.min);
      if (validation.max) validator = validator.max(validation.max);
    } else {
      validator = yup.mixed();
      if (validation.required) validator = validator.required();
    }

    validations[id] = validator;
  });

  return yup.object().shape(validations);
};

interface MyInputProps extends FieldProps {
  label: string;
  keyboardType: 'email-address' | 'default';
}

const MyInput: React.FC<MyInputProps> = ({ field, form, ...props }) => {
  const { name } = field;
  const { errors, touched } = form;

  return (
    <Card style={styles.card}>
      <TextInput
        {...props}
        value={field.value}
        onChangeText={form.handleChange(name)}
        error={touched[name] && Boolean(errors[name])}
        style={styles.input}
      />
    </Card>
  );
};

const FormularioView = () => {
  const initialValues = formFields.reduce(
    (values, field) => ({
      ...values,
      [field.id]: '',
    }),
    {}
  );

  const validationSchema = generateValidationSchema(formFields);

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    // Submit form values here
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const handleSubmitPress = () => {
          formikProps.handleSubmit();
        };

        return (
          <View style={styles.container}>
            <Title style={styles.title}>Formulário de convênios</Title>
            {formFields.map((field) => (
              <View key={field.id}>
                <Field
                  component={MyInput}
                  name={field.id}
                  label={field.label}
                  keyboardType={
                    field.type === 'email' ? 'email-address' : 'default'
                  }
                />
              </View>
            ))}
            <Button
              mode="contained"
              onPress={handleSubmitPress}
              style={styles.button}
            >
              <Text style={styles.button.buttonText}>Enviar dados</Text>
            </Button>
          </View>
        );
      }}
    </Formik>
  );
};

export default FormularioView;
