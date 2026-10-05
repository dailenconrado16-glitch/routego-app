import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RouteGo</Text>

      <Text style={styles.subtitle}>
        Gestión de estudiantes y rutas
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bienvenido a RouteGo</Text>

        <Text style={styles.cardText}>
          Explora las rutas disponibles y consulta la información de los
          estudiantes.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/student/ST-202688')}
        >
          <Text style={styles.buttonText}>Ver estudiante</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  cardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#208AEF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});