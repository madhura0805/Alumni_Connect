import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import {Link , useNavigate,useLocation} from 'react-router-dom'
import Loader from '../components/Blogs/Loader';

const DeletePost = ({postId:id}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading , setIsLoading] = useState(false);

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;

    const removePost = async ()=>{
      setIsLoading(true)
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials:true
          ,headers : {Authorization: `Bearer ${token}`}
        })

        if(response.status == 200){
          if(location.pathname == `myposts/${currentUser.id}`){
            navigate(0)
          }else{
            navigate('/')
          }

        }
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    if(isLoading){
      return <Loader/>
    }
  return (
    <div>
      <Link className ='btn sm danger' onClick={()=>{
        removePost(id)
      }}> Delete</Link>
    </div>
  )
}

export default DeletePost
