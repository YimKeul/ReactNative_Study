import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import MyButton from "./components/MyButton";
import Counter from "./components/Counter";
import EventButton from "./components/EventButton";
import EventInput from "./components/EventInput";





const App = () => {
    return (
        <View style={{
            flex : 1,
            backgroundColor : "#fff",
            alignItems : 'center',
            justifyContent:'center'
        }}>

        <EventButton />
        <EventInput />



        </View>

    )
}

export default App














// export default function App() {
//     // const name = "SeJun";
//     return (
//         <View
//             style={{
//                 flex: 1,
//                 backgroundColor: "white",
//                 alignItems: "center",
//                 justifyContent: "center"
//             }}>


//             {/* <Text style = {styles.text}>My Button component</Text>
//             <Button title="Press me" onPress={() => alert('Simple Button pressed')}/> */}
//             {/* <MyButton title = "Button" onPress={() => alert("props")} />
//             <MyButton title="Button" onPress={() => alert("children")}>Children Props</MyButton>
//             <MyButton onPress={() => alert("default")}/> */}
//             {/* <Counter/> */}
//             <EventButton />
//             <EventInput />
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     text: {
//         alignItems: "center",
//         justifyContent: "center",
//         color: "black",
//         fontSize: 30
//     }
// });
