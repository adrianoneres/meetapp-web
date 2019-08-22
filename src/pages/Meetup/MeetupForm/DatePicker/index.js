import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

export default function DatePicker({ name, placeholder }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        placeholderText={placeholder}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        locale="pt-BR"
        dateFormat="Pp"
        timeCaption="hora"
        showTimeSelect
      />
      {error && <span>{error}</span>}
    </>
  );
}
