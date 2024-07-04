export const getUserRating = (userId, ratings) => {
    const userRating = ratings.find(rating => rating.user._id === userId);
    return userRating ? userRating.rating : -1;
  };