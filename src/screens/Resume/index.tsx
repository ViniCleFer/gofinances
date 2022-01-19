import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  Container,
  Header,
  Title,
  Content,
  MonthContainer,
  IconButton,
  Icon,
  MonthText,
  ChartContainer,
  CategoriesList,
  CategoryContainer,
  CategoryName,
  Total,
  LoadContainer,
} from './styles';

import { categories } from '../../utils/categories';

import { Load } from '../../components';

import { useAuth } from '../../hooks/auth';

interface TransactionData {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: 'positive' | 'negative';
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

const dataKey = '@gofinances:transactions';

export const Resume = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function handleDateChange(action: 'prev' | 'next') {
    setIsLoading(true);

    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives: TransactionData[] = responseFormatted.filter(
      (resp: TransactionData) =>
        resp.type === 'negative' &&
        new Date(resp.date).getMonth() === selectedDate.getMonth() &&
        new Date(resp.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acumulator: number, expensive: TransactionData) => {
        return (acumulator += Number(expensive.amount));
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let expensiveTotal = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (category.key === expensive.category) {
          expensiveTotal += Number(expensive.amount);
        }
      });

      if (expensiveTotal > 0) {
        const totalFormatted = expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((expensiveTotal / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormatted,
          total: expensiveTotal,
          color: category.color,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <Load />
        </LoadContainer>
      ) : (
        <Content>
          <MonthContainer>
            <IconButton onPress={() => handleDateChange('prev')}>
              <Icon name='chevron-left' />
            </IconButton>
            <MonthText>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </MonthText>
            <IconButton onPress={() => handleDateChange('next')}>
              <Icon name='chevron-right' />
            </IconButton>
          </MonthContainer>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x='percent'
              y='total'
              colorScale={totalByCategories.map((tot) => tot.color)}
              style={{
                labels: {
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={100}
            />
          </ChartContainer>

          <CategoriesList>
            {totalByCategories.map((item: CategoryData) => (
              <CategoryContainer key={item.key} color={item.color}>
                <CategoryName>{item.name}</CategoryName>
                <Total>{item.totalFormatted}</Total>
              </CategoryContainer>
            ))}
          </CategoriesList>
        </Content>
      )}
    </Container>
  );
};
