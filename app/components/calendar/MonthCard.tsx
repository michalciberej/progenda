import { Month } from '@/typings';

const MonthCard = ({ month }: { month: Month }) => {
  return (
    <li className=''>
      <h3>{month.name}</h3>
    </li>
  );
};

export default MonthCard;
