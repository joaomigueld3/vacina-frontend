import React from 'react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Input from './input';

function FormikControl(props) {
  const { control, ...otherProps } = props;
  switch (control) {
    case 'input': { return <Input {...otherProps} />; }
    case 'date': { return <DatePicker {...otherProps} />; }
    case 'time': { return <TimePicker {...otherProps} />; }
    default: return null;
  }
}

export default FormikControl;
