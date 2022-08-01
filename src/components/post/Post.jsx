import { Avatar } from '@mui/material'
import React from 'react'
import cl from './post.module.scss'

const Post = (props) => {
	return (
		<div className={cl.post}>
			<div className={cl.post__header}>
				<Avatar
					className={cl.post__avatar}
					alt='avatar'
				/>
				<h3 className={cl.post__username}>{props.username}</h3>
			</div>
			<img
				className={cl.post__img}
				src={props.imgUrl}
				alt="post img"
			/>
			<h4 className={cl.post__text}><strong>{props.username}</strong> {props.caption}</h4>
		</div>
	)
}

export default Post
