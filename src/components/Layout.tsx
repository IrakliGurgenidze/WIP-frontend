/**
 * Layout component that wraps the application with a consistent header, footer, and navigation bar.
 * Uses Mantine's AppShell for layout structure.
 *
 * Props:
 * - children: React.ReactNode - The content to be rendered within the main area of the layout.
 *
 * Structure:
 * - Navbar: Renders the navigation bar at the top.
 * - AppShell.Main: Renders the main content passed as children.
 * - Footer: Renders the footer at the bottom.
 */

import React from 'react';
import { AppShell } from '@mantine/core';
import Navbar from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      styles={{
        main: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        },
      }}
    >
      <Navbar />
      <AppShell.Main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 900, // Set your desired max width
            margin: '0 auto',
            paddingLeft: 24,
            paddingRight: 24,
            boxSizing: 'border-box',
          }}
        >
          {children}
        </div>
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}