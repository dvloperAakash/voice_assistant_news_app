import './App.css';
import React, { useEffect, useState } from 'react';
import NewsCards from './components/NewsCards/NewsCards';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './styles';

const alanKey = 'd900898d6a2cb0308550d143f7130d0c2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const classes = useStyles();
  const [newsArticle, setNewsArticle] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadLines') {
          setNewsArticle(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            // alanBtn().playText('Please try that again');
          } else if (article) {
            window.open(article.url, '_blank');
            // alanBtn().playText('Opening...');
          }

        }
      }
    })
  }, [])
  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://videohive.img.customer.envatousercontent.com/files/f4db72ca-6e03-477e-92bc-a408c27730ca/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=edea1ba1b55c84d652b12ba166e358c9" className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticle} activeArticle={activeArticle} />
      <div className={classes.footer}>
        Developed by Aakash Goswami
      </div>
    </div>
  );
}

export default App;


// 1: 49:00