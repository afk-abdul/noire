const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDG0uohcr8SuZb73vj9WlqFXWphTPvl3Uk");

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      "Hello"
    );

    console.log(result.response.text());

  } catch (err) {
    console.error(err);
  }
}

run();