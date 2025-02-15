# OpenAITextActivity Overview

The `OpenAITextActivity` is a Spring service class designed to facilitate AI-driven workflows for text processing. The class integrates OpenAI's GPT models to generate responses and perform operations involving user-provided text and knowledge bases.

## Purpose

The main goals of `OpenAITextActivity` are:
- To integrate with the OpenAI API for generating intelligent, context-aware responses.
- To query and manage user-specific and system-wide knowledge bases for retrieving or storing relevant data.
- To classify user input into predefined categories like **Question**, **Statement**, and **Command** for intelligent processing.

## Features

### 1. Input-Output Modeling
- **Input (`AITextRequest`)**: Captures user input like text, instructions, and knowledge base identifiers.
- **Output (`AITextResponse`)**: Returns generated responses or processed text.

### 2. AI Interaction
- Connects to OpenAI's GPT API for generating responses.
- Builds AI interaction flows using user queries, system knowledge, and custom instructions.

### 3. Knowledge Base Management
- **System Knowledge Base**: Searches for relevant information in predefined system-wide knowledge bases.
- **User Knowledge Base**: Retrieves and optionally saves user-specific conversation data.

### 4. Input Classification
- Employs OpenAI's API to classify text inputs as either:
  - **Question**
  - **Statement**
  - **Command**

### 5. Saving User Data
- Saves classified "Statements" into the user's knowledge base for future reference and continuity in conversation history.

---

## Core Workflow

The `OpenAITextActivity` executes the following steps when processing a request:

1. **Receive Request Input**:
  - Accepts an `AITextRequest` with details such as text, instructions, and target knowledge base.

2. **Retrieve Configurations**:
  - Loads required OpenAI configurations and relevant system/user repositories.

3. **Query Knowledge Bases**:
  - Searches system and user-specific knowledge bases for contextual information, or retrieves conversation history.

4. **Construct AI Messages**:
  - Builds a series of AI interaction messages using:
    - User input
    - Knowledge base results
    - Custom instructions

5. **Generate Response**:
  - Sends the constructed request to OpenAI's GPT API for generating a response.

6. **Classify User Input**:
  - Classifies the input (`Question`, `Statement`, or `Command`) for additional data processing or storage decisions.

7. **Save User Data**:
  - Stores classified user "Statements" into the knowledge base if applicable.

8. **Return Response**:
  - Generates an `AITextResponse` containing the final AI-generated result.

---

## Key Methods

1. **`run()`**:
  - Core method to process the activity. Handles AI requests, knowledge base queries, text classification, and output generation.

2. **`searchSystemKnowledgeBase()`**:
  - Searches system-wide knowledge bases using AI-generated query vectors.

3. **`searchUserKnowledgeBase()`**:
  - Retrieves a user’s conversational history from the knowledge base.

4. **`searchKnowledgeBase()`**:
  - Performs general-purpose searches for relevant data from a specified knowledge base.

5. **`classifyInput()`**:
  - Uses OpenAI's API to classify textual input as a `Question`, `Statement`, or `Command`.

---

## Dependencies

- **Repositories**:
  - `KnowledgeChunkCustomRepositoryImpl`: Handles custom queries for knowledge chunks.
  - `KnowledgeBaseRepository`: Provides access to system-wide knowledge bases.
  - `ActivityConfigRepository`: Supplies configurations for the activity's behavior.

- **Services**:
  - `KnowledgeService`: Manages CRUD operations on knowledge records.
  - `AIService`: Facilitates OpenAI-specific API calls for embeddings, completions, and configuration management.

- **OpenAI Integration**:
  - Relies on the OpenAI GPT API for response generation, classification, and embeddings. Uses `AICompletionRequest` and `AICompletionResponse` models to interact with OpenAI.

---

## Example Use Cases

1. **AI-Powered Assistance**:
  - Generates intelligent responses to user queries using contextual system or user data.

2. **Knowledge Management**:
  - Retrieves information from knowledge bases and stores relevant conversational data for future reference.

3. **Input Classification**:
  - Classifies user entries into categories to control subsequent workflows intelligently.

4. **Instruction-Driven AI**:
  - Processes user-specific instructions to provide tailored and guided AI responses.

---

## Summary

`OpenAITextActivity` is a versatile and robust service that combines OpenAI's language models with custom knowledge management. It enables dynamic workflows for natural language processing, generating intelligent responses, and managing and saving user interactions.

This activity is particularly suited for chatbots, knowledge-based tools, and advanced AI applications requiring seamless integration between user input, system knowledge, and AI-powered responses.
