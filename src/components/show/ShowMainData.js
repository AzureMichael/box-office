import React from 'react';
import IMG_PLACEHOLDER from '../../images/not-found.png';
import { Headline, MainDataWrapper, TagList } from '../../styled-components/ShowMainData.styled';
import { Star } from '../../styled-components/styled-components';

const ShowMainData = ({image, name, rating, summary, tags }) => {
    return ( 
    <MainDataWrapper>
        <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className='text-side'>
        <Headline>
          <h1>{name}</h1>
          <div>
            <Star />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </Headline>
        <div className='summary' dangerouslySetInnerHTML={{ __html: summary }} />

        <TagList>
          Tags:{' '}
          <div>
            {tags.map((tag, i) => (
              <span key={i}>{tag} </span>
            ))}
          </div>
        </TagList>
      </div>
    </MainDataWrapper> 
    );
}
 
export default ShowMainData;