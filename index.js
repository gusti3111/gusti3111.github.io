const btnAnswer = document.getElementById('btn-answer');
const btnQuestion = document.getElementById('btn-question');
const joke = document.getElementById('jokes')
const questions = document.getElementById('question')

const apiKey = "f6lZrkjJ1yJNWRHRC4wIWA==SoRD7M4zMpcDS3Vm"

const options = {
    method: 'GET',
    headers: { 'X-Api-Key': apiKey },
    contentType: 'application/json',
}
const url = 'https://api.api-ninjas.com/v1/dadjokes?limit=1'


const displayQuestion = (question) => {
    // content inside question tag and answer tag before you hit button answer
    questions.innerText = question;
    joke.innerText = "HAHAHA not funny";
};

const displayAnswer = (answer) => {
    joke.innerText = answer;
};

const getJoke = async () => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data.length > 0) {
            const jokeText = data[0].joke;
            const [question, answer] = jokeText.split(/[:?.]/); // Memisahkan pertanyaan dan jawaban berdasarkan tanda ":" atau "?"

            if (question && answer) {
                // 
                displayQuestion(question.trim());
                //   when you hitting button answer
                btnAnswer.addEventListener("click", () => {
                    displayAnswer(answer.trim());
                });
            } else {
                displayQuestion("Error: Format lelucon tidak sesuai.");
            }
        } else {
            displayQuestion("Error: Tidak ada lelucon ditemukan.");
        }
    } catch (error) {
        displayQuestion("Error: Gagal memuat lelucon.");
    }
};

btnQuestion.addEventListener("click", getJoke);