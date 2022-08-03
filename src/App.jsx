import './App.scss';
import Header from './components/header/Header';
import Post from './components/post/Post';
import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import BasicModal from './components/modal/BasicModal';
import { Button, Input } from '@mui/material';
import logo from './assets/logo.png';


function App() {
	const [posts, setPosts] = useState([])
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null)

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log(authUser);
				setUser(authUser)
			} else {
				setUser(null);
			}
		})
	}, [])

	useEffect(() => {
		db.collection('posts').onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => ({
				id: doc.id,
				post: doc.data()
			})))
		})
	}, [])

	const signUp = (evt) => {
		evt.preventDefault()

		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: username
				})
			})
			.catch(err => alert(err.message))

		setOpen(false)
	}

	const signIn = (evt) => {
		evt.preventDefault()

		auth
			.signInWithEmailAndPassword(email, password)
			.catch(err => alert(err.message))

		setOpenSignIn(false)
	}

	return (
		<div className="app">
			<Header />
			<BasicModal
				handleClose={() => setOpen(false)}
				open={open}
			>
				<form className='app__signUp'>
					<center>
						<img
							src={logo}
							alt="logo"
							width={200}
						/>
					</center>

					<Input
						placeholder='username'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder='email'
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder='password'
						type='text'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type='submit' onClick={signUp}>Sign Up</Button>
				</form>
			</BasicModal>
			<BasicModal
				handleClose={() => setOpenSignIn(false)}
				open={openSignIn}
			>
				<form className='app__signUp'>
					<center>
						<img
							src={logo}
							alt="logo"
							width={200}
						/>
					</center>
					<Input
						placeholder='email'
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder='password'
						type='text'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type='submit' onClick={signUp}>Sign Up</Button>
				</form>
			</BasicModal>
			{user
				?
				<Button onClick={() => auth.signOut()}>Logout</Button>
				:
				<div className="app__loginContainer">
					<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
					<Button onClick={() => setOpen(true)}>Sign Up</Button>
				</div>
			}
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
