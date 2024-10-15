
import './App.css';
import { useEffect,useState } from 'react';
function App() {
const [products,setProducts] = useState([])
const [page,setPage] = useState(2)
  const fetchProducts = async() => {
    try{
      const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json()
    if(data && data.products){
      setProducts(data.products)
    }else{
      console.log("Invalid url")
    }
    console.log(data)
    
    }catch(err){
console.log(err)
    }
    
  }
const pageHandler = (selectedPage) => {
  if(selectedPage >= 1 && selectedPage <= 10 && selectedPage !== page){
    setPage(selectedPage)
  }
  
}
  useEffect(()=>{
    fetchProducts()
  },[])
  
  return (
    <div className="App">
   {
    products.length>0 && <div className='products'>
      {
products.slice(page  * 10 - 10,page * 10).map((pdt)=>{
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
        [...Array(products.length/10)].map((_,i)=>{
          return <span className={page === i+1 ? "selected__page":""} onClick={()=> pageHandler(i+1)} key={i}>{i+1}  </span>
        })
      }
      <span className={page === products.length/10 ? "disable_button":""}  onClick={()=> pageHandler(page+1)} >▶️</span>
    </div>
   }
    </div>
  );
}

export default App;
