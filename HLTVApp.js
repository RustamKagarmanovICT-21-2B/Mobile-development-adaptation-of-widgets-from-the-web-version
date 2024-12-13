import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import matchesData from './matches.json'; // Путь к вашему локальному файлу

const HLTVApp = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Загружаемые данные:', matchesData);  // Логируем весь файл
    setMatches(matchesData);
    setLoading(false); // Завершаем загрузку
  }, []);

  // Функция для проверки валидности URL
  const isValidUrl = (url) => typeof url === 'string' && url.startsWith('http');

  // Функция для обработки логотипов
  const handleTeamLogo = (logo) => {
    if (isValidUrl(logo)) {
      return { uri: logo };
    } else {
      console.log('Некорректный URL для логотипа:', logo);
      return { uri: 'https://default-image-url.png' }; // URL по умолчанию
    }
  };

  // Обработка нажатия на матч
  const handleMatchPress = (match) => {
    // Навигация на экран с деталями матча
    navigation.navigate('MatchDetails', { match });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Предстоящие матчи CS2</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          console.log('Текущий матч:', item); // Логируем матч для отладки

          // Проверка на наличие всех необходимых данных
          if (!item.event || !item.teams || !item.time || !item.maps) {
            console.log('Ошибка: недостающие данные в объекте:', item);
            return null;  // Не рендерим этот элемент, если данных недостаточно
          }

          return (
            <TouchableOpacity onPress={() => handleMatchPress(item)}>
              <View style={styles.match}>
                <View style={styles.eventContainer}>
                  <Image
                    source={isValidUrl(item.event.logo) ? { uri: item.event.logo } : { uri: 'https://default-image-url.png' }}
                    style={styles.eventLogo}
                    resizeMode="contain"
                    onError={(error) => console.log('Ошибка загрузки логотипа события:', error)}
                    onLoad={() => console.log('Логотип события загружен:', item.event.logo)}
                  />
                  <Text style={styles.eventName}>{item.event.name}</Text>
                </View>
                <View style={styles.teamsContainer}>
                  <Image
                    source={handleTeamLogo(item.teams[0]?.logo)}
                    style={styles.teamLogo}
                    resizeMode="contain"
                    onError={(error) => console.log('Ошибка загрузки логотипа команды 1:', error)}
                    onLoad={() => console.log('Логотип команды 1 загружен:', item.teams[0]?.logo)}
                  />
                  <Text style={styles.matchText}>
                    {item.teams[0]?.name} vs {item.teams[1]?.name}
                  </Text>
                  <Image
                    source={handleTeamLogo(item.teams[1]?.logo)}
                    style={styles.teamLogo}
                    resizeMode="contain"
                    onError={(error) => console.log('Ошибка загрузки логотипа команды 2:', error)}
                    onLoad={() => console.log('Логотип команды 2 загружен:', item.teams[1]?.logo)}
                  />
                </View>
                <Text style={styles.dateText}>
                  {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')} - {item.maps}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C34',
    paddingHorizontal: 10,
    paddingTop: 20,  // Добавим отступ сверху
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

export default HLTVApp;
