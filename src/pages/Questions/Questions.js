import React, {useState, useEffect} from 'react';
import "./Questions.css"
import {addQuestionToPlayer} from "../../firebase/database2";
import { View } from "react-native";

function Questions() {
    const [state, setState] = React.useState({
        question: "",
        answer1: "",
        answer2: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (evt) => {
        const value = evt.target.value
        setState({
            ...state,
            [evt.target.name]: value
        })
    }

    const readyButtonClick = () => {
        const current_player_id = JSON.parse(localStorage.getItem("player_data"))
        const current_room_id = JSON.parse(localStorage.getItem("room_id"));  
        console.log("CUR PLA ", current_player_id) 
        console.log("CUR ROOM: ", current_room_id)
        addQuestionToPlayer(current_room_id, current_player_id, state.question, state.answer1, state.answer2)
    }

    const adjustFontSize = () => {
        const question_length = state["question"].length
        const answer1_length = state["answer1"].length
        const answer2_length = state["answer2"].length

        const fontSize_question = 3.8 - question_length*0.009
        const fontSize_answer1 = 2.3 - answer1_length*0.009
        const fontSize_answer2 = 2.3 - answer2_length*0.009
        document.getElementById("question").style.fontSize = fontSize_question+'vw'
        document.getElementById("answer1").style.fontSize = fontSize_answer1+'vw'
        document.getElementById("answer2").style.fontSize = fontSize_answer2+'vw'
    }

    useEffect(() => {
        adjustFontSize()
    }, [state])

    return (
        <div className="mainLayout">
            <View
                style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
            <h1 style={{fontSize: 40, fontWeight: "bold"}}> Questions </h1>
            <div className="questions">
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        name="question"
                        placeholder="Enter your Question"
                        className = "question_input"
                        onChange={handleChange}
                        value={state.question}
                        id="question"
                    />
                    <View
                        style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 20,
                        paddingBottom: 20,
                        }}
                    >
                    <textarea
                        type="text"
                        name="answer1"
                        placeholder="Answer 1"
                        className = "answer_input1"
                        onChange={handleChange}
                        value={state.answer1}
                        id="answer1"
                    />
                    <textarea
                        type="text"
                        name="answer2"
                        placeholder="Answer 2"
                        className = "answer_input2"
                        onChange={handleChange}
                        value={state.answer2}
                        id="answer2"
                    />
                    </View>
                    <button className="question_submit" type="submit" value="submit" onClick={readyButtonClick}>
                        Ready
                    </button>
                </form>
            </div>
            </View>
        </div>

    );
}

export default Questions;