
class Gpt3Chat {
        constructor() {
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        this.apiUrl = "https://api.openai.com/v1/chat/completions";
    }

    async fetchAPI(prompt) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${this.apiKey}`);

            const raw = JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant for giving hemp to smoothies store."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 1,
                "top_p": 1,
                "n": 1,
                "stream": false,
                "max_tokens": 250,
                "presence_penalty": 0,
                "frequency_penalty": 0
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            return await fetch(this.apiUrl, requestOptions);

        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch from OpenAI");
        }
    }

    async getNameForSmoothie(ingredients) {
        const prompt = `I create a custom smoothie with the following ingredients: ${ingredients}. What should I name it? just a name, please without any other information.`;
        try {
            const response = await this.fetchAPI(prompt);

            if (!response.ok) {
                throw new Error(`Failed to fetch from OpenAI: ${response.statusText}`);
            }

            const responseData = await response.json();
            return responseData.choices[0].message.content.trim();
        } catch (error) {
            console.error(error);
            return 'INCREDIBLE SMOOTHIE !'
        }
    }

    async sendMessage(message) {
        try {
            const response = await this.fetchAPI(message);

            if (!response.ok) {
                throw new Error(`Failed to fetch from OpenAI: ${response.statusText}`);
            }

            const responseData = await response.json();
            return responseData.choices[0].text.trim();
        } catch (error) {
            console.error(error);
            throw new Error("Failed to send message");
        }
    }
}

export default Gpt3Chat;
