import { useState } from 'react';
import { TextInput, Pressable, View, Text, StyleSheet } from 'react-native';

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
        cover: bookData.cover ? bookData.cover.medium : 'No Cover',
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
      <TextInput style={styles.textInput} value={isbn} onChangeText={newIsbn => setIsbn(newIsbn)}
                 placeholder='Enter ISBN' maxLength={17} required />
      <Pressable style={styles.button} onPress={handleAddBook}>
        <Text style={styles.text}>Add Book</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
