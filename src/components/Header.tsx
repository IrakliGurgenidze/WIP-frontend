import React, { useState } from "react";
import { Anchor, Container, Group, Box, Button, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { isAuthenticated, getUserType, logout } from "../utils/auth";
import classes from "./Header.module.css";

const topLinks = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
];

const mainLinks = [
  { label: "Features", link: "/about" },
  { label: "Blog", link: "/blog" },
  { label: "Contact", link: "/contact" },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const authenticated = isAuthenticated();
  const userType = getUserType();

  const topItems = topLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={index}
      className={classes.topLinks}
      data-active={index === active || undefined}
      onClick={() => setActive(index)}
    >
      {item.label}
    </Anchor>
  ));

  const mainItems = mainLinks.map((item, index) => (
    <Anchor
      href={item.link}
      key={item.label}
      className={classes.mainLink}
    >
      {item.label}
    </Anchor>
  ));

  const handleLogout = () => {
    logout();
  };

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes.topWrapper}>
        <Container size="lg" className={classes.innerContainer}>
          <div className={classes.topContainer}>
            <Group className={classes.topLinksGroup}>
              {topItems}
            </Group>
            
            {authenticated ? (
              <Menu 
                shadow="md" 
                width={200}
                position="bottom-end"
                offset={5}
                styles={{
                  dropdown: {
                    backgroundColor: 'var(--color-bg-light)',
                    border: '1px solid var(--color-accent)',
                    borderRadius: '8px',
                  },
                  label: {
                    color: 'var(--color-neutral)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  },
                  item: {
                    color: 'var(--color-neutral)',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-bg-light)',
                    },
                  },
                }}
              >
                <Menu.Target>
                  <Button 
                    className={`transparent-button ${classes.loginButton}`}
                    size="sm"
                  >
                    {userType === 'applicant' ? 'Applicant' : 'Recruiter'} Menu
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Account Options</Menu.Label>
                  <Menu.Item 
                    component="a" 
                    href={userType === 'applicant' ? '/applicant/dashboard' : '/recruiter/dashboard'}
                  >
                    Dashboard
                  </Menu.Item>
                  <Menu.Item 
                    onClick={handleLogout}
                    style={{ color: 'red' }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Menu 
                shadow="md" 
                width={200}
                position="bottom-end"
                offset={5}
                styles={{
                  dropdown: {
                    backgroundColor: 'var(--color-bg-light)',
                    border: '1px solid var(--color-accent)',
                    borderRadius: '8px',
                  },
                  label: {
                    color: 'var(--color-neutral)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  },
                  item: {
                    color: 'var(--color-neutral)',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-bg-light)',
                    },
                  },
                }}
              >
                <Menu.Target>
                  <Button 
                    className={`transparent-button ${classes.loginButton}`}
                    size="sm"
                  >
                    Log In
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Choose Login Type</Menu.Label>
                  <Menu.Item component="a" href="/applicant-login">
                    Applicant Login
                  </Menu.Item>
                  <Menu.Item component="a" href="/recruiter-login">
                    Recruiter Login
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        </Container>
      </Box>
      
      <Box className={classes.mainWrapper}>
        <Container size="lg" className={classes.innerContainer}>
          <div className={classes.mainContainer}>
            <Anchor href="/" className={classes.logo}>
              <img src="/logo.png" alt="Logo" />
            </Anchor>
            <Group className={classes.mainLinksGroup}>
              {mainItems}
            </Group>
          </div>
        </Container>
      </Box>
    </Box>
  );
}
