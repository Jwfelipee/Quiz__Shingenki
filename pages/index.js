import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 60px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}
    as={motion.div}
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 40
          }}>
      <Head>
        <title>
          Quiz 
          {' - '}
          {db.title}
        </title>
      </Head>
      <QuizContainer as={motion.div}
          initial={{ scale: 0.1 }}
          animate={{ rotate: -720, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 20,
            damping: 20
          }}>
        <QuizLogo 
        />
        <Widget
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ rotate: 1080, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 40
          }}
          
        >    
          <Widget.Header> 
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            
            <Widget.Description>
              <p>{db.description}</p>
            </Widget.Description>
            
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Widget.Nome>
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              </Widget.Nome>
              <Widget.Button>
              <Button type="submit" disabled={name.length === 0}>
                {`Jogador: ${name}`}
              </Button>
              </Widget.Button>
            </form>
            
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.div}
            initial={{ scale: 0 }}
            animate={{ rotate: 1440, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 40,
              damping: 40
            }}
          
        >
           <Widget.Header>
            <h1>Quizes da Galera</h1>
            </Widget.Header>
          <Widget.Content>
           <Widget.Links>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
            </Widget.Links>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ rotate: 1800, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 40
          }}
        />        
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Jwfelipee" />
    </QuizBackground>
  );
}