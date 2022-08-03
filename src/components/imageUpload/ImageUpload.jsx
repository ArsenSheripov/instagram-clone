import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

const ImageUpload = ({ username }) => {
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState('');

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0])
		}
	}

	const handleUpload = () => {
		const uploadTask = storage.ref(`images/${image.name}`).put(image);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress)
			},
			(err) => {
				console.log(err);
				alert(err.message);
			},
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						db.collection('posts').add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: username
						});

						setProgress(0);
						setCaption('');
						setImage(null);
					})
			}
		)
	}


	return (
		<div>
			<progress value={progress} max="100" />
			<Input
				type='text'
				placeholder='Enter a caption'
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
			/>
			<Input
				type='file'
				onChange={handleChange}
			/>
			<Button onClick={handleUpload}>Upload</Button>
		</div>
	)
}

export default ImageUpload;
