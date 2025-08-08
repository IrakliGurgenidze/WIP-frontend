import React, { useState } from "react";
import { Anchor, Container, Group, Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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

  const topItems = topLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={index}
      className={classes.topLinks}
      style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
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
      style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
    >
      {item.label}
    </Anchor>
  ));

  const handleLogin = () => {
    alert("Log In functionality coming soon!");
  };

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes.topWrapper}>
        <Container size="lg" className={classes.innerContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Group justify="flex-start" gap={32}>
              {topItems}
            </Group>
            <Button className="transparent-button" size="sm" onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </Container>
      </Box>
      <Box className={classes.mainWrapper}>
        <Container size="lg" className={classes.innerContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Anchor href="/" className={classes.logo}>
              <img src="/logo.png" alt="Logo" height={80} />
            </Anchor>
            <Group gap={48}>
              {mainItems}
            </Group>
          </div>
        </Container>
      </Box>
    </Box>
  );
}
