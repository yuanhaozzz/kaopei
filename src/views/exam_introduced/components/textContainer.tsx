import React, { FC } from 'react';
import './textContainer.less'

const TextContainer: FC = (props: any) => {
	return (
		<div className='text-container'>
			{props.children}
		</div>
	)
}

export default TextContainer;