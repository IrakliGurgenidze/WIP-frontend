import React, { useState } from "react";
import { Anchor, Container, Group, Box, Burger, Divider, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";

const topLinks = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
];

const mainLinks = [
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

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes.topWrapper}>
        <Container size="lg" className={classes.innerContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Group justify="flex-start" gap={32}>
              {topItems}
            </Group>
            <Button variant="outline" color="blue" size="md">
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
            <Group gap={32}>
              {mainItems}
            </Group>
          </div>
        </Container>
      </Box>
    </Box>
  );
}
