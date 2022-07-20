import axios from 'axios'
import React,{useEffect, useState} from 'react' 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'; 

function TriviaPage() {  
    const [quizData, setQuizData] = useState()
    const [answer, setAnswer] = useState()
    const [errorMsg, setErrorMsg] = useState("") 
    const [next, setNext] = useState(false) 
    useEffect(() => { 
        axios("https://opentdb.com/api.php?amount=1")  
          .then(data => setQuizData(data.data.results)) 
      }, [next]) 
      console.log(quizData,'bhanu');
 
const handleChange = (e) =>{
    setAnswer(e.target.value)   
}

const handleNext = () =>{
// window.location.reload() 
setNext(!next)
setAnswer("")
setErrorMsg("")
}

  const handleCheck = (event) => {
    event.preventDefault();
    if(answer===""){
      setErrorMsg("")  
    }
    else if(answer.toLowerCase()===quizData[0].correct_answer.toLowerCase()){ 
      setErrorMsg("Correct answer")
  }else{ 
      setErrorMsg("Incorrect answer")
  } 
  }; 

  return ( 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <QuestionAnswerIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {quizData && quizData[0].question.replace(/&quot;/g, '"')}
          </Typography>
          <Typography component="h1" variant="h5">
            {answer}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}> 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="answer"
                  label="Type your answer"
                  name="answer"
                  autoComplete="answer"
                  value={answer ?? ""}
                  onChange={handleChange}
                />
              <Typography component="h1" variant="h5">
            {errorMsg}
          </Typography>
              </Grid> 
            </Grid>
            <Button 
              onClick={handleCheck}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Check answer
            </Button> 
            <Button 
              onClick={handleNext}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next Question
            </Button> 
          </Box>
        </Box> 
      </Container> 
  )
}

export default TriviaPage