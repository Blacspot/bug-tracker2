import { getPool } from '../../db/config';
import { Project, CreateProject, UpdateProject } from '../Types/projects.types';
import sql from 'mssql';

export class ProjectRepository {
  // Get all projects
  static async getAllProjects(): Promise<Project[]> {
    try {
      const pool = await getPool();
      const result = await pool.query`SELECT * FROM Projects ORDER BY CreatedAt DESC`;
      return result.recordset;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Get project by ID
  static async getProjectById(projectId: number): Promise<Project | null> {
    try {
      const pool = await getPool();
      const result = await pool.query`SELECT * FROM Projects WHERE ProjectID = ${projectId}`;
      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      throw error;
    }
  }

  // Get projects by creator
  static async getProjectsByCreator(creatorId: number): Promise<Project[]> {
    try {
      const pool = await getPool();
      const result = await pool.query`SELECT * FROM Projects WHERE CreatedBy = ${creatorId} ORDER BY CreatedAt DESC`;
      return result.recordset;
    } catch (error) {
      console.error('Error fetching projects by creator:', error);
      throw error;
    }
  }

  // Create new project
  static async createProject(projectData: CreateProject): Promise<Project> {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input("projectName", projectData.ProjectName)
        .input("description", projectData.Description || null)
        .input("createdBy", projectData.CreatedBy)
        .query(`
          INSERT INTO Projects (ProjectName, Description, CreatedBy)
          OUTPUT INSERTED.*
          VALUES (@projectName, @description, @createdBy)
        `);
      return result.recordset[0];
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project
  static async updateProject(projectId: number, projectData: UpdateProject): Promise<Project | null> {
    try {
      const updateFields: string[] = [];

      if (projectData.ProjectName) {
        updateFields.push('ProjectName = @projectName');
      }
      if (projectData.Description !== undefined) {
        updateFields.push('Description = @description');
      }

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      const query = `
        UPDATE Projects
        SET ${updateFields.join(', ')}
        OUTPUT INSERTED.*
        WHERE ProjectID = @projectId
      `;

      const pool = await getPool();
      const request = pool.request()
        .input("projectId", projectId);

      if (projectData.ProjectName) request.input("projectName", projectData.ProjectName);
      if (projectData.Description !== undefined) request.input("description", projectData.Description);

      const result = await request.query(query);
      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Delete project
  static async deleteProject(projectId: number): Promise<boolean> {
    try {
      const pool = await getPool();
      const result = await pool.query`DELETE FROM Projects WHERE ProjectID = ${projectId}`;
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
}