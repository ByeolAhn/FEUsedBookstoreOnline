class BookModel
{
    constructor(isbn, category, title, author, condition, price, description){
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.condition = condition;
        this.price = price;
        this.description = description;
    }
}

export default BookModel;