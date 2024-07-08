const bookCollection = require("../../Modals/Books");

const queries = {
  fetchAllBooks: async () => {
    const data = await bookCollection.find();
    return data;
  },

  fetchSingleBook: async (_parent, { id }) => {
    const data = await bookCollection.findById(id);
    return data;
  },
};

const mutations = {
  addNewBook: async (_, { title, author, summary, category, image, price }) => {
    if (!title || !author || !summary || !category || !image || !price) {
      return {
        success: false,
        message: "Missing Data. Fill all fields",
        statusCode: 422,
      };
    }

    const existingBook = await bookCollection.findOne({
      author,
      title,
      category,
      price,
    });

    if (existingBook) {
      return {
        success: false,
        message: "Book is already added",
        statusCode: 422,
      };
    }

    const newInstance = new bookCollection({
      title,
      author,
      summary,
      category,
      image,
      price,
    });

    await newInstance.save();

    return {
      success: true,
      message: "Data added successfully",
      statusCode: 201,
    };
  },

  deleteBookFromDatabase: async (_parent, { id }) => {

    const isBook = await bookCollection.findById(id);

    if(!isBook){
      return {
        success : false,
        message : "No book found",
        statusCode : 400, 
      }
    }

    await bookCollection.findByIdAndDelete(id);

    return {
      success: true,
      message: "Deleted Successfully",
      statusCode: 200,
    };
  },

  addDiscount : async (_parent , {id , discount}) => {
    if(!discount) {
      return {
        success : false,
        message : "Discount field is empty",
        statusCode : 422,
      }
    }

    const isBook = await bookCollection.findById(id);

    if(!isBook){
      return {
        success : false,
        message : "No book found",
        statusCode : 422,
      }
    }

    const updateData = await bookCollection.findByIdAndUpdate(
      isBook._id,
      {discount : discount},
      {$set : true} 
    )

    await updateData.save();

    return {
      success : true,
      message : "Discount added successfully",
      statusCode : 200
    }
  }

};

const resolvers = { queries, mutations };

module.exports = resolvers;
