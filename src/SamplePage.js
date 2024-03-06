import React from 'react'


function PageMissed() {
    return <h2>Hi! Page isn't working right now. Please come back latter.</h2>
}

function PageOpen() {
    return <h2>Hi! Congratulations for successfully loading the page.</h2>
}

function Car(props) {
    return <h1>This is my {props.index}, favorite car {props.brand}</h1>
}

function SamplePage(props) {
    const index = ["first", "second", "third"];
    const cars = ["Limbergini", "Aston Martin", "Farari"];

    const page = props.page;

    const shoot = (a) => {
        document.write(a);
    }

    return (
        <div>
            <h1>Hello World</h1>
            <br/>
            <button onClick={() => shoot("Great! You have opened a new page.")}>
                Click Me!
            </button>
                {page ? <PageOpen/> : <PageMissed/>}
            
            <h1>This are all my favorite cars known as?</h1>
            <ul>
                {cars.map((index, car) => {<Car index={index} brand={car}/>})}
            </ul>
        </div>
      )
}



export default SamplePage;
