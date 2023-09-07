interface Question {
    question: string;
    explanation: string;
    options: string[];
    answer: number;
    id: number;
}

export interface Landmark {
    name: string;
    id: number;
    selected: boolean;
    questions: Question[];
    selectedQuestion: Question;
}

let landmarks: Landmark[] | null = null;

export function setQuestionsData(data: { landmarks: Landmark[] }) {
    landmarks = data.landmarks.map((landmark) => {
        return {
            ...landmark,
            questions: landmark.questions.map((question, index) => { return { ...question, id: index } }),
            askedQuestions: []
        };
    });
}

// returns an array of landmarks that have never been selected
export function getUnselectedLandmarks() {
    if (landmarks) {
        return landmarks.filter((landmark) => !landmark.selected);
    }
    return [];
}


export function getRandomLandmarkQuestion() {
    let randomLandmark: Landmark | null = null;
    // check if there are landmarks that have never been selected
    const unselectedLandmarks = getUnselectedLandmarks();
    if (unselectedLandmarks.length > 0) {
        // select a random landmark
        const randomLandmarkIndex = Math.floor(Math.random() * unselectedLandmarks.length);
        randomLandmark = unselectedLandmarks[randomLandmarkIndex];
        landmarks.forEach(landmark => {
            if (landmark.id === randomLandmark.id) {
                randomLandmark.selected = true;
            }
        })
    } else {
        // to do: game over
    }
    if (randomLandmark) {
        // select a random question
        const randomQuestionIndex = Math.floor(Math.random() * randomLandmark.questions.length);
        const randomQuestion = randomLandmark.questions[randomQuestionIndex];
        const { id } = randomLandmark;
        const { question, explanation, options, answer } = randomQuestion;
        return { id, question, answer, options, explanation };
    }
    return null;
}