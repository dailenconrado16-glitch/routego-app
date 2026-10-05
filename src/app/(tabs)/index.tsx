import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RouteGo</Text>

      <Text style={styles.subtitle}>
        Gestión de estudiantes y rutas
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Bienvenido a RouteGo
        </Text>

        <Text style={styles.cardText}>
          Explora las rutas disponibles y consulta la información
          de los estudiantes.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/student/ST-202688')}
        >
          <Text style={styles.buttonText}>
            Ver estudiante
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.secondaryButton}
  onPress={() => router.push('/modal')}
>
  <Text style={styles.secondaryButtonText}>
    Ver información
  </Text>
</TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#208AEF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
  marginTop: 12,
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#208AEF',
},

secondaryButtonText: {
  color: '#208AEF',
  fontSize: 16,
  fontWeight: 'bold',
},
});