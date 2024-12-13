import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import moment from 'moment';

// Функция для проверки валидности URL
const isValidUrl = (url) => typeof url === 'string' && url.startsWith('http');

const MatchDetails = ({ route }) => {
  const { match } = route.params;

  // Логирование данных match для диагностики
  console.log('Match Details:', match);

  // Если данные match отсутствуют, показываем ошибку
  if (!match) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ошибка: Нет данных для отображения</Text>
      </SafeAreaView>
    );
  }

  const { event, teams, time, maps } = match;

  if (!event || !teams || !time || !maps) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ошибка: Недостаточно данных для отображения</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.matchText}>
          {teams[0]?.name} vs {teams[1]?.name}
        </Text>

        {/* Проверка валидности URL и подставление изображения по умолчанию */}
        <Image
          source={isValidUrl(teams[0]?.logo) ? { uri: teams[0]?.logo } : { uri: 'https://default-image-url.png' }}
          style={styles.teamLogo}
          resizeMode="contain"
          onError={(error) => console.log('Ошибка загрузки логотипа команды 1:', error)} // Логируем ошибку загрузки
          onLoad={() => console.log('Логотип команды 1 загружен:', teams[0]?.logo)} // Логируем успешную загрузку
        />
        <Image
          source={isValidUrl(teams[1]?.logo) ? { uri: teams[1]?.logo } : { uri: 'https://default-image-url.png' }}
          style={styles.teamLogo}
          resizeMode="contain"
          onError={(error) => console.log('Ошибка загрузки логотипа команды 2:', error)} // Логируем ошибку загрузки
          onLoad={() => console.log('Логотип команды 2 загружен:', teams[1]?.logo)} // Логируем успешную загрузку
        />
        
        <Text style={styles.dateText}>
          {moment(time).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
        <Text style={styles.mapText}>Карты: {maps}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C34',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  matchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  teamLogo: {
    width: 50,
    height: 50,
    margin: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#bbb',
  },
  mapText: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 10,
  },
});

export default MatchDetails;
