import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'

/*
const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: 90%;
  background-position: center;
`;
*/

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 69%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;



export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
       <Widget>
           <Widget.Header>
           <h1>Shingenki no Kyojin</h1>
           </Widget.Header>
         <Widget.Content>
         
         <p>sasageyo...</p>
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
