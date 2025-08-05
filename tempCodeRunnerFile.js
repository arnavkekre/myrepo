const express= require('express');
const path= require('path');
const request= require('request');
const app= express();
const PORT= 3000;
app.get('/', (req,res)=>{res.send("welcome to the scrapper app");});
app.get('/fetch', (req, res)=>{
    const targetUrl='https://example.com';
    request(targetUrl, (error,response, body)=>{
        if(!error && response.statusCode===200){
            res.send(body);
        }
        else{
            res.status(500).send(`Error fetching the page: ${error || response.statusCode}`)
        }
    });

});
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});