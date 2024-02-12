import Image from "next/link";
import { getData, saveData, updateData, deleteData } from '@/utils/handleDatabase'
import { revalidateTag } from 'next/cache'
import { MouseEventHandler } from "react";

export default async function Home() {
  const data = await getData();
  console.log(data);

  const create = async (formData:FormData)=> {
    'use server'
    const author = formData.get('author') as string
    const quote = formData.get('quote') as string
    const data = await saveData(author, quote)
    revalidateTag('quote')
  }

  const update = async (formData:FormData)=> {
    'use server'
    const id = formData.get('id') as string
    const author = formData.get('author') as string
    const quote = formData.get('quote') as string
    const data = await updateData(id, author, quote)
    console.log(data);
    revalidateTag('quote')
  }

  const deleteQuote = async (formData:FormData)=> {
    'use server'
    const id = formData.get('id') as string
    console.log(id);
            
    const data = await deleteData(id)
    console.log(data);
    revalidateTag('quote')
  }
  
  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-800 gap-10">
      <div className="flex items-center flex-col">
        <h1><b>QUOTES</b></h1>

        <form action={create} className="flex flex-col gap-1 w-60">
          <h2>Create quote</h2>
          <input 
            type="text" 
            name="author" 
            className="text-black"
            placeholder="Author name"
          />
          <input 
            type="text" 
            name="quote" 
            className="text-black"
            placeholder="Write quote"
          />
          <button>Save</button>
        </form>

        <form action={update} className="flex flex-col gap-1 w-60">
          <h2>Update quote</h2>
          <input 
            type="text" 
            name="id" 
            className="text-black" 
            placeholder="ID of quote"/>
          <input 
            type="text" 
            name="author" 
            className="text-black"
            placeholder="Author name"
          />
          <input 
            type="text" 
            name="quote" 
            className="text-black"
            placeholder="Updated quote"
            />
          <button>Save</button>
        </form>
      </div>
      
      <div className="w-3/6 h-2/3 flex justify-start items-start flex-wrap gap-3 bg-slate-600 p-3">
        {data.map((quote) => (
          <form action={deleteQuote} key={quote.id} className="h-2/12 max-w-40 border-2 border-white p-2">
            <div className="flex items-center flex-row-reverse gap-2">
              <button name={quote.id} className="border-2 border-slate-300 bg-slate-500 text-slate-700 px-2 rounded"><b>x</b></button>
              
              <h1><b>id:</b> {quote.id}</h1>
              <input type="hidden" name="id" value={quote.id} />
            </div>
            
            <h2>{quote.author}: {quote.quote}</h2>
          </form>
        ))}
      </div>

    </div>
  );
}
