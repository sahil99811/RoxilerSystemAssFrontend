export const getAverageRating = (ratings) => {
    if (ratings?.length === 0) return 0;
    const total = ratings?.reduce((sum, rating) => sum + rating.rating, 0);
    return (total / ratings?.length).toFixed(1); // Rounded to 1 decimal place
  };