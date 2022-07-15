import React from 'react';
import {
  Flex,
  Box,
  Text,
  Heading,
  ButtonGroup,
  Button,
  VStack,
  theme,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { currentFeed } from './redux/feedSlice';

export const PostSidebar = () => {
const dispatch = useDispatch()

  return (
    <Box
      centerContent
      border="1px"
      borderColor="lightgrey"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
    >
      <Heading fontFamily="body" size="md" marginBottom="4" padding="4" color="slategrey">
        Feeds
      </Heading>

      <ButtonGroup>
        <VStack spacing="6">
          <Button onClick={(id) => {
            dispatch(currentFeed(id.value))
          }} id="main">Main</Button>
          <Button id="finance" value="finance" onClick={(value) => {
            dispatch(currentFeed(value))
          }}>Finance</Button>
          <Button id="music">Music</Button>
          <Button id="technology">Technology</Button>
        </VStack>
      </ButtonGroup>
    </Box>
  );
};
