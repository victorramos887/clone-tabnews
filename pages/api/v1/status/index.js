import query from "../../../../infra/database"

async function status(request, response) {
    const result = await query({ text: "SELECT 1 + 1 as sum" });
    console.log(result);
    
    
    response.status(200).json({chave:"Alunos do curso.dev são pessoas a cima da média."})
}

export default status
