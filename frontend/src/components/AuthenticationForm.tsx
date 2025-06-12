import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Select,
  Alert,
  Loader,
} from '@mantine/core';
import type { PaperProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, register, industries, industriesLoading } = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      gender: '',
      location: '',
      username: '',
      industry: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      username: (val) => type === 'register' && val.length < 3 ? 'Username should be at least 3 characters' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);

    try {
      if (type === 'login') {
        await login(values.email, values.password);
      } else {
        await register({
          email: values.email,
          username: values.username,
          password: values.password,
          name: values.name || undefined,
          gender: (values.gender as 'male' | 'female' | 'other') || undefined,
          location: values.location || undefined,
          industry: values.industry || undefined,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Paper radius="md" p="lg" withBorder {...props}>
        <Text size="lg" fw={500} mb="xl" style={{ textAlign: 'center' }}>
          Welcome to Pesasa <br /> Please {type}
        </Text>

        <Divider 
          label={type === 'register' ? "Fill the following fields to Sign Up" : "Enter your credentials to Sign In"} 
          labelPosition="center" 
          my="lg" 
        />

        {error && (
          <Alert color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your full name (optional)"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

            {type === 'register' && (
              <TextInput
                required
                label="Username"
                placeholder="Enter your username"
                value={form.values.username}
                onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                error={form.errors.username}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              radius="md"
            />

            {type === 'register' && (
              <Select
                label="Gender"
                placeholder="Select your gender (optional)"
                value={form.values.gender}
                onChange={(value) => form.setFieldValue('gender', value || '')}
                data={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
                clearable
                radius="md"
              />
            )}

            {type === 'register' && (
              <TextInput
                label="Location"
                placeholder="Enter your location (optional)"
                value={form.values.location}
                onChange={(event) => form.setFieldValue('location', event.currentTarget.value)}
                radius="md"
              />
            )}

            {type === 'register' && (
              <Select
                label="Industry"
                placeholder={industriesLoading ? "Loading industries..." : "Select your industry (optional)"}
                value={form.values.industry}
                onChange={(value) => form.setFieldValue('industry', value || '')}
                data={industries.map(industry => ({
                  value: industry.id,
                  label: industry.name,
                }))}
                disabled={industriesLoading}
                clearable
                searchable
                radius="md"
              />
            )}

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={loading} disabled={loading}>
              {loading ? <Loader size="sm" /> : upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}