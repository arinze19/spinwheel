import { useMemo } from 'react';

import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import styled from 'styled-components';

import { type StateItem } from '../../types';

ChartJS.register(ArcElement);

interface SpinWheelProps {
  items: StateItem[];
}

const SpinWheel = ({ items }: SpinWheelProps) => {
  const Data = useMemo(() => {
    return {
      labels: items.map((item) => item.name),
      datasets: [
        {
          data: items.map(() => 1),
          backgroundColor: items.map((item) => item.color),
          borderColor: items.map((item) => item.color),
          borderWidth: 1,
        },
      ],
    };
  }, [items]);

  return (
    <Sty.Container>
      <Doughnut data={Data} />
    </Sty.Container>
  );
};

const Sty = {
  Container: styled.div`
    width: 300px;
    height: 300px;
  `,
};

export default SpinWheel;
