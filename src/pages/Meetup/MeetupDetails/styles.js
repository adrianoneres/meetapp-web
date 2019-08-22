import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 32px auto 0;

  header {
    display: flex;
    justify-content: space-between;
    color: #fff;

    div {
      display: flex;

      a,
      button {
        padding: 0 20px;
        height: 42px;
        background: #d44059;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;
        display: flex;
        align-items: center;

        svg {
          margin-right: 8px;
        }

        &:hover {
          background: ${darken(0.05, '#d44059')};
        }
      }

      a.edit {
        background: #4dbaf9;

        &:hover {
          background: ${darken(0.05, '#4dbaf9')};
        }
      }

      * + * {
        margin-left: 10px;
      }
    }
  }

  section.image {
    width: 100%;
    margin-top: 32px;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 400px;
      border-radius: 4px;
    }
  }

  section.description {
    margin-top: 32px;
    font-size: 16px;
    color: #fff;
  }

  footer {
    margin-top: 32px;
    color: #fff;
    opacity: 0.6;
    display: flex;

    div {
      margin-right: 32px;
      display: flex;
      align-items: center;

      svg {
        margin-right: 8px;
      }
    }
  }
`;
