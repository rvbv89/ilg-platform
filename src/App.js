import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  GridItem,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { MainFeed } from './MainFeed';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box margin={0} minWidth="max-content" textAlign="center" fontSize="xl">
        <Navbar />
        <Grid templateColumns="repeat(4, 1fr)" minH="100vh" margin={1} p={4} gap={4}>
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
