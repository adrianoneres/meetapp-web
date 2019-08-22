import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  width: 100%;

  label {
    cursor: pointer;
    height: 100%;

    &:hover {
      opacity: 0.7;
    }

    img {
      max-height: 400px;
      border-radius: 4px;
      border: 0;
      margin: 0 auto;
    }

    div {
      width: 100%;
      height: 300px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0);
      opacity: 0.5;
      border-radius: 4px;

      span {
        color: #999;
        margin: 14px auto 0;
        font-size: 20px;
      }
    }

    input {
      display: none;
    }
  }
`;
