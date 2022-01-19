import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { HighlitedCard, Load, TransactionCard } from '../../components';

import { TransactionCardProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  LogoutButton,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  PowerIcon,
  HighlightedCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from './styles';

export interface TransactionCardListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expansives: HighlightProps;
  total: HighlightProps;
}

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionCardListProps[]>(
    []
  );
  const [highlightedData, setHighlightedData] = useState<HighlightData>(
    {} as HighlightData
  );
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuth();

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function getLastTransactionDate(
    collection: TransactionCardListProps[],
    type: 'positive' | 'negative'
  ) {
    const collectionFiltered = collection.filter((item) => item.type === type);

    if (collectionFiltered.length === 0) {
      return 'Sem data';
    }

    const lastTransactions = new Date(
      Math.max.apply(
        Math,
        collectionFiltered.map((item) => new Date(item.date).getTime())
      )
    );

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
      'pt-BR',
      {
        month: 'long',
      }
    )}`;
  }

  async function loadData() {
    const saveData = await AsyncStorage.getItem(dataKey);
    const transactionsData = saveData ? JSON.parse(saveData) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: TransactionCardListProps[] =
      transactionsData.map((item: TransactionCardListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensivesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactionsData,
      'positive'
    );

    const lastTransactionExpensives = getLastTransactionDate(
      transactionsData,
      'negative'
    );
    const totalInterval =
      expensivesTotal === 0 && entriesTotal === 0
        ? 'Não há transações'
        : `01 a ${
            lastTransactionExpensives === 'Sem data'
              ? lastTransactionEntries
              : lastTransactionExpensives
          }`;

    const total = entriesTotal - expensivesTotal;

    setHighlightedData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          entriesTotal === 0
            ? 'Não há transações'
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expansives: {
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          expensivesTotal === 0
            ? 'Não há transações'
            : `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <Load />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />

                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <PowerIcon name='power' />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightedCards>
            <HighlitedCard
              type='up'
              title='Entrada'
              amount={highlightedData.entries.amount}
              lastTransaction={highlightedData.entries.lastTransaction}
            />
            <HighlitedCard
              type='down'
              title='Saídas'
              amount={highlightedData.expansives.amount}
              lastTransaction={highlightedData.expansives.lastTransaction}
            />
            <HighlitedCard
              type='total'
              title='Total'
              amount={highlightedData.total.amount}
              lastTransaction={highlightedData.total.lastTransaction}
            />
          </HighlightedCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item: TransactionCardListProps) => String(item.id)}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
