/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import DateView from 'react-datepicker';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function DatePicker(props) {
  const { label, name, ...otherProps } = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <Field name={name}>
        {
              ({ form, field }) => {
                const { setFieldValue } = form;
                const { value } = field;
                return (
                  <DateView
                    id={name}
                    {...field}
                    {...otherProps}
                    selected={value}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy/MM/dd"
                    utcOffSet="-3"
                    onChange={(val) => setFieldValue(name, val)}
                  />
                );
              }
        }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default DatePicker;
