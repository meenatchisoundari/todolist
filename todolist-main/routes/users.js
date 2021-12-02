const userRoutes = (app, fs) => {
    const dataPath = './api/list.json';
    app.get('/list', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            else {

                const input =JSON.parse(data);
                /* let result=[];
                let visited={};
                for(let i=0;i<input.length; i++){
                    if(visited[input[i].id]){
                        visited[input[i].id].push(input[i].type);
                    }else{
                        visited[input[i].id]=[input[i].type];
                    }
                }
                for (const data in visited) {
                    result.push({id:data,type:visited[data]});
                }

                fs.writeFileSync('./api/list.json',(JSON.stringify(result,null,2)));
                */
                res.send(input);

            }
           
        });
    });
   
    app.post('/createlist', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            else {

                var status = false;

                for(let obj = 0;obj<data.length;obj++){
                    if(req.body.id==data[obj].id){
                        status = true;
                        break;
                    }
                }

                if(status==false){

                    const input = JSON.parse(data);
                    const list = req.body;
    
                    input.push(list);
                    fs.writeFileSync(dataPath,(JSON.stringify(input,null,2)));
                    res.send(input);
                }
                else{
                    res.send('ID already exists');
                }
  
             
            }
           
        });
    });

    app.get('/viewlist/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            else {
                 
                const { id } = req.params;
                var jdata = fs.readFileSync(dataPath);
                var data = JSON.parse(jdata);

                const findList = data.find((list) => list.id === id);
                
                if(typeof findList === 'undefined'){
                    res.send('ID does not exist');
                }
                else{
                     res.send(findList);
                }
             
            }
           
        });
    });
   
    app.put('/updatelist/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, jsondata) => {
            if (err) {
                throw err;
            }
            else {
                
                var id = req.params.id;
                var jdata = fs.readFileSync(dataPath);
                var data = JSON.parse(jdata);

                var status = true;

                for(let info=0;info<data.length;info++){
                    if(data[info].id==id){
                        data[info]["type"]=req.body.type;
                        
                        fs.writeFileSync(dataPath,(JSON.stringify(data,null,2)));

                        res.json(data);
                        status = false;
                    }
                }
                if(status==true){
                    res.send('ID does not exists');
                }

            }
            
        });
    });

    app.delete('/deletelist/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, jsondata) => {
            if (err) {
                throw err;
            }
            else {
                
                const {id} = req.params;

                var jdata = fs.readFileSync(dataPath);
                var data = JSON.parse(jdata); 
                
                data = data.filter((user) => user.id !== id);
                fs.writeFileSync(dataPath,(JSON.stringify(data,null,2)));
                
                res.send(data);

            }
            
        });
    });

    app.patch('/updatedata/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, jsondata) => {
            if (err) {
                throw err;
            }
            else {
                
                var jdata = fs.readFileSync(dataPath);
                var data = JSON.parse(jdata); 

                const {id} = req.params;
                const {type} = req.body;

                const listToUpdate =  data.find((list) => list.id === id); 

                if(type){
                      listToUpdate.type = type;
                }

                fs.writeFileSync(dataPath,(JSON.stringify(data,null,2)));
                
                res.send(data);

            }
            
        });
    });

};


module.exports =userRoutes;
