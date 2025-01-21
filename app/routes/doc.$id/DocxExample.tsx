import { Box } from '@mui/material'
import React from 'react'

interface DocxExampleProps {
  docxImages: string[]
}

const DocxExample: React.FC<DocxExampleProps> = ({ docxImages }) => {
  return (
    <>
      <Box mt={2} sx={{ display: 'block', justifyContent: 'center' }}>
        {docxImages.map((image, index) => (
          <img key={index} src={image} style={{ width: '100%', height: 'auto', border: '2px solid black', margin: '1pt' }} />
        ))}
      </Box>
    </>
  )
}

export default DocxExample
