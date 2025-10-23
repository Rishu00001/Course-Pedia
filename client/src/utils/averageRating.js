 export const calculateAverageRating = (reviews)=>{
    if(!reviews || reviews.length ===0) return 0;
    const reviewsLength = reviews.length;
    const total = reviews.reduce((sum,review)=>sum + review.rating,0);
    const average =  (total / reviews.length).toFixed(1);
    return {average, reviewsLength};
  }