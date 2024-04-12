import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from "../../Utilitaire/actions/user.actions";

const UploadImg = () => {
	const [file, setFile] = useState();
	const dispatch = useDispatch(); //c'est pour envoyer l'image, on créer l'action pour que l'image soit changer aussis dans le back, ici avec dispatch
	const userData = useSelector((state) => state.userReducer);

	const handlePicture = (e) => {
		e.preventDefault();
		
		const data = new FormData(); //mettre dans un package notre image + info qu'on va passé
		
		data.append("name",userData.pseudo);
		data.append("userId", userData._id);
		data.append("file",file);

		dispatch(uploadPicture(data,userData._id));
	}

	return (
		<div id="UploadImg">
			<form action="" onSubmit={handlePicture} >
				<label htmlFor="file">Update</label>
				<br/>
				<input
					className='file'
					type="file"
					id="file"
					name="file"
					accept=".jpg, .jpeg, .png"
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<input className='input' type="submit" value="Envoyer"/>
			</form>
		</div>
	);
};

export default UploadImg;