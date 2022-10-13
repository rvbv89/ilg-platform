import React from 'react';
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  ButtonGroup,
  Button,
  VStack,
  Divider,
  theme,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { currentFeed } from './redux/postsSlice';

const feedIds = ['general', 'finance', 'technology', 'music'];

export const PostSidebar = () => {
  // define dispatch var for redux hook
  const dispatch = useDispatch();

  return (
    <Container
      centerContent
      borderColor="lightgrey"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
    >
      <Heading
        fontFamily="body"
        size="md"
        marginBottom="4"
        padding="4"
        color="slategrey"
      >
        Feeds
      </Heading>

      <ButtonGroup>
        <VStack spacing="6">
          {feedIds.map(id => {
            return (
              <Button
                key={id}
                fontSize={['.85em', '1em', '1em', '1.25em']}
                padding={['2', '4', '4', '4']}
                value={id}
                onClick={e => {
                  dispatch(currentFeed(e.target.value));
                }}
                size="lg"
              >
                {`#${id}`}
              </Button>
            );
          })}
        </VStack>
      </ButtonGroup>
      <Divider
        visibility={['visible', 'visible', 'hidden', 'hidden']}
        marginY="4"
      />
    </Container>
  );
};
