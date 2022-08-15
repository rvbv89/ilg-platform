import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import '@fontsource/barlow';
import {
  ChakraProvider,
  Container,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  SimpleGrid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { PostFeed } from './PostFeed';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';
import { AuthModal } from './AuthModal';

export const Home = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Container
        maxHeight="100vh"
        maxWidth="100%"
        // overflowY="hidden"
        // overflowX="hidden"
      >
        <Box margin={0} minWidth="max-content" textAlign="center" fontSize="xl">
          {/* templateColumns="repeat(4, 1fr)" margin={2} p={0} gap={4 */}

          <AuthModal isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
          <Navbar onOpen={onOpen} />
          <SimpleGrid templateColumns="repeat(3, 1fr)" templateRows="repeat(1, 1fr)">
            <GridItem rowSpan={1}>
              <Container>
                <VStack>
                  <PostSidebar />
                  <Container
                    centerContent
                    padding="0"
                    visibility={['visible', 'visible', 'visible', 'hidden']}
                  >
                    <SocialSidebar />
                  </Container>
                </VStack>
              </Container>
            </GridItem>
            <GridItem rowSpan={1} colSpan={['2', '2', '1', '1']}>
              <PostFeed />
            </GridItem>
            <GridItem visibility={['hidden', 'hidden', 'hidden', 'visible']}>
              <SocialSidebar />
            </GridItem>
          </SimpleGrid>
        </Box>
      </Container>
    </ChakraProvider>
  );
};
