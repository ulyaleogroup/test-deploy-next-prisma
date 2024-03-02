import { NextResponse } from "next/server"
export const GET = async () => {
    const message = await fetch("https://api.telegram.org/bot7141240554:AAHCtXDqmf-qxxd6mNySAjeP6UJXnZZrJFI/sendMessage", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "chat_id": "5449821599",
            "text": "halo sayangkusdughg"
        })
    })

    const data = await message.json()
    console.log(data);
    

    return NextResponse.json(data)
}