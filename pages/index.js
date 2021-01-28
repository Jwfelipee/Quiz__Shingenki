import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

/*
const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: 90%;
  background-position: center;
`;
*/

export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        Shingenki Quiz 
      </Head>
      <QuizContainer>
      <QuizLogo />
       <Widget>
           <Widget.Header>
           <h1>Shingenki no Kyojin</h1>
           </Widget.Header>
         <Widget.Content>
            <form onSubmit={function (infosDoEvento){
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log("fazendo uma submissão por meio do react");


              //router manda para a próxima pagina
            }}>
              <Input // State estado do componente.
              name="nomeDoUsuario"
              onChange={function (infosDoEvento){
                console.log(infosDoEvento.target.value);
                setName(infosDoEvento.target.value);
              }}
              placeholder="escreva seu nome!" 
              value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                quem vai jogar é {name}
              </Button>
            </form>
         </Widget.Content>
       </Widget>

       <Widget>
            <Widget.Header>
            <h1>Quizes da Galera</h1>
            </Widget.Header>
         <Widget.Content> 
         <p>(links)</p>
         </Widget.Content>
       </Widget>
       <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Jwfelipee"/>
    </QuizBackground>
  );
}
