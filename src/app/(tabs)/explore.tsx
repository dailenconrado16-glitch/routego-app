import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutas</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Rutas disponibles
        </Text>

        <Text style={styles.route}>
          🚌 Ruta 01 - Riohacha
        </Text>

        <Text style={styles.route}>
          🚌 Ruta 02 - Maicao
        </Text>

        <Text style={styles.route}>
          🚌 Ruta 03 - Albania
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  route: {
    fontSize: 16,
    paddingVertical: 12,
  },
});