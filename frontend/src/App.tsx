import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { AuthenticationForm } from './components/AuthenticationForm';
import { Dashboard } from './components/Dashboard';
import { Loader, Center } from '@mantine/core';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  return isAuthenticated ? <Dashboard /> : <AuthenticationForm />;
}

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;