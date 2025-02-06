import { CardList } from '../cardList/CardList.tsx';
import { DetailedCard } from '../detailedCard/DetailedCard.tsx';
import s from './style.module.css';

export const Results = () => {
  return (
    <div className={s.container}>
      <CardList />
      <DetailedCard />
    </div>
  );
};
