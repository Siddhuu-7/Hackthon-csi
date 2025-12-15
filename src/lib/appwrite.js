import { Client, Databases, Account, ID, Query, OAuthProvider } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("69402fcd001f2b560740");

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query };

// Database configuration - UPDATE THESE after creating in Appwrite Console
const DATABASE_ID = "69403b820039c2f28227";
const TEAMS_COLLECTION_ID = "teams";
const MEMBERS_COLLECTION_ID = "team_members";

// Auth helper functions
export const authService = {
  // Create a new account
  async createAccount(email, password, name) {
    try {
      const newAccount = await account.create(ID.unique(), email, password, name);
      if (newAccount) {
        // Automatically login after signup
        return this.login(email, password);
      }
      return newAccount;
    } catch (error) {
      throw error;
    }
  },

  // Login with email and password
  async login(email, password) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  },

  // Login with Google OAuth
  loginWithGoogle() {
    try {
      account.createOAuth2Session(
        OAuthProvider.Google,
        window.location.origin + '/registration', // Success redirect
        window.location.origin + '/auth'          // Failure redirect
      );
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.log("No active session");
      return null;
    }
  },

  // Logout
  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  },

  // Check if user is logged in
  async isLoggedIn() {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }
};

// Database helper functions for team registration
export const teamService = {
  // Create or update team
  async saveTeam(userId, teamData) {
    try {
      // Check if team already exists for this user
      const existingTeam = await this.getTeamByUserId(userId);
      
      const teamDoc = {
        userId,
        teamName: teamData.teamName,
        collegeType: teamData.collegeType,
        otherCollege: teamData.otherCollege || "",
        // Team Lead info
        leadName: teamData.teamLead.name,
        leadEmail: teamData.teamLead.email,
        leadMobile: teamData.teamLead.mobile,
        leadDepartment: teamData.teamLead.department,
        leadYear: teamData.teamLead.year,
        leadLocation: teamData.teamLead.location || "",
        leadTshirtSize: teamData.teamLead.tshirtSize,
        leadIsCsi: teamData.teamLead.isCsi || false,
        updatedAt: new Date().toISOString(),
      };

      if (existingTeam) {
        // Update existing team
        const result = await databases.updateDocument(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          existingTeam.$id,
          teamDoc
        );
        return result;
      } else {
        // Create new team
        teamDoc.createdAt = new Date().toISOString();
        const result = await databases.createDocument(
          DATABASE_ID,
          TEAMS_COLLECTION_ID,
          ID.unique(),
          teamDoc
        );
        return result;
      }
    } catch (error) {
      console.error("Error saving team:", error);
      throw error;
    }
  },

  // Get team by user ID
  async getTeamByUserId(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        TEAMS_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );
      return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
      console.error("Error getting team:", error);
      return null;
    }
  },

  // Save team member
  async saveTeamMember(teamId, memberData, memberId = null) {
    try {
      const memberDoc = {
        teamId,
        name: memberData.name,
        email: memberData.email,
        mobile: memberData.mobile,
        department: memberData.department,
        year: memberData.year,
        location: memberData.location || "",
        tshirtSize: memberData.tshirtSize,
        isCsi: memberData.isCsi || false,
        updatedAt: new Date().toISOString(),
      };

      if (memberId) {
        // Update existing member
        const result = await databases.updateDocument(
          DATABASE_ID,
          MEMBERS_COLLECTION_ID,
          memberId,
          memberDoc
        );
        return result;
      } else {
        // Create new member
        memberDoc.createdAt = new Date().toISOString();
        const result = await databases.createDocument(
          DATABASE_ID,
          MEMBERS_COLLECTION_ID,
          ID.unique(),
          memberDoc
        );
        return result;
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      throw error;
    }
  },

  // Get all team members for a team
  async getTeamMembers(teamId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        [Query.equal("teamId", teamId)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error getting team members:", error);
      return [];
    }
  },

  // Delete a team member
  async deleteTeamMember(memberId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        memberId
      );
      return true;
    } catch (error) {
      console.error("Error deleting team member:", error);
      throw error;
    }
  },

  // Load full team data (team + members)
  async loadFullTeamData(userId) {
    try {
      const team = await this.getTeamByUserId(userId);
      if (!team) return null;

      const members = await this.getTeamMembers(team.$id);
      
      // Convert to form data format
      return {
        teamId: team.$id,
        teamName: team.teamName,
        collegeType: team.collegeType,
        otherCollege: team.otherCollege,
        teamLead: {
          name: team.leadName,
          email: team.leadEmail,
          mobile: team.leadMobile,
          department: team.leadDepartment,
          year: team.leadYear,
          location: team.leadLocation,
          tshirtSize: team.leadTshirtSize,
          isCsi: team.leadIsCsi,
          price: team.leadIsCsi ? "750" : "850"
        },
        teamMembers: members.map(m => ({
          id: m.$id,
          dbId: m.$id,
          name: m.name,
          email: m.email,
          mobile: m.mobile,
          department: m.department,
          year: m.year,
          location: m.location,
          tshirtSize: m.tshirtSize,
          isCsi: m.isCsi,
          price: m.isCsi ? "750" : "850"
        }))
      };
    } catch (error) {
      console.error("Error loading full team data:", error);
      return null;
    }
  },

  // Delete all team members for a team
  async deleteAllTeamMembers(teamId) {
    try {
      const members = await this.getTeamMembers(teamId);
      for (const member of members) {
        await this.deleteTeamMember(member.$id);
      }
      return true;
    } catch (error) {
      console.error("Error deleting all team members:", error);
      throw error;
    }
  }
};
