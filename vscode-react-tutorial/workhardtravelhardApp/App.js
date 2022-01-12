// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState } from "react";
// import { Fontisto } from "@expo/vector-icons";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Alert
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { theme } from "./colors";
// const STORAGE_KEY = "@todos"
// export default function App() {
//   const [working, setWorking] = useState(true);
//   const [text, setText] = useState("");
//   const [todos, setToDos] = useState({});

//   const travel = () => setWorking(false);
//   const work = () => setWorking(true);

//   const onChangeText = (payload) => setText(payload);

//   useEffect( () =>{
//     loadTodos()
//   },[])

//   const saveTodos = async (toSave) =>{
//     const s = JSON.stringify(toSave)
//     await AsyncStorage.setItem(STORAGE_KEY,s)
//   }

//   const loadTodos = async ()=>{
//     const s = await AsyncStorage.getItem(STORAGE_KEY)
//     // JSON.parse(s)
//     setToDos(JSON.parse(s))
//   }

//   const addToDo = async () => {
//     if (text === "") {
//       return;
//     }
//     //save to do
//     const newToDos = {...todos,  [Date.now()]: { text, working }}
//     setToDos(newToDos)
//     await saveTodos(newToDos)
//     setText("");
//   };

//   const deleteToDo = (key) => {
//     Alert.alert("Delete To Do", "Are you sure?", [
//       { text: "Cancel" },
//       {
//         text: "I'm Sure",
//         style: "destructive",
//         onPress: () => {
//           const newToDos = { ...todos };
//           delete newToDos[key];
//           setToDos(newToDos);
//           saveTodos(newToDos);
//         },
//       },
//     ]);
//   };

//   // console.log(todos)
//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />

//       <View style={styles.header}>
//         <TouchableOpacity onPress={work}>
//           <Text
//             style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
//           >
//             Work
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={travel}>
//           <Text
//             style={{
//               ...styles.btnText,
//               color: !working ? "white" : theme.grey,
//             }}
//           >
//             Travel
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <TextInput
//         onSubmitEditing={addToDo}
//         onChangeText={onChangeText}
//         value={text}
//         returnKeyType="done"
//         placeholder={working ? "Add a To Do" : "Where do you want to go?"}
//         style={styles.input}
//         // keyboardType="email-address"
//       />
//       <ScrollView>
//       {Object.keys(todos).map((key) => (
//          todos[key].working === working ? ( <View style={styles.toDo} key={key}>
//             <Text style={styles.toDoText}>{todos[key].text}</Text>

//             <TouchableOpacity onPress={() => deleteToDo(key)}>
//                 <Fontisto name="trash" size={18} color='white' />
//               </TouchableOpacity>
//               {/* <Text>testing</Text> */}
//           </View>) : undefined
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.bg,
//     paddingHorizontal: 20,
//     // backgroundColor:'blue'
//   },
//   header: {
//     justifyContent: "space-around",
//     flexDirection: "row",
//     marginTop: 20,
//     // backgroundColor:"red"
//   },
//   btnText: {
//     fontSize: 38,
//     fontWeight: "600",
//   },
//   input: {
//     backgroundColor: "white",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     marginVertical: 30,
//     fontSize: 18,
//   },
//   toDo: {
//     backgroundColor: theme.grey,
//     marginBottom: 10,
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     borderRadius: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   toDoText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "500",
//   },
// });

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platformm,
  Modal,
  Button,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
