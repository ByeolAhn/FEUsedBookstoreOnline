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
    expiryDate,
    postedBy,
    active
  ) {
    this.id = id;
    this.isbn = isbn;
    this.category = category;
    this.title = title;
    this.author = author;
    this.condition = condition;
    this.price = price;
    this.description = description;
    this.expiryDate = expiryDate;
    this.postedBy = postedBy;
    this.active = active;
  }
}
export default BookModel;
