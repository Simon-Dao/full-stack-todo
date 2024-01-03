import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore'
import { API_KEY } from "./config.js";
import express from 'express'
import bodyParser from "body-parser";
import fs from 'fs'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "todo-24f11.firebaseapp.com",
    projectId: "todo-24f11",
    storageBucket: "todo-24f11.appspot.com",
    messagingSenderId: "1064541456593",
    appId: "1:1064541456593:web:b68feebcddf7376b1d1df0",
    measurementId: "G-EXVNKK6GLF"
};

//Initialize firebase
initializeApp(firebaseConfig);
const db = getFirestore()
const colRef = collection(db, 'todos')

// Create an Express application
const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

//Load project configuration
const projectConfigPath = '../project-config.json';
const projectConfigJSON = JSON.parse(fs.readFileSync(projectConfigPath))

//Routes

//Delete item
server.delete('/items/delete/:itemID', async (req, res) => {
    try {
        const itemID = req.params.itemID
        const docRef = doc(db, 'todos', itemID)
        deleteDoc(docRef)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
})

//Add item
server.put('/items/add/:itemID', async (req, res) => {
    try {
        const itemID = req.params.itemID
        const value = req.body.value
        setDoc(doc(db, 'todos', itemID), { value: value })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
})

//Get items
server.get('/items/get/', async (req, res) => {
    try {
        const snapshot = await getDocs(colRef)
        const data = snapshot.docs.map(doc => doc.data());
        res.send(data)
    } catch (error) {
        console.error(error)
    }
})

// Start the server on port 3000
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});