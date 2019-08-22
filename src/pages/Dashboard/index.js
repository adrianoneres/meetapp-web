import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdAddCircleOutline } from 'react-icons/md';

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
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/meetups/new">
          <MdAddCircleOutline color="#fff" size={20} />
          <span>Novo meetup</span>
        </Link>
      </header>
      <ul>
        {meetups.map(meetup => (
          <li key={meetup.id}>
            <Link to={`/meetups/${meetup.id}`}>
              <strong>{meetup.title}</strong>
            </Link>
            <span>{meetup.dateFormatted}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
