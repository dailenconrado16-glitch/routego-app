import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { PermissionState } from '@/types/geo';

interface Props {
  title: string;
  description: string;
  state: PermissionState;
  onRequest: () => void;
  onOpenSettings: () => void;
}

export function PermissionPrimer({
  title,
  description,
  state,
  onRequest,
  onOpenSettings,
}: Props) {
  const isBlocked =
    state === 'blocked';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {isBlocked
          ? 'Desactivaste este permiso. Puedes habilitarlo desde los Ajustes del sistema.'
          : description}
      </Text>

      <Pressable
        onPress={
          isBlocked
            ? onOpenSettings
            : onRequest
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isBlocked
            ? 'Abrir Ajustes'
            : 'Permitir acceso'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#111111',
  },

  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  description: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },

  button: {
    backgroundColor: '#10b981',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 25,
  },

  buttonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },
});