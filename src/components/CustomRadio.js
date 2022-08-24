import React, { memo } from 'react';
import { RadioWrapper } from '../styled-components/CustomRadio.styled';

const CustomRadio = ({label, ...restProps}) => {
    return (
        <RadioWrapper>
            <label htmlFor={restProps.id}>
                {label}
                <input
                    {...restProps}
                    type="radio"
                />
                <span />
            </label>
        </RadioWrapper> 
     );
}
 
export default memo(CustomRadio);