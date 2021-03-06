import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import AuthCheck from '../../Components/AuthCheck';
import Delete from './Components/Delete';
import Edit from './Components/Edit';
import { firestore } from '../../lib/firebase';
import * as t from './types';

const Controllcenter = () => {
  const [focusArea, setFocusArea] = useState('');
  const [digitalCapability, setDigitalCapability] = useState('');
  const [practiceItem, setPracticeItem] = useState('');
  const [edit, setEdit] = useState(false);

  const changeEditState = () => {
    setEdit(!edit);
  };

  const ref = firestore.collection('questions');
  const [data] = useCollection(ref);
  const questions: t.Question[] = [];
  data?.docs.map((doc: t.QuestionDocument) =>
    questions.push({
      id: doc.id,
      focusArea: doc.data().focusArea,
      digitalCapability: doc.data().digitalCapability,
      practiceItem: doc.data().practiceItem,
    }),
  );

  const postQuestion = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const newQuestionRef = firestore.collection('questions').doc();

    const data = {
      focusArea: focusArea,
      digitalCapability: digitalCapability,
      practiceItem: practiceItem,
    };
    await newQuestionRef.set(data);
  };

  return (
    <AuthCheck role="admin">
      <div>
        <h1>Digify - Controll Center</h1>
        <p>
          Here you can add/edit/delete assessment question and view
          statistics
        </p>
        <div>
          <div>
            <form onSubmit={postQuestion}>
              <p>Focus area</p>
              <input
                placeholder="Insert focus area"
                value={focusArea}
                onChange={(e) =>
                  setFocusArea(e.target.value)
                }></input>
              <p>Digital Capability</p>
              <input
                placeholder="Insert digital capability"
                value={digitalCapability}
                onChange={(e) =>
                  setDigitalCapability(e.target.value)
                }></input>
              <p>Practice Item</p>
              <input
                placeholder="Insert practice item"
                value={practiceItem}
                onChange={(e) =>
                  setPracticeItem(e.target.value)
                }></input>
              <button>Create</button>
            </form>
          </div>
          <div>
            <p>Current Questions:</p>
            {questions?.map((question, i) => (
              <div>
                <ul key={i}>
                  <li>{question.focusArea}</li>
                  <li>{question.digitalCapability}</li>
                  <li>{question.practiceItem}</li>
                </ul>
                <Delete question={question} />
                <p onClick={() => setEdit(true)}>Edit</p>
                {edit && (
                  <Edit
                    question={question}
                    changeEditState={changeEditState}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <button>Edit assessment</button>
        <button>View Statistics</button>
        <button>Link</button>
      </div>
    </AuthCheck>
  );
};

export default Controllcenter;
