/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';

import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
             <Widget.Header >
            <h3>
              Pergunta {questionIndex + 1} de {` ${totalQuestions}`}
            </h3> 
             </Widget.Header>

             <img 
             alt="descrição"
             style={{
               width: '100%',
               height: '200px',
               objectFit: 'cover',
             }}
             src={question.image}
             />
           <Widget.Content >
             <h2>
               {question.title}
             </h2>
             <p>
               {question.description}
             </p>
             
             <form 
             onSubmit={(infosDoEvento) => {
               infosDoEvento.preventDefault();
               onSubmit();
              }}>
             {question.alternatives.map((alternative, alternativeIndex) => {
               const alternativeId = `alternative__${alternativeIndex}`;
               return (
                 <Widget.Topic
                 as="label"
                  htmlfor={alternativeId}
                 >
                   <input 
                      style={{ display: 'none' }}
                      id={alternativeId}  
                      name={questionId}
                      type="radio"
                   />
                 {alternative}
                 </Widget.Topic>
                 
               );
             })}
            
             <Button type="submit">
               Confirmar
             </Button>
             </form>

           </Widget.Content>
         </Widget>
  )
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
      }, 1 * 100);
    // nasce || montado === didMount  
    }, []);

    function handleSubmitQuiz() {
      const nextQuestion = questionIndex + 1;
      if(nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
      } else{
      setScreenState(screenStates.RESULT);
      }

    }

  // [React chama de: efeito || effects]
  // atualizado === willUpdate
  //morre || desmontado === willUnmount

    return (
        <QuizBackground backgroundImage={db.bg}>
        <Head>
          Shingenki Quiz 
        </Head>
        <QuizContainer>
        <QuizLogo />
         
         {screenState === screenStates.QUIZ && (
            <QuestionWidget 
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions} 
              onSubmit={handleSubmitQuiz}
          />
          )} 
         {screenState === screenStates.LOADING && <LoadingWidget />}
         
         {screenState === screenStates.RESULT && <div>Voce acertou x questoes, parabens!</div>}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Jwfelipee"/>
      </QuizBackground>
    );
}