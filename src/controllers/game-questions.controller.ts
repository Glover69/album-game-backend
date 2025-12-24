import type { Context } from "hono";
import { GameQuestions } from "../services/game-questions";
import { Questions } from "../template/questions";


export const getQuestions = async (c: Context) => {
    try {
        const res = await GameQuestions.generateGameQuestions();
        return c.html(Questions({ questions: res.questions }));
    } catch (err) {
        console.error('Error in get questions:', err);
        return c.json({ error: 'Failed to get questions' }, 500);
    }
}