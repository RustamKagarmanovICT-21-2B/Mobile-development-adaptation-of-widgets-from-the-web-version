import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import moment from 'moment';

export default function HLTVApp() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Функция для получения данных из JSON файла
  const fetchMatches = async () => {
    try {
      const response = await fetch('hltv_detailed_matches.json');  // Замените на путь к вашему JSON
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
      <Text style={styles.title}>Предстоящие матчи CS2</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.match}>
            {/* Команды и их логотипы */}
            <View style={styles.teamContainer}>
              <Image source={{ uri: item.teams[0].logo }} style={styles.teamLogo} />
              <Text style={styles.matchText}>{item.teams[0].name}</Text>
              <Text style={styles.vsText}>vs</Text>
              <Text style={styles.matchText}>{item.teams[1].name}</Text>
              <Image source={{ uri: item.teams[1].logo }} style={styles.teamLogo} />
            </View>

            {/* Время матча */}
            <Text style={styles.dateText}>{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</Text>

            {/* Событие и его логотип */}
            <View style={styles.eventContainer}>
              <Image source={{ uri: item.event.logo }} style={styles.eventLogo} />
              <Text style={styles.eventText}>{item.event.name}</Text>
            </View>

            {/* Формат матчей */}
            <Text style={styles.mapsText}>Format: {item.maps}</Text>
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
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  matchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  vsText: {
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 10,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  eventLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  eventText: {
    fontSize: 14,
    color: '#fff',
  },
  mapsText: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 5,
  },
});
