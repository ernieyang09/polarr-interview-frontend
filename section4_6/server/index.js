import {
  Record,
  RecordItem,
} from '../models';
import express from 'express';
const app = express();

app.listen(3000, () => console.log('Listening on port 3000!'));
app.use(express.json());
app.use(express.static('dist'));

app.get('/api/record/:recordId', async (req, res) => {
  try {
    const record_id = req.params.recordId;
    const record = await Record.findOne({
      where: { 'record_id': record_id },
      include: [RecordItem]
    });
  
    const recordItems = record.RecordItems.map(({ dataValues }) => {
      delete dataValues['id'];
      delete dataValues['record_id'];
      return dataValues;
    });
  
    return res.status(200).json(recordItems)
  } catch {
    return res.status(404).json('')
  }

})

app.post('/api/record', async (req, res) => {
  const record = await Record.create();

  
  const data = req.body.map((x) =>({
    record_id: record.record_id,
    time: JSON.stringify(x[0]),
    action: JSON.stringify(x[1]),
    result: JSON.stringify(x[2]),
  }))


  await RecordItem.bulkCreate(data);

  return res.status(200).json(record.record_id);
});

