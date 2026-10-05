import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Detalle del estudiante
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Código del estudiante:
        </Text>

        <Text style={styles.studentId}>
          {id}
        </Text>

        <Text style={styles.description}>
          Esta pantalla recibe el código del estudiante
          directamente desde la ruta.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>
          Volver
        </Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },

  studentId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#208AEF',
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
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
});