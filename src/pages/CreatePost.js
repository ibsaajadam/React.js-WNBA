import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "jobs")
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title, 
      postText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
    });
    navigate('/');
  };

  useEffect(() => {
    if (!isAuth){
      navigate('/login');
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Job</h1>
        <div className="inputGp">
          <label> Job Title:</label>
          <input 
            placeholder="Job Title..." 
            onChange={(event) => {
              setTitle(event.target.value);
              }}
            />
        </div>
        <div className="inputGp">
          <label> Job Description:</label>
          <textarea 
            placeholder="Job Description..." 
            onChange={(event) => {
              setPostText(event.target.value);
            }}
            />
        </div>
        <button onClick={createPost}>Submit Job</button>
      </div>
    </div>
  )
}

export default CreatePost