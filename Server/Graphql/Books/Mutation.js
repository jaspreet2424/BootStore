const mutations = `
    addNewBook(title : String! , author : String! , summary : String! , category : String! , image : String! , price : Float!) : Response
    deleteBookFromDatabase(id : ID!) : Response
    addDiscount(id : ID! , discount : Float!) : Response
`;

module.exports = mutations;
