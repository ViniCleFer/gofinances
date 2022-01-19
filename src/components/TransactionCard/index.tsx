import React from 'react';
import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
} from './styles';

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: 'positive' | 'negative';
}

export interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({ data }: Props) => {
  const [category] = categories.filter((item) => item.key === data.category);
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <CategoryName>{data.date}</CategoryName>
      </Footer>
    </Container>
  );
};
