import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl
} from 'react-native'
import Oops from "./Oops.png"
const API_URL = "https://fudap-books-api.herokuapp.com/books/"
export const Home = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(true);
  const [value, setValue] = useState("");

  const [Refreshing, setRefreshing]= useState(false)

  const getBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setBooks(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  
  useEffect(() => {
    getBooks();
  }, []);

  const onRefresh =()=>{
    setRefreshing(true);
    getBooks();
    setRefreshing(false);
  }
  

  const book_length = books.length;
  const handleSearchBar = () => {
    setSearch(!search)
    setValue("")
  }

  return (
    <View style={styles.body}>
      <StatusBar
        animated={true}
        backgroundColor="#fa7b32" />
      {isLoading ? <Text style={styles.loading_text}>Loading Books!!!!</Text> :
        <View style={styles.bookmarks_container} >
          <Text style={styles.bookmarks_text}>Bookmarks</Text>
          <View style={styles.books_container}>
            <Text style={styles.books}>{book_length} Books</Text>
            {search ?
              <TouchableOpacity
                title="Search"
                style={styles.search_button}
                onPress={handleSearchBar}
                activeOpacity={1}>
                <Text style={styles.text}>Search</Text>
              </TouchableOpacity> : <View style={styles.search_container}>
                <TextInput style={styles.input}
                  placeholder="Enter the book Tittle "
                  onChangeText={(value) => setValue(value)}
                />
                <TouchableOpacity
                  style={styles.close_button}
                  onPress={handleSearchBar}
                  activeOpacity={1}
                >
                  <AntDesign name="closecircleo" size={34} color="black" />
                </TouchableOpacity>
              </View>}
          </View>
        </View>}

      {/* List of Books in a FlatList */}
      {isLoading ? <ActivityIndicator testID="loading" and accessibilityLabel="App is loading books" /> : (
        <FlatList
          accessibilityLabel="books"
          data={books}
          numColumns={2}
          refreshControl={
            <RefreshControl
            refreshing={Refreshing}
            onRefresh={onRefresh}
            colors={["#fa7b32"]}
            />
          }
          renderItem={({ item }) => (
            <>
              {!search && value.length > 0 && item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ?
                <TouchableOpacity testID="book" key={item} style={styles.image_container}
                  onPress={() => {
                    navigation.navigate("Book", { item, book_length })
                  }}
                >
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.image}
                    resizeMode="stretch"
                  />
                  <Text style={styles.book_title}>{item.title}</Text>
                </TouchableOpacity> : ""}
              {search || value.length <= 0 ? <TouchableOpacity testID="book" key={item} style={styles.image_container}
                onPress={() => {
                  navigation.navigate("Book", { item, book_length })
                }}
              >
                <Image
                  source={{ uri: item.imgUrl }}
                  style={styles.image}
                  resizeMode="stretch"
                />
                <Text style={styles.book_title}>{item.title}</Text>
              </TouchableOpacity> : ""}
            </>
          )}
        >
        </FlatList>)}
      {!search && value.length > 0 ?
        <View style={{marginBottom:150,alignItems: "center", justifyContent: "center" }}>
          <Image
            source={Oops}
            style={styles.oops}
          />
         <View style={{flexDirection:"row"}}>
         <Text style={{fontSize:25, textAlign:"center"}}>{value} </Text>
          <Text style={{fontSize:25, textAlign:"center", fontWeight:"bold"}}>Not Found!!!</Text>
         </View>
        </View> : ""}
        {!isLoading && book_length==0 ?
        <View style={{marginBottom:150,alignItems: "center", justifyContent: "center" }}>
          <Image
            source={Oops}
            style={styles.oops}
          />
          <Text style={{fontSize:25, textAlign:"center"}}>No Book Found!!!</Text>
          <Text style={{fontSize:25, textAlign:"center", fontWeight:"bold"}}>Check Your Internet Connection</Text>
        </View> : ""}
    </View>)

}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1'
  },
  bookmarks_container: {
    padding: 10,
  },
  bookmarks_text: {
    fontSize: 40,
    fontWeight: "bold"
  },
  loading_text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15
  },
  books_container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  books: {
    color: "#a39f9d",
    fontSize: 20
  },
  search_button: {
    backgroundColor: "#fa7b32",
    borderRadius: 20,
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 25,
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 6,
    fontWeight: "semibold"
  },
  search_container: {
    flexDirection: "row",
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    height: 35,
    textAlign: "center",
  },
  close_button: {
    marginLeft: 10
  },
  oops: {
    height: 300,
    width: 200,
  },

  //Flatlist and its subcomponents styles
  image_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 10
  },
  image: {
    width: 170,
    height: 200,
    borderRadius: 10,
  },
  book_title: {
    fontSize: 20
  }

});
