import { db } from './db';

export async function getData() {
    const data = await db.query('SELECT * FROM projects');
    return data.rows
}

export async function saveData(name:string, timespent:number) {
    timespent = timespent * 3600;
    try{
        await db.query('INSERT INTO projects(name, timespent) VALUES ($1, $2)', [name, timespent]);
        return 'Saved successfully!';
        
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}

export async function updateData(id:number, name:string, timespent:number) {
    try{
        await db.query('UPDATE projects SET name = $1, timespent = $2 WHERE id = $3', [name, timespent, id])
        return 'Quote has been updated.'
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}

export async function deleteData(id:string) {
    try{
        console.log(id);
        
        await db.query('DELETE FROM projects WHERE id = $1', [id])
        return 'Project has been deleted'
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}