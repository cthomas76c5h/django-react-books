import { View } from 'react-native';
import BookDetail from './BookDetail';

export default function BookList({ books, onDeleteBook, onRateBook }) {
    return (
        <View>
            {books.map(book => (
                <BookDetail
                key={book.id}
                book={book}
                onDeleteBook={onDeleteBook}
                onRateBook={onRateBook}
            />
            ))}
        </View>
    );
}
