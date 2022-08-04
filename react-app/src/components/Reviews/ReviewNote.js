import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReview, getReviews } from '../../store/review';


function ReviewNote() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {userId} = useParams()
    console.log('test1',userId)

    const handleContinue = () => {
        history.push(`/users/${user.id}`)
    }

    const deleteThisReview = async (id) => {
        await dispatch(deleteReview(id))
        .then(() => getReviews());
        history.push(`/users/${user.id}`)
      }
    
    

    return (

        <div className="review-container">
                <h2 className='user-header' >Are You Sure You Want To Delete This Review</h2>
                <button onClick={() => handleContinue()}>No</button>
                <button onClick={() => deleteThisReview(userId)}>Yes</button>
        </div>

    );
}

export default ReviewNote;