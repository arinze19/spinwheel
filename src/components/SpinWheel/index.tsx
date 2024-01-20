import { useMemo, useState } from 'react';

import { motion } from 'framer-motion';

import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import styled from 'styled-components';

import { type StateItem } from '../../types';

ChartJS.register(ArcElement);

interface SpinWheelProps {
  items: StateItem[];
}

const SpinWheel = ({ items }: SpinWheelProps) => {
  const [{ duration, rotate }, setAnimate] = useState({
    rotate: 0,
    duration: 0,
  });

  const Memo = useMemo(() => {
    return {
      data: {
        labels: items.map((item) => item.name),
        datasets: [
          {
            data: items.map(() => 1),
            backgroundColor: items.map((item) => item.color),
            borderColor: items.map((item) => item.color),
            borderWidth: 1,
          },
        ],
      },
      hasItems: items.length > 0 && rotate === 0,
      shouldReset: items.length > 0 && rotate > 0,
    };
  }, [items, rotate]);

  const Actions = useMemo(() => {
    return {
      spin: () => {
        setAnimate({
          rotate: Math.floor(360 * (Math.random() * (20 - 10) + 10)),
          duration: Math.floor(Math.random() * (30 - 10) + 10),
        });
      },
      reset: () => {
        setAnimate({
          rotate: 0,
          duration: 0,
        });
      },
    };
  }, [setAnimate, rotate, duration]);

  return (
    <Sty.Container>
      <Sty.Wheel
        initial={{ rotate: 0 }}
        animate={{ rotate: rotate }}
        transition={{
          duration: duration,
          // ease: [0.4, -0.55, 0.27, 1.1],
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Pie data={Memo.data} />
      </Sty.Wheel>
      {Memo.hasItems && <Sty.Button onClick={Actions.spin}>Spin</Sty.Button>}
      {Memo.shouldReset && (
        <Sty.Button $alternative onClick={Actions.reset}>
          Reset
        </Sty.Button>
      )}
    </Sty.Container>
  );
};

const Sty = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    width: 300px;
    height: 300px;
  `,
  Wheel: styled(motion.div)``,
  Button: styled.button<{ $alternative?: boolean }>`
    background-color: #10162f;
    color: white;
    padding: 4px 14px;
    border: none;
    border-radius: 5px;

    // if alternative, make background red
    ${({ $alternative }) =>
      $alternative &&
      `
      background-color: #e34949;
    `}
  `,
};

export default SpinWheel;
