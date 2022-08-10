import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReview, getReviews } from '../../store/review';


function ReviewNote() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {userId} = useParams()
    console.log('test1',userId)
    const [del, setDel] = useState([])

    const userNum = Number(userId)
    const reviews = Object.values(useSelector(state => state?.review))
    const myReview = reviews?.filter(function(review){
        return review.id === userNum;
    })
   
    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        dispatch(getReviews());
    },[dispatch])


    const handleContinue = () => {
        history.push(`/users/${user.id}`)
    }

    // window.location.reload(false);
    const deleteThisReview = async (id) => {
        setDel([...del, 1])
        await dispatch(deleteReview(id))
        await dispatch(getReviews());
        // forceUpdate();
        history.push(`/users/${user.id}`)
      }
    
    

    return (

        <div className='form-container'>
            <div className='form-container delete-container'>

                <h2 className='login-welcome1' >Are You Sure You Want To Delete This Review For</h2>
                {myReview[0] && (<h2 className='delete-info' >{myReview[0].location}</h2>)}
                <button className='demoBtn' onClick={() => deleteThisReview(userId)}>YES</button>
                <button className='demoBtn deleteNoBtn' onClick={() => handleContinue()}>NO</button>
            
            </div>
        </div>

    );
}

export default ReviewNote;