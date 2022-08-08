import React from 'react';
import './Price.css'


const Price = () => {


    return (
        <div className="price-container">
                <div className="price-subcontainer">
                    <div className="prices">
                        <div className="price-details">
                            Mon to Fri Setup Fee<br></br>
                            1 Chair Included<br></br>
                            <span><strong>$129</strong></span><br></br>
                        </div>
                        <img className="offerImg grow grow-left" src='https://res.cloudinary.com/kelp-me/image/upload/v1659967121/Beachchair/big-beach-chair_ltcjuc.png' alt='beachchair'></img>
                    </div>
                    <div className='price-title'>
                        <div className="price-detailHeader1">Solo Setup</div>
                        <div className="price-detailHeader2">1 Chair | Weekly Rate</div>  
                    </div>
                </div>
                <div className="price-subcontainer">
                    <div className="prices">
                        <div className="price-details">
                            Mon to Fri Setup Fee<br></br>
                            1 Umbrella and<br></br>
                            2 Chairs Included<br></br>
                            <span><strong>$299</strong></span><br></br>
                        </div>
                        <img className="offerImg grow grow-center" src='https://res.cloudinary.com/kelp-me/image/upload/v1659967121/Beachchair/big-beach-set_xksrql.png' alt='beachchair'></img>
                    </div>
                    <div className='price-title'>
                        <div className="price-detailHeader1">Couples Setup </div>
                        <div className="price-detailHeader2">Umbrella & 2 Chairs | Weekly Rate</div>
                    </div>
                </div>
                <div className="price-subcontainer">
                    <div className="prices">
                        <div className="price-details">
                            Mon to Fri Setup Fee<br></br>
                            1 Large Umbrella<br></br>
                            5 Chairs Included<br></br>
                            <span><strong>$649</strong></span><br></br>
                        </div>
                        <img className="offerImg grow grow-right" src='https://res.cloudinary.com/kelp-me/image/upload/v1659968048/Beachchair/big-beach-5-chair_k3zrff.png' alt='beachchair'></img>
                    </div>
                    <div className='price-title'>
                        <div className="price-detailHeader1">Family Setup</div>
                        <div className="price-detailHeader2"> Large Umbrella & 5 Chairs | Weekly Rate</div>
                    </div>
                </div>
            </div>
    )


}

export default Price;