import React from 'react';
import '@fontsource/barlow';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { MainFeed } from './MainFeed';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        margin={0}
        minWidth="max-content"
        maxHeight="100%"
        textAlign="center"
        fontSize="xl"
      >
        <Navbar />
        <Grid templateColumns="repeat(4, 1fr)" margin={0} p={4} gap={4}>
          <GridItem>
            <PostSidebar />
          </GridItem>
          <GridItem colSpan={2}>
            <MainFeed />
          </GridItem>
          <GridItem>
            <SocialSidebar />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
