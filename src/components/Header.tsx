import React, { useState } from "react";
import { AppShell, Anchor, Container, Group, Text, Box, Burger, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState<string | null>(null);

  const topLinks = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
  ];

  const mainLinks = [
    { label: "Blog", link: "/blog" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <AppShell.Header className={classes.header}>
      {/* --- TOP BAR --- */}
      <Box className={classes.topbar}>
        <Container size="xl" className={classes.innerTop}>
          <Group gap="lg">
            {topLinks.map((item) => (
              <Anchor
                key={item.label}
                href={item.link}
                c="white"
                fw={500}
                className={classes.secondaryLink}
              >
                {item.label}
              </Anchor>
            ))}
          </Group>
          <Group gap="lg">
            <Anchor href="/login" c="white" className={classes.secondaryLink}>
              Login
            </Anchor>
          </Group>
        </Container>
      </Box>

      {/* --- MAIN HEADER --- */}
      <Container size="xl" className={classes.innerMain}>
        <Text fz="xl" fw={700} c="var(--color-neutral)">
          Apture
        </Text>
        <Box className={classes.links} visibleFrom="sm">
          <Group gap={0} className={classes.mainLinks}>
            {mainLinks.map((item) => (
              <Anchor
                key={item.label}
                href={item.link}
                className={classes.mainLink}
                data-active={active === item.label || undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(item.label);
                }}
              >
                {item.label}
              </Anchor>
            ))}
          </Group>
        </Box>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
        />
      </Container>
      <Divider />
    </AppShell.Header>
  );
}
