import './App.css';
import axios from 'axios';
import { useState } from 'react';
function App() {

  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState("AIzaSyAW3aYdfaUPLNHPCSs4Kusr3Dkk7LL7bOQ");
  const [filters, setFilters] = useState("");
 const [startInd,setStartInd] = useState(1);
 const[maxInd,setMaxInd] =useState(5)
 const[noOfBooks,setNoOfBooks]=useState(0)
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey+"&startIndex="+startInd + "&maxResults="+maxInd)
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
        setNoOfBooks(data.data.totalItems);
        console.log(data);

      })
  }

  function handleStart(event){
    event.preventDefault();
    if(startInd >11 )
    {setStartInd(startInd-11);
    setStartInd(maxInd -11)
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey+"&startIndex="+startInd + "&maxResults="+maxInd)
      .then(data => {
        
        console.log(data.data.items);
        setResult(data.data.items);
    
     })
  }
}
  function handleMax(event){
    event.preventDefault();
     setStartInd(startInd+11);
      setStartInd(maxInd +11);
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey+"&startIndex="+startInd + "&maxResults="+maxInd)
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
  })
}


  return (
    <div className='container'>
      <h1>Library</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='text' onChange={handleChange}
            className='form-control mt-10'
            placeholder='Search for books'
            autoComplete='off'
          />
        </div>
        <button type='submit'onClick={handleSubmit}
          className='btn btn-primary'>
          Search
        </button>

      </form>
      <div>
        <input type="radio" name="filter" value="1" />Title {"           "}
              <input type="radio" name="filter" value="2"  /> Author   {"          "}
             <input type="radio" name="filter" value="3"  /> Subject   {"          "}
              <input type="radio" name="filter" value="4"  /> Publish date{"          "}
      </div>
      <br/>
      <p>Total number of Books retrieved={noOfBooks}</p>


      <button  className="btn btn-danger" onClick={handleStart}>prev</button>
      <button className="btn btn-success"onClick={handleMax}>next</button>


      <br/>
      {result.map(book => (
        <a target="_blank" href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
          <p >Title-{book.volumeInfo.title}   </p>
        <p> Authors-({book.volumeInfo.authors})</p>
        </a>
       
        
      
      ))}
      

        </div>

  );
}

export default App;
