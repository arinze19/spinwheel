import { useState, useMemo } from 'react';

import styled from 'styled-components';

import Input from './components/Input';
import SpinWheel from './components/SpinWheel';
import { Items } from './components/Item';
import useLocalStorage from './components/hooks/useLocalStorage';

import { generateRandomHex } from './helpers';

import { type StateItem } from './types';

function App() {
  const storage = useLocalStorage();

  const [items, setItems] = useState<StateItem[]>(() =>
    storage.get('items', [])
  );

  const Actions = useMemo(() => {
    return {
      onChange: (data: Partial<StateItem>) => {
        // step 1: if there is no color, generate a random one
        if (!data.color) {
          data.color = generateRandomHex(6);
        }

        // step 2: generate random id for new item
        if (!data.id) {
          data.id = Math.floor(1000 * Math.random());
        }

        // step 3: if there is no image, add empty string;
        if (!data.imageUrl) {
          data.imageUrl = '';
        }

        // step 4: add the item to the list
        setItems((prev) => {
          // add item to list
          const result = [...prev, data as StateItem];

          // save to local storage
          storage.set('items', result);

          return result;
        });
      },
      onRemove: (id: number) => {
        setItems((prev) => {
          // filter items
          const result = prev.filter((item) => item.id !== id);

          // remove from local storage
          storage.set('items', result);

          return result;
        });
      },
    };
  }, [setItems]);

  return (
    <Sty.Container>
      <Sty.Analytics>
        <SpinWheel items={items} />
        <Items items={items} onRemove={Actions.onRemove} />
      </Sty.Analytics>
      <Input onSubmit={Actions.onChange} />
    </Sty.Container>
  );
}

const Sty = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 40px;

    min-height: 100vh;
  `,
  Analytics: styled.div`
    display: flex;
    gap: 52px;

    // responsive for mobile
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
};

export default App;
