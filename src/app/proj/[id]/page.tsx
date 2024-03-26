'use server'
import Timer from "@/components/Timer";
import { db } from "@/utils/db"
import Link from "next/link";

type PageByIdProps = {
    params: {
        id: number,
    }
}

async function PageById({params}: PageByIdProps) {
    const data = await db.query('SELECT * FROM projects WHERE id=$1', [params.id]);
    console.log(data.rows[0].timespent);
    

    return (
        <div className="h-screen w-full flex justify-center items-center flex-col bg-slate-600 gap-10">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl"> project name:</h2>
                <h1 className="text-3xl tracking-wider"> <b>{data.rows[0].name} </b> </h1>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-xl">time spent:</h2>
                <Timer params={data.rows[0]}/>
            </div>
            <Link href={'/'}>HOME</Link>
        </div>
    )
}

export default PageById;
