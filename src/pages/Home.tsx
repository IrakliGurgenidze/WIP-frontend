import React from 'react'
import { Title, Text, Container, Space } from '@mantine/core'

export default function Home() {
  return (
    <Container>
      <Title
        style={{
          fontSize: '32pt',
          textAlign: 'justify',
          color: 'var(--color-neutral)',
        }}
      >
        <br /> Welcome to Apture - <br /> The recruitment platform of the Future. <br />
      </Title>

      <Text
        style={{
          fontSize: '16pt',
          lineHeight: 1.5,
          textAlign: 'justify',
          color: 'black',
        }}
      >
        <br /> Apture is an early-career recruitment platform designed to put recruiters back in control of talent discovery. <br /><br />
        Today's hiring market is noisy and inefficient - qualified candidates often go unnoticed, while recruiters
        spend countless hours sifting through irrelevant or low-quality applications. Apture flips the traditional
        process on its head, giving recruiters precision tools and intelligent filters to proactively connect with
        the right talent. <br /><br /> Our mission is to transform early-career hiring into a faster, data-driven, and
        recruiter-first experience that ensures the best matches happen more often.
      </Text>
    </Container>
  )
}