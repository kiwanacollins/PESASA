import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Avatar,
  Badge,
} from '@mantine/core';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user, logout, industries } = useAuth();

  if (!user) {
    return null;
  }

  // Find the industry name from the industries list
  const userIndustry = user.industry 
    ? industries.find(industry => industry.id === user.industry)
    : null;

  return (
    <Container size="lg" py="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Group align="flex-start" mb="xl">
          <Avatar size="xl" radius="xl" color="blue">
            {user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()}
          </Avatar>
          <div style={{ flex: 1 }}>
            <Title order={2} mb="sm">
              Welcome back, {user.name || user.username}!
            </Title>
            <Text c="dimmed" mb="md">
              Here's your profile information
            </Text>
            <Button variant="outline" color="red" onClick={logout}>
              Logout
            </Button>
          </div>
        </Group>

        <Stack gap="md">
          <Paper withBorder p="md" radius="sm">
            <Title order={4} mb="sm">Profile Information</Title>
            <Stack gap="xs">
              <Group>
                <Text fw={500} w={100}>Username:</Text>
                <Text>{user.username}</Text>
              </Group>
              <Group>
                <Text fw={500} w={100}>Email:</Text>
                <Text>{user.email}</Text>
              </Group>
              {user.name && (
                <Group>
                  <Text fw={500} w={100}>Name:</Text>
                  <Text>{user.name}</Text>
                </Group>
              )}
              {user.gender && (
                <Group>
                  <Text fw={500} w={100}>Gender:</Text>
                  <Badge variant="light">{user.gender}</Badge>
                </Group>
              )}
              {user.location && (
                <Group>
                  <Text fw={500} w={100}>Location:</Text>
                  <Text>{user.location}</Text>
                </Group>
              )}
              {userIndustry && (
                <Group>
                  <Text fw={500} w={100}>Industry:</Text>
                  <Badge variant="light" color="green">{userIndustry.name}</Badge>
                </Group>
              )}
            </Stack>
          </Paper>

          <Paper withBorder p="md" radius="sm">
            <Title order={4} mb="sm">Account Details</Title>
            <Stack gap="xs">
              <Group>
                <Text fw={500} w={120}>Member since:</Text>
                <Text>{new Date(user.createdAt).toLocaleDateString()}</Text>
              </Group>
              <Group>
                <Text fw={500} w={120}>Last updated:</Text>
                <Text>{new Date(user.updatedAt).toLocaleDateString()}</Text>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}
