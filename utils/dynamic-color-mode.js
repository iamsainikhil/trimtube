import React from 'react'
import {useTheme, useColorMode, ThemeProvider} from '@chakra-ui/react'

export const DynamicColorMode = (props) => {
  const {colorMode} = useColorMode()
  const theme = useTheme()

  return (
    <ThemeProvider
      {...props}
      theme={{
        // Chakra does a deep-merge of the theme objects
        colors: {
          mode: {
            // Retain access to all the default colours specified
            ...theme.colors,
            // Overwrite with mode-specific colors
            ...theme.colors.modes?.[colorMode],
          },
        },
      }}
    />
  )
}
