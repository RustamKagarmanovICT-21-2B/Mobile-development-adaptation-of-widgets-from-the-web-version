import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import moment from 'moment';

export default function HLTVApp() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Функция для получения данных о матчах с API
  const fetchMatches = async () => {
    try {
      const response = await fetch('https://hltv-api.vercel.app/api/matches.json');
      const data = await response.json();
      setMatches(data);
      setLoading(false);  // Остановить индикатор загрузки
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setLoading(false);
    }
  };

  // Загрузка данных при первом рендеринге
  useEffect(() => {
    fetchMatches();
  }, []);

  // Если данные еще загружаются, показываем индикатор загрузки
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Предстоящие матчи CS:GO</Text>
      <FlatList
  data={matches}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.match}>
      <Text style={styles.matchText}>{item.teams[0].name} vs {item.teams[1].name}</Text>
      <Text style={styles.dateText}>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
    </View>
  )}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#282C34',
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  match: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  matchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateText: {
    fontSize: 14,
    color: '#bbb',
  },
});
