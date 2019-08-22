import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';
import DatePicker from './DatePicker';
import FileInput from './FileInput';
import { Container } from './styles';

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
      <Form initialData={meetup} onSubmit={handleSubmit}>
        <FileInput name="file_id" defaultUrl={meetup.url} />
        <Input name="title" placeholder="Título do Meetup" />
        <Input name="description" placeholder="Descrição completa" />
        <DatePicker name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">Salvar meetup</button>
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
