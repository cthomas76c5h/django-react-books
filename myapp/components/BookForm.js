import { useState } from 'react';
import { TextInput, Pressable, View, Text } from 'react-native';

export default function BookForm({ onAddBook }) {
  const [isbn, setIsbn] = useState('')
  const isValidISBN = (isbn) => /^[0-9]{10,13}$/.test(isbn);
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!isValidISBN(isbn)) {
        return alert("Please enter a valid ISBN");
    }
    try {
      const resp = await fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
      );
      const bookJson = await resp.json();
      const bookData = bookJson[`ISBN:${isbn}`];
      const book = {
        isbn: isbn,
        title: bookData.title ? bookData.title : 'Untitled',
        author: bookData.authors ? bookData.authors[0].name : 'Unknown author',
        cover: bookData.cover ? bookData.cover.medium : 'assets/No_Cover.jpg',
        rating: 0,
      }
      const ok = onAddBook(book);
      if (ok === false) {
        alert("ISBN already exists");
      }
    } catch (e) {
      console.log(e);
      alert("Error fetching book data");
    }
    setIsbn('');
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setIsbn(value);
  };

  return (
    <View>
      <TextInput value={isbn} onChangeText={newIsbn => setIsbn(newIsbn)}
                 placeholder='Enter ISBN' maxLength={17} required />
      <Pressable onPress={handleAddBook}>
        <Text>Add Book</Text>
      </Pressable>
    </View>
  );
}
