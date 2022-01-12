import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { viewStyles , textStyles } from "./styles";
import { Header, Contents, Footer } from "./components/Layout"
import ShadowBox from "./components/ShadowBod"
import styled from "styled-components/native";
import Button from "./components/Button";

const Container = styled.View `
  flex : 1;
  background-color : #ffffff;
  align-items : center;
  justify-content : center;
`;
const App = () => {
  return (
    <Container>
      <Button title = "Hanbit" />
      <Button title = "React Native" />
      
    </Container>
  )}
export default App;

//  //4.1.1
//  <View style = {{
//   flex : 1,
//   backgroundColor : "#fff",
//   alignItems : 'center',
//   justifyContent: 'center'

// }}>
//   <Text style = {{
//     padding : 10,
//     fontSize : 26,
//     fontWeight : '600',
//     color : 'black'
//   }}>
//     Inline Styling - Text
//   </Text>

//   <Text style = {{
//     padding : 10,
//     fontSize : 26,
//     fontWeight:'600',
//     color : 'red'
//   }}>
//     Inline Styling - Error
//   </Text>

// </View>



// return (
//   //4.1.2
//   <View style={styles.contaioner}>
//     <Text style={styles.text}>Inline Styling - Text</Text>
//     <Text style={styles.error}>Inline Styling - Error</Text>
//   </View>
// );
// };

// const styles = StyleSheet.create({
// contaioner: {
//   flex: 1,
//   backgroundColor: "#fff",
//   alignItems: "center",
//   justifyContent: "center",
// },
// text: {
//   padding: 10,
//   fontSize: 26,
//   fontWeight: "600",
//   color: "black",
// },

// error: {
//   padding: 10,
//   fontSize: 26,
//   fontWeight: "400",
//   color: "red",
// },
// });



    //4.1.3
//     <View style={styles.contaioner}>
//       <Text style={styles.text}>Inline Styling - Text</Text>
//       <Text style={[styles.text,styles.error]}>Inline Styling - Error</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   contaioner: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     padding: 10,
//     fontSize: 26,
//     fontWeight: "600",
//     color: "black",
//   },

//   error: {
//     fontWeight: "400",
//     color: "red",
//   },
// });


    // //4.1.4
    // <View style = {viewStyles.container}>
    //   <Text style = {[textStyles.text, {color : 'green'}]}>
    //     Inline Styling - Text
    //   </Text>
    //   <Text style = {[textStyles.text, textStyles.error]}>
    //   Inline Styling - Error
    //   </Text>
    // </View>


    //flex
  //   <View style = {viewStyles.container}>
  //   <Header/>
  //   <Contents/>
  //   <Footer/>
    
  // </View>

  //4.2.3 그림자
//   <View style ={viewStyles.container}>
//   <ShadowBox />
// </View>