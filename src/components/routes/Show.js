import React, {useEffect, useReducer} from 'react';
import {useParams} from 'react-router-dom'
import { apiGet } from '../../api/tv-maze-api';
import { InfoBlock } from '../../styled-components/Show.styled';
import Cast from '../show/Cast';
import Details from '../show/Details';
import Seasons from '../show/Seasons';
import ShowMainData from '../show/ShowMainData';

const Show = () => {

    const initialState = {
        show: null,
        isLoading: true,
        error: null,
    }

    const reducer = (prevState, action) => {
        switch(action.type){

            case 'FETCH_SUCCESS': {
                return {...prevState, isLoading: false, show: action.show}
            }
            
            case 'FETCH_FAILED': {
                return {...prevState, isLoading:false, error: action.error}
            }

            default: return prevState
        }

    } 

    const [{error, isLoading, show}, dispatch] = useReducer(reducer, initialState);

    const { id } = useParams();


    useEffect( () => {

        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
            .then(result => {
                if(isMounted){
                    dispatch({
                        type: 'FETCH_SUCCESS',
                        show: result
                    })
                }
            })
            .catch(error => {
                if(isMounted){
                    dispatch({
                        type: 'FETCH_FAILED',
                        error: error.message,
                    })
                }
            });

        return () =>{
            isMounted = false;
        }
    }, [id] );

    if(isLoading) {
        return (
            <div>
                Loading data
            </div>
        );
    }

    if(error) {
        return (
            <div>
                Error: {error.message}
            </div>
        );
    }
    debugger;
    return ( 
        <div>
            { show && 
                <div>
                    <ShowMainData 
                        image={show.image} 
                        name={show.name} 
                        rating={show.rating} 
                        summary={show.summary} 
                        tags={show.genres} 
                    />
                    <InfoBlock>
                        <h2>Details</h2>
                        <Details status={show.status} network={show.network} premiered={show.premiered} />
                    </InfoBlock>
                    { show._embedded.seasons &&
                        <InfoBlock>
                            <h2>Seasons</h2>
                            <Seasons seasons={show._embedded.seasons} />
                        </InfoBlock>                
                    }
                    { show._embedded.cast && 
                        <InfoBlock>
                            <h2>Cast</h2>
                            <Cast cast={show._embedded.cast} />
                        </InfoBlock>
                    }
                </div>    
            }
        </div>
     );
}
 
export default Show;