// Voiceflow Configuration
export const VOICEFLOW_CONFIG = {
  projectID: '68651ed5b6d64a988f504e01',
  apiUrl: 'https://general-runtime.voiceflow.com',
  versionID: 'production',
  // Note: In production, store API keys securely in environment variables
  // This is a placeholder - you'll need to replace with your actual API key
  apiKey: 'VF.DM.68651ed5b6d64a988f504e01.YOUR_API_KEY_HERE'
};

export interface VoiceflowRequest {
  action: {
    type: 'text' | 'intent' | 'button';
    payload: string | object;
  };
  config?: {
    tts?: boolean;
    stripSSML?: boolean;
    stopAll?: boolean;
    excludeTypes?: string[];
  };
  session?: {
    userID: string;
    variables?: Record<string, any>;
  };
}

export interface VoiceflowResponse {
  type: 'text' | 'speak' | 'visual' | 'choice' | 'card' | 'carousel';
  payload?: {
    message?: string;
    slate?: {
      content: Array<{
        children: Array<{
          text: string;
        }>;
      }>;
    };
    choices?: Array<{
      name: string;
      request: any;
    }>;
  };
}

// Helper function to extract text from Voiceflow response
export const extractTextFromVoiceflowResponse = (responses: VoiceflowResponse[]): string => {
  let responseText = '';
  
  for (const item of responses) {
    if (item.type === 'text' && item.payload?.message) {
      responseText += item.payload.message + ' ';
    } else if (item.type === 'speak' && item.payload?.message) {
      responseText += item.payload.message + ' ';
    } else if (item.payload?.slate?.content) {
      // Handle slate format (rich text)
      for (const content of item.payload.slate.content) {
        for (const child of content.children) {
          responseText += child.text + ' ';
        }
      }
    }
  }
  
  return responseText.trim();
};

// Helper function to create session ID
export const createSessionId = (): string => {
  return `manavastha-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};