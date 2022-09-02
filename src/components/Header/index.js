import React, { useEffect, useState } from "react";
import logo from "../../assets/img/Wolf_School_medallion.png";
import SearchInput from "../SearchInput";
import "./style.css";

function Header(){
    const [text, setText] = useState('');
    const [info, setInfo] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [numberMin, setNumberMin] = useState('')
    const [numberMax, setNumberMax] = useState('')

    function priceMax(){
        if(filtered.length > 0){
            let filterList = [...filtered]
            filterList.sort((a, b) => {
                return b.price - a.price
        })  
        setFiltered(filterList);
        }
        else {
            let newList = [...info]
            newList.sort((a, b) => {
                return b.price - a.price
            })
            setInfo(newList);
        }  
    }

    function priceMin(){
        if(filtered.length > 0){
            let filterList = [...filtered]
            filterList.sort((a, b) => {
                return a.price - b.price
        })
        setFiltered(filterList);
        }
        else{
            let newList = [...info]
            newList.sort((a, b) => {
                return a.price - b.price
            })
            setInfo(newList);
        }
    }

    function priceInterval(){
        const newList = info.filter(a => a.price >= numberMin && a.price <= numberMax);
        if(newList.length === 0){
            setFiltered([])
            alert("Não existem produtos nessa faixa de preço!")
        }else{
            setFiltered([...newList]);
        }
    }

    useEffect(() => {
        if(text){
            fetch(`https://dummyjson.com/products/search?q=${text}`)
            .then((response) => response.json())
            .then((response) => {
                setFiltered([...response.products]);
            })
        }
        else{
            fetch(`https://dummyjson.com/products?limit=100`)
            .then((response) => response.json())
            .then((response) => {
                setInfo([...response.products]);
            })
        }
        
    }, [text]);
    
    return(
        <>
            <header className = "header">
                <img src={logo} alt={"logo"} height={100} width={100}/>
                <h1>E-COMMERCE</h1>
                <SearchInput value={text} onChange={search => setText(search)} />
            </header>
            <div className="filter">
                <p>Filtrar Por:</p>
                $<input type="number" value={numberMin} onChange={event => setNumberMin(event.target.value)} placeholder="Mínimo"/>
                $<input type="number" value={numberMax} onChange={event => setNumberMax(event.target.value)} placeholder="Máximo"/>
                <button onClick={priceInterval}>Intervalo</button>
                <button onClick={priceMax}>Maior Preço</button>
                <button onClick={priceMin}>Menor Preço</button>
            </div>
            <div className="main-container">
                {filtered.length > 0 
                ?
                    <ul className="produtos_lista">
                        {filtered.map((produtos) =>(
                            <li key={produtos.id}>
                                <img src={produtos.thumbnail} alt={produtos.title}/>
                                <p>{produtos.category}</p>
                                <p>{produtos.title}</p> 
                                <p>${produtos.price}</p>
                            </li>
                        ))}
                    </ul>
                :
                    <ul className="produtos_lista">
                        {info.map((produtos) =>(
                            <li key={produtos.id}>
                                <img src={produtos.thumbnail} alt={produtos.title}/>
                                <p>{produtos.category}</p>
                                <p>{produtos.title}</p> 
                                <p>${produtos.price}</p>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </>
    );
}

export default Header;