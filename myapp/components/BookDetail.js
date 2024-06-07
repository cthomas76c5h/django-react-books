import { StyleSheet, Pressable, View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const NoCoverImage = require('../assets/No_Cover.jpg');

export default function BookDetail({ book, onDeleteBook, onRateBook }) {
    return (
        <View>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.isbn}</Text>
            <View style={styles.imageContainer}>
                <Image source={book.cover === 'No Cover' ? NoCoverImage : {uri: book.cover}} style={styles.image} />
            </View>
            <Picker
            selectedValue={book.rating.toString()}
            onValueChange={newRating => onRateBook(book.isbn, parseInt(newRating))}>
            <Picker.Item label="No rating" value="0" />
            <Picker.Item label="⭐" value="1" />
            <Picker.Item label="⭐⭐" value="2" />
            <Picker.Item label="⭐⭐⭐" value="3" />
            <Picker.Item label="⭐⭐⭐⭐" value="4" />
            <Picker.Item label="⭐⭐⭐⭐⭐" value="5" />
            </Picker>
            <Pressable style={styles.button} onPress={() => onDeleteBook(book.isbn)}>
                <Text style={styles.text}>Delete</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    padding: 5,
  },
  image: {
    width: 250,
    height: 350,
    borderRadius: 10,
    margin: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    margin: 10,
    padding: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#e83333',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
