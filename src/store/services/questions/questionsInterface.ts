interface Question {
    question: string;
    explanation: string;
    options: string[];
    answer: number;
    id: number;
}

export interface LandmarkQuestions {
    name: string;
    id: number;
    questions: Question[];
    askedQuestions?: number[];
}

let landmarksQuestions: LandmarkQuestions[] | null = null;

export function setQuestionsData(data: { landmarks: LandmarkQuestions[] }) {
    landmarksQuestions = data.landmarks.map((landmark) => {
        return {
            ...landmark,
            questions: landmark.questions.map((question, index) => { return { ...question, id: index } }),
            askedQuestions: []
        };
    });
}

// returns an array of landmarks that have never been selected
export function getUnselectedLandmarks() {
    if (landmarksQuestions) {
        return landmarksQuestions.filter((landmark) => landmark.askedQuestions.length === 0);
    }
    return [];
}

// return an array of landmarks that have questions that have never been asked
export function getLandmarksWithUnaskedQuestions() {
    if (landmarksQuestions) {
        const landmarksWithQuestions = landmarksQuestions.filter((landmark) => landmark.askedQuestions.length < landmark.questions.length);
        return landmarksWithQuestions.map((landmark) => {
            return {
                ...landmark,
                questions: landmark.questions.filter((question, index) => !landmark.askedQuestions.includes(index))
            };
        });
    }
}

export function getRandomLandmarkQuestion() {
    let randomLandmark: LandmarkQuestions | null = null;
    // check if there are landmarks that have never been selected
    const unselectedLandmarks = getUnselectedLandmarks();
    if (unselectedLandmarks.length > 0) {
        // select a random landmark
        const randomLandmarkIndex = Math.floor(Math.random() * unselectedLandmarks.length);
        randomLandmark = unselectedLandmarks[randomLandmarkIndex];
    } else {
        // in this case all landmarks have been selected at least once
        // get all landmarks who still have questions that haven't been asked
        const landmarksWithUnaskedQuestions = getLandmarksWithUnaskedQuestions();
        const randomLandmarkIndex = Math.floor(Math.random() * landmarksWithUnaskedQuestions.length);
        randomLandmark = landmarksWithUnaskedQuestions[randomLandmarkIndex];
    }
    if (randomLandmark) {
        // select a random question
        const randomQuestionIndex = Math.floor(Math.random() * randomLandmark.questions.length);
        const randomQuestion = randomLandmark.questions[randomQuestionIndex];
        landmarksQuestions = landmarksQuestions.map((landmark) => {
            if (landmark.id === randomLandmark.id) {
                return {
                    ...landmark,
                    askedQuestions: [...landmark.askedQuestions, randomQuestion.id]
                };
            }
            return landmark;
        });
        const { id } = randomLandmark;
        const { question, explanation, options, answer } = randomQuestion;
        return { id, question, answer, options, explanation };
    }
    return null;
}