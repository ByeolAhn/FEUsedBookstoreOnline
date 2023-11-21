class booksModel {
  constructor(
    id,
    isbn,
    category,
    title,
    author,
    condition,
    price,
    description
  ) {
    this.id = id;
    this.isbn = isbn;
    this.category = category;
    this.title = title;
    this.author = author;
    this.condition = condition;
    this.price = price;
    this.description = description;
  }
}
export default booksModel;
