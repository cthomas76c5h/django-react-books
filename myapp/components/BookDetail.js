import { StyleSheet, Pressable, View, Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function BookDetail({ book, onDeleteBook, onRateBook }) {
    return (
        <View>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.isbn}</Text>
            <View style={styles.imageContainer}>
                <Image source={book.cover} style={styles.image} />
            </View>
            <Picker
            selectedValue={book.rating}
            onValueChange={newRating => onRateBook(book.isbn, parseInt(newRating))}>
            <Picker.Item label="No rating" value="0" />
            <Picker.Item label="*" value="1" />
            <Picker.Item label="**" value="2" />
            <Picker.Item label="***" value="3" />
            <Picker.Item label="****" value="4" />
            <Picker.Item label="*****" value="5" />
            </Picker>
            <Pressable onPress={() => onDeleteBook(book.isbn)}>
                <Text>Delete</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
