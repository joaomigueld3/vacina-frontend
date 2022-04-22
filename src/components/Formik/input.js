/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Input(props) {
  const { label, name, ...otherProps } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <Field id={name} name={name} {...otherProps} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Input;
