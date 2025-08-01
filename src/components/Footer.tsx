import React from 'react';
import { AppShell, Container, Group, Text } from '@mantine/core';

export default function Footer() {
  return (
    <AppShell.Footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        borderTop: '1px solid #eaeaea',
      }}
    >
      <Text size="sm">© 2025 Apture</Text>
      <Group gap="md">
        <Text size="sm">Version 0.1.0</Text>
        <a href="https://twitter.com" target="_blank">Twitter</a>
        <a href="https://linkedin.com" target="_blank">LinkedIn</a>
      </Group>
    </AppShell.Footer>
  );
}