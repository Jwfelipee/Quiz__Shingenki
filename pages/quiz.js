/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function ResultWidget({ results}) {
  return (
    <Widget>
      <Widget.Header>
        <h1>Tela de Resultado</h1>
      </Widget.Header>

      <Widget.Content>
      <p>  
        Voce acertou 
        {" "}
        {/*} {results.reduce((somatoriaAtual, resultAtual ) => {
          const isAcerto = resultAtual === true;
          if (isAcerto) {
            return somatoriaAtual + 1;
          }
          return somatoriaAtual;
        }, 0)} */}
        {results.filter((x) => x).length}
        {" "} 
        perguntas 
      </p>
      <ul>
        {results.map((result, index) =>(
          <li key={`result ${result}`}>
            {"("}
            #
            {index + 1}
            {") "} 
            Resultado: 
            {result === true 
              ? ' Acertou' 
              : " Errou"} 
          </li>
        ))}
       </ul> 
      </Widget.Content>
    </Widget>
  );
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

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubimited] = React.useState(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;

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
             
          <AlternativesForm
             onSubmit={(infosDoEvento) => {
               infosDoEvento.preventDefault();
               setIsQuestionSubimited(true)
               setTimeout(() => {
                addResult(isCorrect);
                onSubmit(); 
                setIsQuestionSubimited(false);
                setSelectedAlternative(undefined);
               }, 3 * 1000);
              }}>
             {question.alternatives.map((alternative, alternativeIndex) => {
               const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
               const alternativeId = `alternative__${alternativeIndex}`;
               const isSelected = selectedAlternative === alternativeIndex;
               return (
                 <Widget.Topic
                 as="label"
                 key={alternativeId}
                htmlfor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus }
                 >
                   <input 
                      style={{ display: 'none' }}
                      id={alternativeId}  
                      name={questionId}
                      onChange={() => setSelectedAlternative(alternativeIndex)}
                      type="radio"
                   />
                 {alternative}
                 </Widget.Topic>
                 
               );
             })}

           {/* <pre>
             {JSON.stringify(question, null, 4)}
            </pre>
           */}
             <Button type="submit" disabled={!hasAlternativeSelected}>
               Confirmar
             </Button>
          </AlternativesForm>   

             {isQuestionSubmited && isCorrect &&  <p>Voce acertou!</p>}
             {isQuestionSubmited && !isCorrect &&  <p>Voce errou!</p>}
          
           </Widget.Content>
         </Widget>
  )
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex];

  function addResult(result){
    setResults([
      ...results,
      result,
    ]);
  }

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
              addResult={addResult}
          />
          )} 
         {screenState === screenStates.LOADING && <LoadingWidget />}
         
         {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Jwfelipee"/>
      </QuizBackground>
    );
}
//new commit
