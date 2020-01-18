import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'rebass';
import styled from 'styled-components';
import LogoBig from './Logo/Portfolio-text-montez.svg';
import LogoSmall from './Logo/Portfolio-small.svg';

const MEDIA_QUERY_SMALL = '@media (max-width: 700px)';

const ImageLogoBig = styled(Image)`
  width: 200px;
  cursor: 'pointer';

  ${MEDIA_QUERY_SMALL} {
    display: none;
  }
`;

const ImageLogoSmall = styled(Image)`
  width: 38px;
  cursor: 'pointer';
  display: none;

  ${MEDIA_QUERY_SMALL} {
    display: block;
  }
`;

const ImageLogo = ({onClick}) => (
  <div>
    <ImageLogoBig
      src={LogoBig}
      alt="Portfolio Logo"
      onClick={()=> onClick()}
    />
    <ImageLogoSmall
      src={LogoSmall}
      alt="Portfolio Logo"
      onClick={()=> onClick()}
    />
  </div>
);

ImageLogo.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ImageLogo;
