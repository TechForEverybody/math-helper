import React, { useState } from 'react';
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import ToolCard from './ToolCard';
import SimpleLinearRegression from '../Modules/SimpleLinearRegression';
function Home() {
    let [currentElement, updateCurrentElement] = useState(0);
    function renderElement(option) {
        if (option === 1) {
            return <SimpleLinearRegression goBack={()=>updateCurrentElement(0)}/>
        }
    }
    return (
        <>
            <div id="homePageContainer">
                <Header />
                {
                    currentElement === 0 ? (<>
                        <section className="landingPageImage">
                            <div>
                                <h1>Try are Best Tools for Mathematics</h1>
                                <button><a href="#toolsList">See Tools</a> </button>
                            </div>
                        </section>
                        <section className="toolsList" id='toolsList'>
                            <ToolCard text="Simple Linear Regression" render={()=>{
                                updateCurrentElement(1)
                            }}/>
                            <ToolCard text="Further Tools Will Be available soon🚀🚀🚀🚀" render={()=>{}}/>
                        </section>
                    </>) : (<>
                        {
                            renderElement(currentElement)
                        }
                    </>)
                }
                <Footer />
            </div>
        </>
    )
}


export default Home