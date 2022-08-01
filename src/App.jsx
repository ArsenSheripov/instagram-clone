import './App.scss';
import Header from './components/header/Header';
import Post from './components/post/Post';
import { useEffect, useState } from 'react';
import { db } from './firebase';

function App() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		db.collection('posts').onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => doc.data()))
		})
	}, [])

	return (
		<div className="app">
			<Header />
			{posts.map(post =>
				<Post
					key={post.id}
					username={post.username}
					caption={post.caption}
					imgUrl={post.imgUrl}
				/>
			)}
		</div>
	);
}

export default App;
