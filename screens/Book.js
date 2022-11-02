import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export const Book = ({ route }) => {
  const { item, book_length } = route.params;
  const date = `${item.published}`;
  const published = date.substring(0, 10)
  return (
    <ScrollView>
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: item.imgUrl }}
        resizeMode="stretch"
        imageStyle={{ borderBottomRightRadius: 175, borderBottomLeftRadius: 175 }}
      >
        <LinearGradient
          colors={['#6c5ce7', '#ffeaa7','#bec5d1']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5, 0.6]}
          style={styles.container} >

          <View style={styles.image_container} >
            <Image
              source={{ uri: item.imgUrl }}
              style={styles.image}
              resizeMode="stretch"
            />
            <Text style={{ fontSize: 25, fontWeight: "bold", marginVertical: 10, textAlign: "center", borderBottomWidth: 2, marginHorizontal: 15, }}>{item.title}</Text>
            <View style={{ flexWrap:"wrap", marginHorizontal: 5, justifyContent:"center", marginBottom:10,flexDirection: "row" }}>
              <Text style={{  fontWeight: "bold", fontSize: 22, textAlign: "center" }} >Author: </Text>
              <Text style={{ fontSize: 23, textAlign: "center" }}> {item.author}</Text>
            </View>
            <View style={{ flexWrap:"wrap", marginHorizontal: 5, justifyContent:"center", marginBottom:10,flexDirection: "row" }}>
              <Text style={{  fontWeight: "bold", fontSize: 22, textAlign: "center" }} >Published On: </Text>
              <Text style={{ fontSize: 23, textAlign: "center" }}> {published}</Text>
            </View>
            <View style={{ flexWrap:"wrap", marginHorizontal: 5, justifyContent:"center", marginBottom:10,flexDirection: "row" }}>
              <Text style={{  fontWeight: "bold", fontSize: 22, textAlign: "center" }} >Publisher: </Text>
              <Text style={{ fontSize: 23, textAlign: "center" }}> {item.publisher}</Text>
            </View>
            <View style={{ flexWrap:"wrap", marginHorizontal: 5, justifyContent:"center", marginBottom:10,flexDirection: "row" }}>
              <Text style={{  fontWeight: "bold", fontSize: 22, textAlign: "center" }} >Number of Pages: </Text>
              <Text style={{ fontSize: 23, textAlign: "center" }}> {item.pages}</Text>
            </View>
            <View style={{ flexWrap:"wrap", marginHorizontal: 5, justifyContent:"center", flexDirection: "row" }}>
              <Text style={{ fontSize: 23, textAlign: "center" }} >Book</Text>
              <Text style={{ fontSize: 22, textAlign: "center",fontWeight: "bold", }}> {item.id} </Text>
              <Text style={{ fontSize: 23, textAlign: "center" }} > of {book_length}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      {item.subtitle?<View style={{ borderBottomWidth: 2, marginHorizontal: 15, marginTop: 5 }} >
        <Text style={{ fontSize: 26, textAlign: "center", marginVertical: 5, fontWeight: "600" }} >{item.subtitle}</Text>
      </View>:""}
      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
        <Text style={{ fontSize: 21, textAlign: "justify" }}>{item.description}</Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  imageBackground: {
    paddingBottom: 4

  },
  container: {
    flex: 1,
    paddingBottom: 10,
    opacity: 0.95,
    borderBottomLeftRadius: 175,
    borderBottomRightRadius: 175
  },
  image_container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 300,
    borderRadius: 10,
  },


})