const CATEGORY_KEY = "@category";
const HEIGHT = Dimensions.get("screen").height;

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
    getCategory();
  }, []);

  const changeCategory = () => {
    setWorking((prev) => !prev);
    saveCategory();
  };

  //text 입력값 받기
  const onChangeText = (payload) => setText(payload);

  //저장
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  //불러오기
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) {
      setToDos(JSON.parse(s));
    }
  };

  //이전 상태값 저장
  const saveCategory = async () => {
    await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(working));
  };

  //상태값 불러오기
  const getCategory = async () => {
    const prevCategory = await AsyncStorage.getItem(CATEGORY_KEY);
    setWorking(JSON.parse(prevCategory));
  };

  //추가
  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, working, isComplete: false },
    });
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  //삭제
  const deleteToDo = (key) => {
    if (Platform.OS === "web") {
      const ok = confirm("Do you want to delete this To Do?");
      if (ok) {
        const newToDos = { ...toDos };
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(newToDos);
      }
    } else {
      Alert.alert("Delete To Do?", "Are You sure?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "I'm Sure",
          style: "destructive",
          onPress: () => {
            const newToDos = { ...toDos };
            delete newToDos[key];
            setToDos(newToDos);
            saveToDos(newToDos);
          },
        },
      ]);
    }
  };

  //완료
  const toggleCompleteToDo = (key) => {
    let newToDo = { ...toDos };
    newToDo[key].isComplete = !newToDo[key].isComplete;
    setToDos(newToDo);
    saveToDos(newToDo);
  };


	const [edit,setEdit] = useState("")

	const changetext2 = (edit) =>{
		setEdit(edit)
	}
	const subming = () =>{
		setEdit(edit)
	}
	const click_b = () =>{
		setEdit(edit)
	}

  //수정
  const editToDo = (key) => {
    // if (Platform.OS === "web") {
    //   const val = prompt("How Do you want Change This Text??");
    //   let newToDo = { ...toDos };
    //   newToDo[key].text = val;
    //   setToDos(newToDo);
    //   saveToDos(newToDo);
    // } else {
    //   Alert.prompt(
    //     "Change Text",
    //     "How Do you want Change This Text??",
    //     (val) => {
    //       let newToDo = { ...toDos };
    //       newToDo[key].text = val;
    //       setToDos(newToDo);
    //       saveToDos(newToDo);
    //     }
    //   );
    // }
		console.log(setEdit)
		return
    let newToDo = { ...toDos };
    newToDo[key].text = val;
    setToDos(newToDo);
    saveToDos(newToDo);

  };


  const [modalVisible, setModalVisible] = useState(false);
  const MODAL_HEI = HEIGHT / 4;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={changeCategory}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: "600",
              color: working ? "white" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeCategory}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: "600",
              color: working ? theme.grey : "white",
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          value={text}
          onSubmitEditing={addTodo}
          onChangeText={onChangeText}
          placeholder={
            working ? "What do you have to do?" : "Where do you want go?"
          }
          style={styles.input}
        />
      </View>
      <ScrollView>
        {toDos
          ? Object.keys(toDos).map((key) =>
              toDos[key].working === working ? (
                <View style={styles.toDo} key={key}>
                  <Modal
                    visible={modalVisible}
                    animationType="fade"
                    transparent={true}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        height: MODAL_HEI,
                        marginTop: "60%",
                      }}
                    >
                     
                    <TextInput placeholder={"here"} onChangeText={changetext2} />
                      <Button
                        title="out"
                        onPress={() => setModalVisible(!modalVisible)}
                      />
                      <Button title="ok" onPress={click_b} />
											<Text>1 : {edit}</Text>
											{/* <Text>{edit}</Text> */}
                    </View>
                  </Modal>
                  <Text
                    style={
                      toDos[key].isComplete
                        ? {
                            ...styles.toDoText,
                            textDecorationLine: "line-through",
                          }
                        : styles.toDoText
                    }
                  >
                    {toDos[key].text}
                  </Text>
                  <View
                    style={{ justifyContent: "flex-end", flexDirection: "row" }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 15 }}
                      onPress={() => deleteToDo(key)}
                    >
                      <Fontisto name="trash" size={18} color="white" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ marginRight: 15 }} onPress={() => editToDo(key)}> */}
                    <TouchableOpacity
                      style={{ marginRight: 15 }}
                      onPress={() => setModalVisible(true)}
                    >
                      <FontAwesome5 name="pencil-alt" size={18} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleCompleteToDo(key)}>
                      <Fontisto
                        name={
                          toDos[key].isComplete
                            ? "checkbox-active"
                            : "checkbox-passive"
                        }
                        size={18}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            )
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {},
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
    marginVertical: 20,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
