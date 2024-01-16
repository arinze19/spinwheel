import styled from 'styled-components';

import { FiTrash } from 'react-icons/fi';

// Types
export interface ItemsProps {
  items: Omit<ItemProps, 'onRemove'>[];
  onRemove: (id: number) => void;
}

export interface ItemProps {
  id: number;
  name: string;
  color: string;
  onRemove: (id: number) => void;
  imageUrl?: string;
}

export const Item = ({ id, name, color, imageUrl, onRemove }: ItemProps) => {
  return (
    <Sty.Item>
      <div>
        {imageUrl && <Sty.Image src={imageUrl} />}
        <div className='details'>
          <Sty.Color color={color} />
          {name}
        </div>
      </div>

      <FiTrash size={15} color='red' onClick={() => onRemove(id)} />
    </Sty.Item>
  );
};

export const Items = ({ items, onRemove }: ItemsProps) => {
  return (
    <Sty.Items>
      {items.map((item) => (
        <Item key={item.id} {...item} onRemove={onRemove} />
      ))}
    </Sty.Items>
  );
};

// Styled
const Sty = {
  Items: styled.div`
    display: flex;
    flex-direction: column;
    max-height: 300px;
    flex-wrap: wrap;
    gap: 16px;
    border-radius: 4px;
  `,
  Item: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    .details {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `,
  Color: styled.div<{ color: string }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  `,
  Image: styled.img`
    width: 60px;
    height: 50px;
    border-radius: 4px;
  `,
};
