import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const CARD_HEIGHT = '250px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${CARD_HEIGHT}*0.40);

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT}*0.40 / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT}

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;

const BookImage = styled(Image)`
  width: calc(${CARD_HEIGHT}*0.65);
  height: ${CARD_HEIGHT};
  padding: 45px;
  padding-right: 10px;
  padding-left: 0px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT}*0.65 / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const BookTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const Book = ({
  name,
  description,
  bookUrl,
  type,
  readDate,
  coverImage
}) => (
  <Card p={0}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <span>
          <Title my={2} pb={1}>
            {name}
          </Title>
        </span>
        <Text width={[1]} style={{ overflow: 'auto' }}>
          {description}
        </Text>
      </TextContainer>

      <ImageContainer>
        <BookImage src={coverImage.image.src} alt={coverImage.title} />
        <BookTag>
          <Flex
            style={{
              float: 'right',
            }}
          >
            <Box mx={1} fontSize={5}>
              <SocialLink
                name="See Book"
                fontAwesomeIcon="globe"
                url={bookUrl}
              />
            </Box>
          </Flex>
          <ImageSubtitle width="165px" bg="primary" color="white" y="bottom" x="right" round>
            {type}
          </ImageSubtitle>
          <Hide query={MEDIA_QUERY_SMALL}>
            <ImageSubtitle bg="backgroundDark">{readDate}</ImageSubtitle>
          </Hide>
        </BookTag>
      </ImageContainer>
    </Flex>
  </Card>
);

Book.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bookUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  readDate: PropTypes.string.isRequired,
  coverImage: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
};

const Books = () => (
  <Section.Container id="Books" Background={Background}>
    <Section.Header name="Books" icon="book" label="notebook" />
    <StaticQuery
      query={graphql`
        query BooksQuery {
          allContentfulBook(sort: {order: DESC, fields: readDate}) {
            edges {
              node {
                id
                name
                description
                bookUrl
                readDate(formatString: "DD/MM/YYYY")
                type
                coverImage{
                  title
                  image: resize(width: 150, quality: 100) {
                    src
                  }
                }
              }
            }
          }
        }
      `}
      render={({ allContentfulBook }) => (
        <CardContainer minWidth="350px">
          {allContentfulBook.edges.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.node.id}>
              <Book {...p.node} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Books;
