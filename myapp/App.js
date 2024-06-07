import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import axios from 'axios';
import { postBook, deleteBook, putBook } from './api/BookApi';

export default function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const resp = await axios.get('http://192.168.1.54:8000/books/');
      const books = resp.data;
      setBooks(books);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getBooks() {
      await fetchBooks();
    }
    getBooks()
  }, [])

  const handleAddBook = async (book) => {
    if (books.some((el) => el.isbn === book.isbn)) {
      return false;
    }
    const postBookResp = await postBook(book);
    await fetchBooks();
    return true
  }

  const handleDeleteBook = async (isbn) => {
    const result = books.filter((book) => book.isbn === isbn);
    if (result.length > 0) {
      const book = result[0];
      await deleteBook(book);
      await fetchBooks();
    }
  }

  const handleRateBook = async (isbn, rating) => {
    const result = books.filter((book) => book.isbn === isbn);
    if (result.length > 0) {
      const book = result[0];
      await putBook({ ...book, rating });
      await fetchBooks();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BookForm onAddBook={handleAddBook} />
        <BookList
          books={books}
          onDeleteBook={handleDeleteBook}
          onRateBook={handleRateBook}
        />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
});
