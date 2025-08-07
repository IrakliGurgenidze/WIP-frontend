import React from 'react';
import { Group, Text } from '@mantine/core';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.innerContainer}>
        <Text size="sm">© 2025 Apture</Text>
        <Group gap="md">
          <Text size="sm">Version 0.1.0</Text>
          <a href="https://twitter.com" target="_blank">Twitter</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
        </Group>
      </div>
    </footer>
  );
}