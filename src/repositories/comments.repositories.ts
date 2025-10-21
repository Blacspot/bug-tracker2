import { sql } from '../../db/config';
import { Comment, CreateComment, UpdateComment } from '../Types/comments.types';

export class CommentRepository {
  // Get all comments
  static async getAllComments(): Promise<Comment[]> {
    try {
      const result = await sql.query`SELECT * FROM Comments ORDER BY CreatedAt DESC`;
      return result.recordset;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  // Get comment by ID
  static async getCommentById(commentId: number): Promise<Comment | null> {
    try {
      const result = await sql.query`SELECT * FROM Comments WHERE CommentID = ${commentId}`;
      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error fetching comment by ID:', error);
      throw error;
    }
  }

  // Get comments by bug
  static async getCommentsByBug(bugId: number): Promise<Comment[]> {
    try {
      const result = await sql.query`SELECT * FROM Comments WHERE BugID = ${bugId} ORDER BY CreatedAt ASC`;
      return result.recordset;
    } catch (error) {
      console.error('Error fetching comments by bug:', error);
      throw error;
    }
  }

  // Get comments by user
  static async getCommentsByUser(userId: number): Promise<Comment[]> {
    try {
      const result = await sql.query`SELECT * FROM Comments WHERE UserID = ${userId} ORDER BY CreatedAt DESC`;
      return result.recordset;
    } catch (error) {
      console.error('Error fetching comments by user:', error);
      throw error;
    }
  }

  // Create new comment
  static async createComment(commentData: CreateComment): Promise<Comment> {
    try {
      const result = await sql.query`
        INSERT INTO Comments (BugID, UserID, CommentText)
        OUTPUT INSERTED.*
        VALUES (${commentData.BugID}, ${commentData.UserID}, ${commentData.CommentText})
      `;
      return result.recordset[0];
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  // Update comment
  static async updateComment(commentId: number, commentData: UpdateComment): Promise<Comment | null> {
    try {
      if (!commentData.CommentText) {
        throw new Error('Comment text is required for update');
      }

      const result = await sql.query`
        UPDATE Comments
        SET CommentText = ${commentData.CommentText}
        OUTPUT INSERTED.*
        WHERE CommentID = ${commentId}
      `;
      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  // Delete comment
  static async deleteComment(commentId: number): Promise<boolean> {
    try {
      const result = await sql.query`DELETE FROM Comments WHERE CommentID = ${commentId}`;
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }

  // Delete all comments for a bug (useful when deleting a bug)
  static async deleteCommentsByBug(bugId: number): Promise<number> {
    try {
      const result = await sql.query`DELETE FROM Comments WHERE BugID = ${bugId}`;
      return result.rowsAffected[0];
    } catch (error) {
      console.error('Error deleting comments by bug:', error);
      throw error;
    }
  }
}