import styled, { css } from 'styled-components';

type ButtonProps = {
  variant?: 'primary' | 'minimal';
};

const variantStyles = (variant = 'primary') =>
  ({
    primary: css`
      border: 0.1rem solid #000;
      border-radius: 1.5rem;
      padding: 0.5rem 0.8rem;
      margin: 0.2rem;
      background-color: #fff;

      :hover:enabled {
        background-color: #000;
        color: #fff;
      }

      :active:enabled {
        border: 0.1rem solid #ccc;
      }
    `,
    minimal: css`
      border: none;
      background-color: transparent;

      :hover:enabled {
        color: #555;
      }
    `,
  }[variant]);

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  font-size: 0.95rem;

  :disabled {
    color: initial;
    opacity: 0.4;
    cursor: auto;
  }

  ${({ variant }) => variantStyles(variant)}
`;

Button.defaultProps = {
  variant: 'primary',
};