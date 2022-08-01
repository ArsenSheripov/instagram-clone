import './App.scss';
import Header from './components/header/Header';
import Post from './components/post/Post';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import BasicModal from './components/modal/BasicModal';

function App() {
	const [posts, setPosts] = useState([])
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		db.collection('posts').onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => ({
				id: doc.id,
				post: doc.data()
			})))
		})
	}, [])

	return (
		<div className="app">
			<Header />
			<BasicModal
				handleOpen={handleOpen}
				handleClose={handleClose}
				open={open}
			>
				pmoddddal
			</BasicModal>
			{posts.map(({ id, post }) =>
				<Post
					key={id}
					username={post.username}
					caption={post.caption}
					imgUrl={post.imgUrl}
				/>
			)}
		</div>
	);
}

export default App;
