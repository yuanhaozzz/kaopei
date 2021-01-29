import React, { FC } from 'react';
import './downSelect.less'
interface Props{
	list: any[];
	selectTitle: Function;
}

const DownSelect = (props: Props) => {
	return (
		<ul className='down-select-wrapper'>
			<i></i>
			{
				props.list.map((item: any, index: number) => (
					<li key={index} onClick={(e: any) => props.selectTitle(e, index)}>
						{item.examName}
					</li>
				))
			}
		</ul>
	)
}

export default DownSelect;