const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/records', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/records', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data');
            return;
        }
        const records = JSON.parse(data);
        records.push(req.body);
        fs.writeFile('data.json', JSON.stringify(records, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing data');
                return;
            }
            res.send('Data saved successfully');
        });
    });
});

app.put('/records/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data');
            return;
        }
        let records = JSON.parse(data);
        const recordIndex = records.findIndex(record => record.id === id);
        if (recordIndex !== -1) {
            records[recordIndex] = { ...req.body, id: id };
            fs.writeFile('data.json', JSON.stringify(records, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error writing data');
                    return;
                }
                res.send('Data updated successfully');
            });
        } else {
            res.status(404).send('Record not found');
        }
    });
});

app.delete('/records/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Obtener el ID de la URL
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al leer los datos');
        }

        let records = JSON.parse(data);
        
        // Filtrar los registros excluyendo el ID a eliminar
        const updatedRecords = records.filter(record => record.id !== id);
        
        // Verificar si se eliminó algún registro
        if (records.length === updatedRecords.length) {
            return res.status(404).send('Registro no encontrado');
        }

        fs.writeFile('data.json', JSON.stringify(updatedRecords, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al guardar los cambios');
            }
            res.send('Registro eliminado exitosamente');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});