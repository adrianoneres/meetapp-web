import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 32px auto 0;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    button {
      padding: 0 20px;
      height: 42px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }
    }
  }

  ul {
    margin-top: 32px;

    li {
      padding: 18px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);

      display: flex;
      justify-content: space-between;

      strong {
        color: #fff;
        font-size: 16px;
      }

      span {
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
      }
    }

    li + li {
      margin-top: 8px;
    }
  }
`;
