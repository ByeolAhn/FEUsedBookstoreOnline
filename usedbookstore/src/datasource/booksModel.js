class BookModel {
  constructor(
    id,
    isbn,
    category,
    title,
    author,
    condition,
    price,
    description,
    expiryDate // Add the expiryDate field
  ) {
    this.id = id;
    this.isbn = isbn;
    this.category = category;
    this.title = title;
    this.author = author;
    this.condition = condition;
    this.price = price;
    this.description = description;
    this.expiryDate = expiryDate; // Assign the expiryDate field
  }
}
export default BookModel;
