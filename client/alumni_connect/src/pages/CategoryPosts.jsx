import React, { useState,useEffect } from 'react'
import PostItem from '../components/Blogs/PostItem'
import Loader from '../components/Blogs/Loader';
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryPosts = () => {
  const [posts,setPosts]= useState([])
  const[isLoading,setIsLoading] =useState(false)

  const {category} = useParams()
  useEffect(()=>{
    const fetchPosts = async () =>{
        setIsLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
          setPosts(response?.data)
        } catch (error) {
          console.log(error)
        }

        setIsLoading(false)
    }
    fetchPosts();
  },[category])
  if(isLoading){
    return<Loader/>
  }
return (
  <section className='posts'>
      {posts.length > 0 ?<div className="container posts__container">
      {
          posts.map(({_id:id,category,description,creator,title,thumbnail,createdAt})=> 
          <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title ={title}
          description={description} creator={creator} createdAt ={createdAt}/>)
      }

      </div>:<h2 className='center'>No posts found</h2>}

     
  </section>
  )
}

export default CategoryPosts
