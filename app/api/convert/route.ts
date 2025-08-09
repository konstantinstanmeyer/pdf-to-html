export const runtime = 'nodejs';

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.es.js";


export async function GET() {
    const data = new Uint8Array(fs.readFileSync(process.cwd() + "/public/document.pdf"));
    const doc = await pdfjsLib.getDocument({ data }).promise;
    
    let text = "";
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + "\n";
    }
    
    console.log(text)
    
    return NextResponse.json({ text });
}
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//     // console.log("test")
//     // const result = await pdfToHtml(process.cwd() + "/public/" + "document.pdf")

//     // console.log(result)

//     // // `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/document"}`

//     // return NextResponse.json({ text: "" }, { status: 200 });

    
// }

// async function pdfToHtml(pdfPath: string) {
//     // const data = new Uint8Array(fs.readFileSync(process.cwd() + "/public/" + "document.pdf"));
    
//     // // Specify the encoding, e.g., 'utf-8'
//     // // const decoder = new TextDecoder('utf-8');
//     // const str = String.fromCharCode(...data);

//     // console.log(data);
//     // console.log(str);

//     // return data;

//     console.log("reached")

//     const data = new Uint8Array(fs.readFileSync(pdfPath));
//     const doc = await pdfjsLib.getDocument({ data }).promise;

//     let output = "";
//     for (let i = 1; i <= doc.numPages; i++) {
//         const page = await doc.getPage(i);
//         const content = await page.getTextContent();
//         output += content.items.map((item: any) => item.str).join(" ") + "\n";
//     }
//     return output;
// }