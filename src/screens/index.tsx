import { Text } from '@/components/text'
import { Box, Button } from '@mui/material'
import React from 'react'

const Index = () => {
  return (
    <>
        <Box>
            <Text variant='h1'>Información presupuestaria</Text>
            <Button type='submit' variant='contained'>Subir archivo</Button>
        </Box>
    </>
  )
}

export default Index