import { VOICEFLOW_CONFIG, VoiceflowRequest, VoiceflowResponse, extractTextFromVoiceflowResponse } from '../utils/voiceflowConfig';

export class VoiceflowService {
  private sessionId: string;
  private apiKey: string;

  constructor(sessionId: string, apiKey?: string) {
    this.sessionId = sessionId;
    // In production, get API key from environment variables
    this.apiKey = apiKey || VOICEFLOW_CONFIG.apiKey;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const requestBody: VoiceflowRequest = {
        action: {
          type: 'text',
          payload: message
        },
        config: {
          tts: false,
          stripSSML: true,
          stopAll: true,
          excludeTypes: ['block', 'debug', 'flow']
        },
        session: {
          userID: this.sessionId
        }
      };

      const response = await fetch(`${VOICEFLOW_CONFIG.apiUrl}/state/user/${VOICEFLOW_CONFIG.projectID}/interact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey,
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: VoiceflowResponse[] = await response.json();
      const responseText = extractTextFromVoiceflowResponse(data);
      
      return responseText || "I'm here to listen and support you. Could you tell me more about what's on your mind?";
    } catch (error) {
      console.error('Error communicating with Voiceflow:', error);
      throw error;
    }
  }

  async startConversation(): Promise<string> {
    try {
      const requestBody: VoiceflowRequest = {
        action: {
          type: 'intent',
          payload: { intent: { name: 'start' } }
        },
        config: {
          tts: false,
          stripSSML: true,
          stopAll: true,
          excludeTypes: ['block', 'debug', 'flow']
        },
        session: {
          userID: this.sessionId
        }
      };

      const response = await fetch(`${VOICEFLOW_CONFIG.apiUrl}/state/user/${VOICEFLOW_CONFIG.projectID}/interact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey,
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: VoiceflowResponse[] = await response.json();
      const responseText = extractTextFromVoiceflowResponse(data);
      
      return responseText || "Hi there! I'm Aira, your friendly AI companion. I'm here to listen and support you. What's on your heart today?";
    } catch (error) {
      console.error('Error starting conversation with Voiceflow:', error);
      throw error;
    }
  }

  // Method to reset conversation
  async resetConversation(): Promise<void> {
    try {
      await fetch(`${VOICEFLOW_CONFIG.apiUrl}/state/user/${VOICEFLOW_CONFIG.projectID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': this.apiKey,
        }
      });
    } catch (error) {
      console.error('Error resetting conversation:', error);
    }
  }

  // Method to set user variables (for personalization)
  async setUserVariables(variables: Record<string, any>): Promise<void> {
    try {
      const requestBody = {
        session: {
          userID: this.sessionId,
          variables
        }
      };

      await fetch(`${VOICEFLOW_CONFIG.apiUrl}/state/user/${VOICEFLOW_CONFIG.projectID}/variables`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey,
        },
        body: JSON.stringify(requestBody)
      });
    } catch (error) {
      console.error('Error setting user variables:', error);
    }
  }
}