import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Arrow({ color }) {
  return(
    <span className="arrow">
      <FontAwesomeIcon size="5x" icon={faArrowRight} className={ `me-1 ${color}` }/>
    </span>
  );
}
