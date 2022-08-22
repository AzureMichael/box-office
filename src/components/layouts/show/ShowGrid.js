import React from 'react';
import ShowCard from './ShowCard';
import { FlexGrid } from '../../../styled-components/styled-components';

import IMAGE_NOT_FOUND from '../../../images/not-found.png'

const ShowGrid = ({data}) => {
    return (
        <FlexGrid>
                {
                    data.map(({show}) => {
                        return (
                            <ShowCard 
                                id={show.id}
                                key={show.id}
                                name={show.name}
                                summary={show.summary}
                                image={show.image ? show.image.medium : IMAGE_NOT_FOUND} 
                            />
                        )
                    })
                }
        </FlexGrid>
    ) 
}
 
export default ShowGrid;