import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import { firestore } from '../../lib/firebase';
import { useHistory } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as t from './types';
import Question from './Components/Question';

const Survey = () => {
  const history = useHistory();
  const answerdDocId = localStorage.getItem('docRef')!;

  if (answerdDocId === null || undefined) {
    history.push('/survey');
  }

  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: null,
  });

  const ref = firestore.collection('questions');
  const [data] = useCollection(ref);
  const questions: t.Question[] = [];
  data?.docs.map((doc: t.Document) =>
    questions.push({
      id: doc.id,
      focusArea: doc.data().focusArea,
      digitalCapability: doc.data().digitalCapability,
      practiceItem: doc.data().practiceItem,
    }),
  );

  const postAnswers = async () => {
    const newAnswerRef = firestore
      .collection('answers')
      .doc(answerdDocId);

    const data = {
      [raiting.questionId]: {
        value: raiting.value,
      },
    };
    await newAnswerRef.set(data, { merge: true });
  };

  console.log(answerdDocId);

  return (
    <AuthCheck role="user">
      {questions.map((question, i) => (
        <div key={i}>
          <Question question={question} />
          <Raiting
            min={'not implemented'}
            max={'fully implemented'}
            setRaiting={setRaiting}
            questionId={question.id}
          />
          <button onClick={() => postAnswers()}>Next Question</button>
        </div>
      ))}
    </AuthCheck>
  );
};

export default Survey;
