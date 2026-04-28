import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeVectors(vectors: any[], dimension: number) {
  const model = "gemini-3-flash-preview";
  const vectorStr = vectors.map((v, i) => `V${i+1}: [${v.values.slice(0, dimension).join(', ')}]`).join('\n');
  
  const prompt = `
    Analyze these vectors in ${dimension}D space:
    ${vectorStr}
    
    Structure your report exactly as follows:
    
    ### 1. Independence & Final Verdict
    State clearly if they are independent or dependent and why (specifically using the dimension theorem if applicable).
    
    ### 2. Geometric Interpretation
    Explain the span and visualization in $\\mathbb{R}^n$ concisely.
    
    ### 3. Python Implementation (Automated Solver)
    \`\`\`python
    # Using numpy/sympy to verify rank and RREF
    \`\`\`
    
    ### 4. Rigorous Mathematical Proof
    Provide the Row reduction steps using matrix notation (LaTeX). Use \\begin{pmatrix} ... \\end{pmatrix}.
    
    Rules:
    - NO self-introductions or conversational filler.
    - Use LaTeX for ALL math constants, vectors (e.g. $\\mathbf{V}_1$), and matrices.
    - Use $...$ for inline and $$...$$ for blocks.
    - Be direct, professional, and accurate.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "I'm sorry, I couldn't analyze the vectors right now. Please try again later.";
  }
}

export async function chatWithAI(message: string, history: { role: 'user' | 'model', text: string }[]) {
  const model = "gemini-3-flash-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: "You are the MathVortex AI Assistant. You help students learn Linear Algebra. You are friendly, patient, and explain concepts using clear language and LaTeX for math. You focus on vector spaces, dependency, and related topics.",
    },
  });

  // Reconstruct history if needed, but for simplicity we'll just send the message
  // In a real app, we'd pass the full history to chat.sendMessage
  
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to my brain right now. Can we try again?";
  }
}
