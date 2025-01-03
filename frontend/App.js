import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image} from "react-native";
import axios from 'axios';  
import LinearGradient from "react-native-web-linear-gradient";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Function to load the TODO list from the firebase backend
  useEffect(() => {
    axios.get('http://localhost:3001/load')  
      .then(response => {
        const todos = Object.values(response.data);  
        setTodoList(todos);
      })
      .catch(error => console.error("Error loading TODOs:", error));
  }, []); 

  // Function to add a new TODO list 
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodoList([...todoList, newTodo]);
    setNewTodo("");
  };

  // Function to delete a TODO list
  const deleteTodo = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };

  // Function to edit a TODO list
  const editTodo = (index) => {
    setNewTodo(todoList[index]);
    setEditingIndex(index);
  };

  // Function to restore the TODO list
  const restoreTodoList = () => {
    axios.get('http://localhost:3001/load')
      .then(response => setTodoList(Object.values(response.data)))
      .catch(error => console.error("Error restoring TODOs:", error));
  };

  // Function to save the TODO list to the firebase backend
  const saveTodoList = () => {
    console.log('Sending todo list:', todoList);
    axios.post('http://localhost:3001/save', todoList)  
      .then(() => alert("TODO list saved"))
      .catch(error => console.error("Error saving TODOs:", error));
  };

  // Function to clear the TODO list from both state and backend
  const clearTodoList = () => {
    axios.get('http://localhost:3001/clear')  
      .then(() => setTodoList([]))  
      .catch(error => console.error("Error clearing TODOs:", error));
  };

  // Function to save edited TODO
  const saveEdit = () => {
    if (newTodo.trim() === "") return;
    const updatedList = [...todoList];
    updatedList[editingIndex] = newTodo;
    setTodoList(updatedList);
    setNewTodo("");
    setEditingIndex(null);
  };


  // Button styles is a copy from this website: https://blog.logrocket.com/create-style-custom-buttons-react-native/
  const GradientButton = ({ title, onPress }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => setIsHovered(true)} 
        onPressOut={() => setIsHovered(false)} 
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={isHovered ? ["#00796b", "#004d40"] : ["#004d40", "#009688"]}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO List</Text>

      <View style={styles.buttonsContainer}>
       
          <GradientButton   title="Save" onPress={saveTodoList} />
          <GradientButton   title="Restore" onPress={restoreTodoList} />
          <GradientButton   title="Clear" onPress={clearTodoList} />
     
      </View>

      <View style={{flexDirection: 'row'}}>
      <TextInput
              style={styles.input}
              value={newTodo}
              onChangeText={setNewTodo}
              placeholder="Enter a new task"
            />

            <View style={styles.CenterContainer}>
              <GradientButton
                title={editingIndex === null ? "Add" : "Edit"}
                onPress={editingIndex === null ? addTodo : saveEdit}
              />
            </View>
      </View>
      
      

      <FlatList
      data={todoList}
      renderItem={({ item, index }) => (
        <View style={styles.todoItem}>
          <Text style={styles.todoText}>{String(item)}</Text> 
          <View style={styles.todoActions}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => editTodo(index)} style={styles.iconButton}>
                <Image style={styles.icons} source={require('./edit.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(index)} style={styles.iconButton}>
                <Image style={styles.icons} source={require('./delete.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()} 
    />


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  CenterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: '80%',
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    padding: 20,
    marginBottom: 20, 
  },  
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff', 
    borderRadius: 5,        
    marginVertical: 5,     
  },  
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  todoActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 5, 
  },
  icons: {
    width: 20,
    height: 20,
  },
  buttonWrapper: {
    borderRadius: 20, 
    overflow: "hidden",
    
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: '100px',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

