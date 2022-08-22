import React, {useEffect, useReducer} from 'react';
import {useParams} from 'react-router-dom'
import { apiGet } from '../../api/tv-maze-api';

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

    return ( 
        <div>
            this is show page
        </div>
     );
}
 
export default Show;