import { useState, useMemo } from 'react';

import styled from 'styled-components';

import Upload from '../Upload';

import { type StateItem } from '../../types';

interface InputProps {
  onSubmit: (data: Partial<StateItem>) => void;
}

const Input = ({ onSubmit }: InputProps) => {
  const [state, onChange] = useState({
    expanded: false,
    name: '',
    color: '',
    imageUrl: '',
  });

  const Actions = useMemo(() => {
    return {
      onChange: (value: Partial<typeof state>) => {
        onChange((prev) => ({ ...prev, ...value }));
      },
      onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
          name: state.name,
          color: state.color,
          imageUrl: state.imageUrl,
        });
        onChange({ expanded: false, name: '', color: '', imageUrl: '' });
      },
    };
  }, [state, onChange]);

  return (
    <Sty.Container $expanded={state.expanded} onSubmit={Actions.onSubmit}>
      <Sty.Input
        type='text'
        placeholder='Pizza...'
        value={state.name}
        onFocus={() => Actions.onChange({ expanded: true })}
        onBlur={() => Actions.onChange({ expanded: false })}
        onChange={(e) => Actions.onChange({ name: e.currentTarget.value })}
      />
      <footer>
        <div className='left'>
          <Upload
            imageUrl={state.imageUrl}
            onUpload={(value: string) => Actions.onChange({ imageUrl: value })}
          />
          <Sty.Color
            type='color'
            value={state.color}
            onChange={(e) => Actions.onChange({ color: e.currentTarget.value })}
          />
        </div>
        <div className='right'>
          <Sty.Button type='submit'>Submit</Sty.Button>
        </div>
      </footer>
    </Sty.Container>
  );
};

const Sty = {
  Container: styled.form<{ $expanded: boolean }>`
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    overflow: hidden;
    padding: 8px;

    // set animation so it's smooth
    // use a bezier curve so it bounces back a bit
    transition: transform 0.3s cubic-bezier(0.02, -0.42, 0.45, 1.58);

    // if expanded scale to 1.1
    transform: scale(${({ $expanded }) => ($expanded ? 1.1 : 1)});

    // footer
    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
      }
    }
  `,
  Input: styled.input`
    width: 100%;
    border: none;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
  `,
  Color: styled.input`
    width: 25px;
    height: 25px;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    outline: none;
    box-sizing: border-box;
    cursor: pointer;
  `,
  Button: styled.button`
    border-radius: 5px;
    background-color: #10162f;
    color: white;
    border: none;
    padding: 4px 14px;
  `,
};

export default Input;
