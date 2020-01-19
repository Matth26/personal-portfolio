import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Box } from 'rebass';
import Space from '@rebass/space'
import styled from 'styled-components';
import TextLoop from 'react-text-loop';
import { SectionLink } from 'react-scroll-section';
import Typist from 'react-typist';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const StyledTypist = styled(Typist)`

  .Cursor{
    display: none;
  }
`;

const centerHorizontally = { marginRight: 'auto', marginLeft: 'auto' };

const LandingPage = () => (
  <Section.Container id="home" Background={Background}>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulAbout {
            name
            pseudo
            roles
            socialLinks {
              id
              url
              name
              fontAwesomeIcon
            }
          }
          site {
            siteMetadata {
              deterministicBehaviour
            }
          }
        }
      `}
      render={({ contentfulAbout, site }) => {
        const { pseudo, socialLinks, roles } = contentfulAbout;
        const { deterministicBehaviour } = site.siteMetadata;

        return (
          <Fragment>
            <Heading
              textAlign="center"
              as="h1"
              color="primary"
              fontSize={[5, 6, 8]}
              mb={[3, 4, 5]}
            >
              {`Hi, I'm ${pseudo} 😊`}
            </Heading>

            <Heading
              as="h2"
              color="primary"
              fontSize={[4, 5, 6]}
              mb={[3, 5]}
              textAlign="center"
              style={centerHorizontally}
            >
              <Typist
                avgTypingDelay={40}
                cursor={{
                    show: false,
                  }}
              >
                  I'm a Geek...
                <Typist.Backspace count={7} delay={1000} />
                <Typist.Delay ms={100} />
                  Crypto Enthusiast 🚀
                <Typist.Backspace count={25} delay={1500} />
                <span> </span>
                Make Poor Life Decisions
                <Typist.Backspace count={19} delay={10} />
                  Website !
                <Typist.Backspace count={14} delay={1000} />
                Love Programming
                <Typist.Delay ms={100} />
                <span> !</span>
                <Typist.Backspace count={1} delay={1000} />
                and Travelling !
              </Typist>
            </Heading>

            <Space mt={[ 5, 6 ]}>
              <Flex
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
              >
                {socialLinks.map(({ id, ...rest }) => (
                  <Box mx={3} fontSize={[5, 6, 6]} key={id}>
                    <SocialLink {...rest} />
                  </Box>
              ))}
              </Flex>
            </Space>
            <SectionLink section="about">
              {({ onClick }) => <MouseIcon onClick={onClick} />}
            </SectionLink>
          </Fragment>
        );
      }}
    />
  </Section.Container>
);

/*
              <TextLoop interval={5000}>
                {roles
                  .sort(() => deterministicBehaviour || Math.random() - 0.5)
                  .map(text => (
                    <Text width={[300, 500]} key={text}>
                      {text}
                    </Text>
                  ))}
              </TextLoop> */

              /*
                            <Typist>
                <StyledTypist>
                  {roles[0]}
                </StyledTypist>
              </Typist>
*/

export default LandingPage;
