import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      height: 200px;
      font-size: 14px;
    }

    span {
      color: #d44059;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 10px 0 20px;
    }

    > button {
      margin: 5px 0 0;
      height: 50px;
      width: 200px;
      background: #d44059;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;

      svg {
        margin-right: 8px;
      }

      span {
        color: #fff;
        margin: 2px 0 0;
      }

      &:hover {
        background: ${darken(0.05, '#d44059')};
      }
    }
  }
`;
