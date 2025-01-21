import { Box } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownExampleProps {
  markdown: string
}

const MarkdownExample: React.FC<MarkdownExampleProps> = ({ markdown }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Box>
  )
}

export default MarkdownExample
