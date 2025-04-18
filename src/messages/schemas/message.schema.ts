import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  conversationId: { type: String, required: true },
  senderId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Object },
});

// Create indexes
MessageSchema.index({ conversationId: 1 });
MessageSchema.index({ timestamp: -1 });
MessageSchema.index({ senderId: 1 });