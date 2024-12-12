import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import moment from 'moment';

// Загружаем данные из локального JSON-файла
import matchesData from './hltv_detailed_matches.json'; // Путь к вашему локальному файлу

export default function HLTVApp() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Используем данные, загруженные из файла
  useEffect(() => {
    // Здесь данные загружаются синхронно, так как они в локальном файле
    setMatches(matchesData);
    setLoading(false); // Завершаем загрузку
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Предстоящие матчи CS:GO</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.match}>
            {/* Логотип события */}
            <View style={styles.eventContainer}>
              <Image source={{ uri: item.event.logo }} style={styles.eventLogo} resizeMode="contain" />
              <Text style={styles.eventName}>{item.event.name}</Text>
            </View>

            {/* Команды и их логотипы */}
            <View style={styles.teamsContainer}>
              <Image
                source={{ uri: item.teams[0]?.logo }}
                style={styles.teamLogo}
                resizeMode="contain"
              />
              <Text style={styles.matchText}>
                {item.teams[0]?.name} vs {item.teams[1]?.name}
              </Text>
              <Image
                source={{ uri: item.teams[1]?.logo }}
                style={styles.teamLogo}
                resizeMode="contain"
              />
            </View>

            {/* Время матча и формат */}
            <Text style={styles.dateText}>
              {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')} - {item.maps}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C34',
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  eventLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
  },
  teamLogo: {
    width: 30,
    height: 30,
    margin: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#bbb',
  },
  flatListContent: {
    paddingBottom: 20, // Отступ снизу
  },
});
