
import './App.css';
import { useEffect,useState } from 'react';
function App() {
const [products,setProducts] = useState([])
const [page,setPage] = useState(2)
const [totalPages,setTotalPages] = useState(0)
  const fetchProducts = async() => {
    try{
      const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
    const data = await res.json()
    if(data && data.products){
      setProducts(data.products)
      setTotalPages(Math.ceil(data.total/10))
    }else{
      console.log("Invalid url")
    }
    console.log(totalPages)
    
    }catch(err){
console.log(err)
    }
    
  }
const pageHandler = (selectedPage) => {
  if(selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page){
    setPage(selectedPage)
  }
  
}
  useEffect(()=>{
    fetchProducts()
  },[page])
  
  return (
    <div className="App">
   {
    products.length>0 && <div className='products'>
      {
products.map((pdt)=>{
 return <span className='pdt__description' key={pdt.id}>
  <img src= {pdt.thumbnail} alt={pdt.title}/>
  <span>{pdt.title}</span>
 </span>
})
      }
    </div>
   }
   {
    products.length>0 && <div className='pagination'>
      <span className={page > 1 ? "":"disable_button"} onClick={()=> pageHandler(page-1)} >◀️</span>
      {
        [...Array(totalPages)].map((_,i)=>{
          return <span className={page === i+1 ? "selected__page":""} onClick={()=> pageHandler(i+1)} key={i}>{i+1}  </span>
        })
      }
      <span className={page === totalPages ? "disable_button":""}  onClick={()=> pageHandler(page+1)} >▶️</span>
    </div>
   }
    </div>
  );
}

export default App;
