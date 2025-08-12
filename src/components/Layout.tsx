/**
 * Layout component that wraps the application with a consistent header, footer, and navigation bar.
 * Uses Mantine's AppShell for layout structure.
 *
 * Props:
 * - children: React.ReactNode - The content to be rendered within the main area of the layout.
 *
 * Structure:
 * - Header: Renders the navigation bar at the top.
 * - AppShell.Main: Renders the main content passed as children.
 * - Footer: Renders the footer at the bottom.
 */

import React from 'react';
import { AppShell, Container } from '@mantine/core';
import Header from './Header';
import Footer from './Footer';
import './page.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 120 }}
      footer={{ height: 30 }}
      padding={0}
      styles={{
        main: {
          background: 'var(--color-bg-light)',
        },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" className="page-container">
          {children}
        </Container>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}