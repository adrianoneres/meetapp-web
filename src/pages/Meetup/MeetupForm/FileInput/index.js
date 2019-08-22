import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function FileInput({ name, defaultUrl }) {
  const { fieldName, defaultValue, registerField } = useField(name);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultUrl && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    setPreview(defaultUrl);
  }, [defaultUrl]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, fieldName]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(`${window.location.protocol}//${url}`);
  }

  return (
    <Container>
      <label htmlFor="file">
        <img src={preview} alt="" />

        <input
          type="file"
          id="file"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  defaultUrl: PropTypes.string.isRequired,
};
