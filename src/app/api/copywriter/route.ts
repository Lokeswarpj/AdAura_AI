import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { productName, coreBenefit, copyTone } = await req.json()

    if (!productName || !coreBenefit) {
      return NextResponse.json(
        { error: "Product name and core benefit are required." },
        { status: 400 }
      )
    }

    const geminiApiKey = process.env.GEMINI_API_KEY

    // If Gemini API Key is configured, make a live server-side call
    if (geminiApiKey) {
      const prompt = `You are an expert direct-response copywriter and Meta Ads marketing analyst. 
      Write exactly 2 high-converting variations of Meta Ads copy for a product/service named '${productName}' whose core benefit/solution is: '${coreBenefit}'.
      The target marketing angle/tone must be '${copyTone}' (where 'direct' means direct-response & benefit-driven, 'fomo' means high urgency & scarcity-driven, and 'story' means natural UGC-style storytelling review).
      
      You MUST respond ONLY with a valid, parseable JSON array containing exactly 2 objects. Do NOT include any markdown formatting like \`\`\`json or surrounding explanations. Output raw JSON.
      Each object in the array must have exactly these keys:
      1. "headline": a short, extremely punchy ad headline with 1-2 relevant emojis (maximum 10 words).
      2. "primary": highly engaging ad primary text with spacing, hooks, and a clear call-to-action (maximum 50 words).
      3. "score": an estimated conversion score (integer between 85 and 98) representing hook strength.
      
      Format example:
      [
        {
          "headline": "🚨 Stop wasting hours on manual tracking!",
          "primary": "Still tracking metrics manually? 🤦‍♂️ Get our automated platform and optimize in under 15 seconds. Try it free today! 👇",
          "score": 96
        },
        ...
      ]`

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`

      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (responseText) {
          try {
            const parsedCopies = JSON.parse(responseText.trim())
            return NextResponse.json({
              copies: parsedCopies,
              aiPowered: true
            })
          } catch (parseError) {
            console.error("Gemini response JSON parsing error:", parseError, "Raw response:", responseText)
            // If JSON fails to parse, fall back to mock engine below rather than throwing error 500
          }
        }
      } else {
        const errorText = await response.text()
        console.error("Gemini API call failed with status:", response.status, "Error:", errorText)
      }
    }

    // High-Fidelity Mock Engine fallback (Runs locally if GEMINI_API_KEY is not set)
    let mockCopies = []
    if (copyTone === "direct") {
      mockCopies = [
        {
          headline: `🚨 Stop wasting hours on manual ${productName}!`,
          primary: `Still doing ${coreBenefit} manually? 🤦‍♂️ Our advanced platform automates everything in under 15 seconds so you can scale stress-free. 👇 Click below to get a free live demonstration today!`,
          score: 96
        },
        {
          headline: `Instant automated ${productName} is here.`,
          primary: `Say goodbye to manual errors. Optimize your entire ${coreBenefit} flow on autopilot. Try it free for 14 days and see the scaling difference yourself!`,
          score: 89
        }
      ]
    } else if (copyTone === "fomo") {
      mockCopies = [
        {
          headline: `⚠️ Only 50 slots left for the ${productName} pilot program!`,
          primary: `Hundreds of managers have already swapped manual adjustments for screen-free ${coreBenefit} automation. Don't let your competition scale past you. Secure your spot now! ⏳`,
          score: 94
        },
        {
          headline: `Everyone is swapping to automated ${productName}...`,
          primary: `Are you still scaling manually while top agencies utilize AI to optimize ${coreBenefit} instantly? Join 1,200+ brands running on premium autopilot. 👇`,
          score: 91
        }
      ]
    } else {
      mockCopies = [
        {
          headline: `How this minimal band solved my ${coreBenefit} struggle 🤯`,
          primary: `I was completely burned out trying to track ${productName} every single day. Then I swapped to this screen-free autopilot tracker. Best decision of my season. Here is my honest review:`,
          score: 95
        },
        {
          headline: `My honest review of the new automated ${productName}...`,
          primary: `I spent 3 weeks testing different tools for ${coreBenefit}. Most are cluttered and slow. This automated system is screen-free, beautiful, and increases yields by 45%. 10/10 recommend.`,
          score: 92
        }
      ]
    }

    // Return mock copies with aiPowered: false to let the user know they can set their key
    return NextResponse.json({
      copies: mockCopies,
      aiPowered: false
    })

  } catch (error: any) {
    console.error("Copywriter API route error:", error)
    return NextResponse.json(
      { error: "Internal Server Error occurred while writing copy." },
      { status: 500 }
    )
  }
}
