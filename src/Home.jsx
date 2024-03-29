import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
        maxWidth="100vw"
        // maxWidth="100%"
        // maxWidth="100%"
        overflowY="hidden"
        // overflowX="hidden"
      >
        <AuthModal isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
        <Navbar onOpen={onOpen} />
        <SimpleGrid columns={3} maxChildWidth="35%">
          <GridItem>
            <Container maxHeight={['100vh', '100vh', 'none', 'none']} overflowY={['auto', 'auto', 'hidden', 'hidden']}     
            css={{
          '&::-webkit-scrollbar': {
            width: '6px', 
          },
          '&::-webkit-scrollbar-track': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'slategrey',
            borderRadius: '24px',
          },
        }} >
              <VStack overflowX='hidden' >
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
          <GridItem colSpan={['2', '2', '1', '1']}>
            <PostFeed />
          </GridItem>
          <GridItem visibility={['hidden', 'hidden', 'hidden', 'visible']}>
            <SocialSidebar />
          </GridItem>
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
};
