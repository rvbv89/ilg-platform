import React from 'react';
import {
  Flex,
  Box,
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

const feedIds = ['main', 'finance', 'technology', 'music'];

export const PostSidebar = () => {
  const dispatch = useDispatch();

  return (
    <Box
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
      <Divider visibility={["visible", "visible", "hidden", "hidden"]} marginY="4" />
      
    </Box>
  );
};
