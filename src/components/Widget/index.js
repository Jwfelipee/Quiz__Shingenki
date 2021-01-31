import styled from 'styled-components'

const Widget = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-width: 8px;
  border-bottom-right-radius: 180px;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 165px;
  overflow:hidden;
  opacity: .9;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;


Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 3% 5% 5% 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Widget.Button = styled.div`
  padding: 0% 24% 7% 3%;
`;

Widget.Description = styled.div`
  padding: 1% 2% 1% 20%;
`;

Widget.Links = styled.div`
  padding: 3% 12% 3% 5%;
`;

Widget.Nome = styled.div`
  padding: 1% 8% 1% 12%;
  
`;

Widget.Pergunta = styled.div`
  padding: 1% 2% 1% 5%;
  
`;

Widget.Content = styled.div`
  border-bottom-right-radius: 180px;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 800px;
  background-color: ${({ theme }) => theme.colors.secondary};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-right-radius: 180px;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 165px;
  transition: .3s;
  display: block;
  
  &:hover,
  &:focus {
    opacity: .5;
  }
`;

export default Widget;