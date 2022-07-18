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
import { currentFeed } from './redux/postsSlice';

const feedIds = [
  "Main", "Finance", "Technology", "Music"
]

export const PostSidebar = () => {
  const dispatch = useDispatch();

  

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

          {feedIds.map(id =>  {
            return(<Button
            value={id.toLowerCase()}
            onClick={e => {
              dispatch(currentFeed(e.target.value))
            }}
            >{id}</Button>)
            })}

          {/* <Button
            id="main"
            value="main"
            onClick={e => {
              dispatch(currentFeed(e.target.value));
            }}
          >
            Main
          </Button>

          <Button
            id="finance"
            value="finance"
            onClick={e => {
              dispatch(currentFeed(e.target.value));
            }}
          >
            Finance
          </Button>
          <Button id="music"
          value="music"
          onClick={e =>{
            dispatch(currentFeed(e.target.value))
          }}
          >Music</Button>
          <Button id="technology" value="technology"
          onClick={e => {
            dispatch(currentFeed(e.target.value))
          }}
          >Technology</Button> */}
        </VStack>
      </ButtonGroup>
    </Box>
  );
};
