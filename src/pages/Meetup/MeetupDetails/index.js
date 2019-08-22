import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdEdit, MdDeleteForever, MdToday, MdPlace } from 'react-icons/md';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import { Container } from './styles';

export default function MeetupDetails({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`meetups/${id}`);

        const data = {
          ...response.data,
          url: `${window.location.protocol}//${response.data.File.url}`,
          dateFormatted: format(
            parseISO(response.data.date),
            "dd 'de' MMMM', às' HH:mm'h'",
            {
              locale: ptBR,
            }
          ),
        };
        setMeetup(data);
      } catch (err) {
        toast.error('Erro ao buscar os dados do Meetup.');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleCancel() {
    try {
      await api.delete(`meetups/${id}`);

      history.push('/dashboard');
      toast.success('Meetup excluído com sucesso.');
    } catch (err) {
      toast.error('Erro ao excluir Meetup.');
    }
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <div>
          <Link to={`/meetups/${meetup.id}/edit`} className="edit">
            <MdEdit color="#fff" size={20} />
            <span>Editar</span>
          </Link>
          <button type="button" onClick={handleCancel}>
            <MdDeleteForever color="#fff" size={20} />
            <span>Cancelar</span>
          </button>
        </div>
      </header>
      <section className="image">
        <img src={meetup.url} alt="Imagem" />
      </section>
      <section className="description">{meetup.description}</section>
      <footer>
        <div>
          <MdToday size={20} />
          <span>{meetup.dateFormatted}</span>
        </div>
        <div>
          <MdPlace size={20} />
          <span>{meetup.location}</span>
        </div>
      </footer>
    </Container>
  );
}

MeetupDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
