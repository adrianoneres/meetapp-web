import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import DatePicker from './DatePicker';
import FileInput from './FileInput';
import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório.'),
  description: Yup.string().required('A descrição é obrigatória.'),
  location: Yup.string().required('A localização é obrigatória.'),
  date: Yup.date()
    .min(new Date(), 'A data deve ser uma data futura.')
    .required('A data é obrigatória.'),
  file_id: Yup.number().required('A imagem é obrigatória.'),
});

export default function MeetupForm({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup() {
      try {
        if (id) {
          const response = await api.get(`meetups/${id}`);

          const data = {
            ...response.data,
            date: parseISO(response.data.date),
            url: `${window.location.protocol}//${response.data.File.url}`,
          };

          setMeetup(data);
        }
      } catch (err) {
        toast.error('Erro ao buscar os dados do Meetup.');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      let response = {};
      if (meetup.id) {
        response = await api.put(`meetups/${meetup.id}`, data);
        toast.success('Meetup alterado com sucesso.');
      } else {
        response = await api.post('meetups', data);
        toast.success('Meetup cadastrado com sucesso.');
      }

      history.push(`/meetups/${response.data.id}`);
    } catch (err) {
      toast.error('Erro ao salvar Meetup.');
    }
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <FileInput name="file_id" defaultUrl={meetup.url} />
        <Input name="title" placeholder="Título do Meetup" />
        <Input name="description" placeholder="Descrição completa" />
        <DatePicker name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <MdAddCircleOutline color="#fff" size={20} />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}

MeetupForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
