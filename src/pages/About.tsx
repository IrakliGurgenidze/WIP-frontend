import React from 'react'
import { Title, Text, Container } from '@mantine/core'

export default function About() {
  return (
    <Container>
      <Title
        style={{
          fontSize: '32pt', // Changed from 42pt to match Home
          textAlign: 'justify',
          color: 'var(--color-neutral)',
        }}
      >
        <br /> About Apture
      </Title>

      <Text
        style={{
          fontSize: '16pt', // Changed from 24pt to match Home
          lineHeight: 1.5,
          textAlign: 'justify',
          color: 'black',
        }}
      >
        <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />
        Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. <br /><br />
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. <br /><br />
        Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </Text>
    </Container>
  )
}