import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAiDistractorDto } from 'src/dto/create.ai-distractor.dto';

@Injectable()
export class AiService {
  private readonly apiKey = process.env.OPENROUTER_API_KEY;
  private readonly model = 'deepseek/deepseek-chat-v3-0324:free';
  private readonly link = 'https://openrouter.ai/api/v1/chat/completions';

  async generate(data: CreateAiDistractorDto) {
    const prompt = this.buildPrompt(data);
    const content = await this.fetchCompletion(prompt);

    return this.safeParse(content);
  }

  private buildPrompt(data: CreateAiDistractorDto): string {
    return `
Generate distractors and a hint for the following task.

Question: ${data.question}
Correct Answer: ${data.correctAnswer}

Return ONLY valid JSON like this (to be able to parse it with JSON.parse(), don't state that this is JSON):
{"distractors": ["Wrong option 1", "Wrong option 2", "Wrong option 3"],"hint": "Helpful hint here"}
`.trim();
  }

  private async fetchCompletion(prompt: string): Promise<string> {
    const response = await fetch(this.link, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const json = await response.json();
    const content = json?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new BadRequestException('Empty response from AI');
    }

    return content;
  }

  private safeParse(raw: string): { distractors: string[]; hint: string } {
    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/```$/, '')
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      return {
        distractors: parsed.distractors || parsed.distract || [],
        hint: parsed.hint || '',
      };
    } catch (err) {
      throw new BadRequestException('AI model is overloaded. Try again later');
    }
  }
}
