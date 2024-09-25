import React, { createContext, useEffect, useState } from 'react';
import App from '../App';

export const PostContext=createContext(null)

const Post = () => {
    const [postDetails, setPostDetails] = useState(() => {
        const savedPostDetails = localStorage.getItem('postDetails');
        return savedPostDetails ? JSON.parse(savedPostDetails) : {};
      });
    
      // Update local storage whenever postDetails changes
      useEffect(() => {
        localStorage.setItem('postDetails', JSON.stringify(postDetails));
      }, [postDetails]);
  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
    <App/>
   </PostContext.Provider>
  );
};

export default Post;