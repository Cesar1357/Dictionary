import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Header} from 'react-native-elements';

export default class App extends React.Component {
  constructor(){
    super();
      this.state={
        text:"",
        isSearchPressed:false,
      } 
  }

  getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200){
        return data.json()
      }
      else{
        return null
      }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition=wordData.description
        var lexicalCategory=wordData.wordtype

        this.setState({
          "word" : this.state.text,
          "definition" : definition,
          "lexicalCategory":lexicalCategory
        })
      }
      else{
        this.setState({
          "word":this.state.word,
          "definition":"Not Found"
        })
      }
    })
  }
render(){
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
          <Header
          backgroundColor={'black'}
          centerComponent={{
            text:'Dictionary',
            style:{color:'white',fontSize:22},
          }}/>
        
        <TextInput style={styles.inputbox}
        onChangeText={(text)=>{
        this.setState({
          text:text
        });
        }}
        value={this.state.text}/>
        <TouchableOpacity style={styles.sendbutton} onPress={()=>{
          this.setState({
            displaytext:this.state.text
          });
          this.setState({ isSearchPressed:true })
          this.getWord(this.state.text)
        }}> 
        <Text style={styles.textbutton}>Search</Text>
        </TouchableOpacity>
        
        <View style={styles.detailsC,{marginTop:50}}>
          <Text style={styles.detailsT}>
            Word:{""}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.word}
          </Text>
        </View>

        <View style={styles.detailsC}>
          <Text style={styles.detailsT}>
            Type:{""}
            </Text>
            <Text style={{fontSize:18}}>
          {this.state.lexicalCategory}
          </Text>
        </View>

        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
          <Text style={styles.detailsT}>
            Definition:{""}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.definition}
          </Text>
        </View>
        </SafeAreaProvider>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputbox:{
    width:"80%",
    alignSelf:'center',
    height:40,
    textAlign:'center',
    borderWidth:4,
    marginTop:50,
    fontWeight:'bold',
    fontSize:22,
  },
  sendbutton:{
    width:120,
    height:40,
    alignSelf:'center',
    backgroundColor:"white",
    borderRadius:10,
    borderWidth:2,
    marginTop:5,
  },
   textbutton:{
    textAlign:'center',
    fontSize:25,
    color:"black",
    fontWeight:'bold',
  },
  detailsC:{
    alignContent:'center'
  },
  detailsT:{
     fontSize:20,
     color:"orange",
     fontWeight:"bold",
  }
});
