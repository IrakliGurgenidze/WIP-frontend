import React from 'react'
import { Title, Text, Container } from '@mantine/core'

export default function About() {
  return (
    <Container>
      <Title
        style={{
          fontSize: '42pt',
          textAlign: 'justify',
          color: 'var(--color-neutral)',
        }}
      >
        About Apture
      </Title>

      <Text
        style={{
          fontSize: '24pt',
          lineHeight: 1.5,
          textAlign: 'justify',
          color: 'black',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />
        Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. <br /><br />
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. <br /><br />
        Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </Text>
    </Container>
  )
}