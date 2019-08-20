import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/services/api';

import { Container } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' HH'h'",
            {
              locale: ptBR,
            }
          ),
        };
      });
      setMeetups(data);
    }

    loadMeetups();
  }, [meetups]);

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <button type="button">Novo meetup</button>
      </header>
      <ul>
        {meetups.map(meetup => (
          <li>
            <Link to="/">
              <strong>{meetup.title}</strong>
            </Link>
            <span>{meetup.dateFormatted}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
