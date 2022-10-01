import React, { useState } from 'react';
import { TextField, Button, LinearProgress, CircularProgress} from '@material-ui/core';
import shrtcode from '../../api/shrtcode';

import './textbox.css';

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Textbox = () => {

    const [copy_text, setcopy_text] =  useState('copy');

    const[link, setlink] = useState('');

    //const [short(actual variable), setShort(getter or setter of the actual variable)]
    const [short, setShort] = useState('');
    //console.log(link);

    const [isLoading, setisLoading] = useState(false);

    const Copy_to_Clipboard =() =>{
        var textArea = document.createElement("textarea");
        textArea.value = short;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();

        
        setTimeout(() => {setcopy_text('copied!')  }, 100);
        setTimeout(() => {setcopy_text('copy')  }, 5000);
    }

    const checkLink = (string) => {
        // Regex to check if string is a valid URL
        return string.match(HTTP_URL_VALIDATOR_REGEX);
      };

    //prevents the page to reload if you submit the form //for this case I didn't use form
    const handleSubmit = (e) =>{
        if (checkLink(link)) {
            e.preventDefault();
            getLink();
            setlink(''); 
            //setisLoading whatever the oposite value of isLoading
            setisLoading(!isLoading);
        } else {
            setShort('Invalid URL');
            e.preventDefault();
        }
        
        
    };

    //access the api
    const getLink = async (e) => {
        //adding the shorten?url=${link} for the api
        await shrtcode
        .get(`shorten?url=${link}`)
        .then((response) =>{
            setShort(response.data.result.short_link);
            //setShort(response)
            setisLoading(false);
        })
        .catch((error) =>{
            console.error(error);
        })
    }

    return (
        <div className="main">
                <div className='main_inner'>
                    <div className='textfields'>
                        <form onSubmit={(e)=> handleSubmit(e)}>
                            <span className="MainText">Free URL Shortener</span> <br/>
                            <input value={link}
                                    //to be able to type in the text field
                                    onChange={(e) =>setlink(e.target.value)} 
                                    className="textbox url" 
                                    id="url" 
                                    type="text" 
                                    placeholder="Enter a URL here">
                            </input> <br/>
                            <div className='ShortenBut_container'>
                                {!isLoading && (
                                    <button className="ShortenBut" onClick={(e)=> handleSubmit(e)}>Shorten URL</button>    
                                )}
                                {/*appear only if the short has a value */}
                                {/*if short has a value:
                                    div appear
                                */}
                                {isLoading &&(
                                    <CircularProgress style={{'color': '#5DB9EC'}} />
                                )}
                            </div>
                            
                            {short &&
                            <div className='result_container'>
                                <span className='result'>Result: </span>
                                <span className='result_link'> {short} </span>
                                <span id='copy_result' className='copy_result' onClick={Copy_to_Clipboard}>{copy_text}</span>
                            </div>
                            }
                        </form>
                    </div>
                </div>  
                  
        </div>
    )
}

export default Textbox
