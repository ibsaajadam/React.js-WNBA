import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from "../firebase-config";
import Header from '../components/Header/Header';


function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "jobs")


  const deletePost = async (id) => {
    const postDoc = doc(db, "jobs", id)
    await deleteDoc(postDoc);
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);
  

  return (
    <div className="homePage">
     <Header />
     <div className="desc">
        <h2>Current Job Openings</h2>
      </div>
      {postLists.map((post) => {
        return (
          <div className="post">
           <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="deletePost">
              {isAuth && post.author.id === auth.currentUser.uid && (
              <button onClick={() => {deletePost(post.id)}}> &#128465; </button>
            )}
            </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
        </div>
        );
      })}
    </div>
  )
}

export default Home;