const paginations = async (limit, page, Model) => {
  try {
    const totalProducts = await Model.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const pagination = {
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
      totalPages: totalPages,
      totalProducts: totalProducts,
    };

    return pagination;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = paginations;
