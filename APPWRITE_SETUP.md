# Appwrite Database Setup Instructions

Follow these steps to create the required database and collections in your Appwrite Console.

## 1. Create Database

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project
3. Navigate to **Databases** in the left sidebar
4. Click **Create database**
5. Enter:
   - **Database ID**: `hackathon_db`
   - **Name**: `Hackathon Database`
6. Click **Create**

## 2. Create Teams Collection

1. Inside the `hackathon_db` database, click **Create collection**
2. Enter:
   - **Collection ID**: `teams`
   - **Name**: `Teams`
3. Click **Create**
4. Go to **Settings** tab and under **Permissions**, add:
   - Click **Add role** → Select **Users** → Enable `Create`, `Read`, `Update`, `Delete`
5. Go to **Attributes** tab and create these attributes:

| Key | Type | Size | Required | Default |
|-----|------|------|----------|---------|
| userId | String | 255 | Yes | - |
| teamName | String | 255 | Yes | - |
| collegeType | String | 50 | Yes | - |
| otherCollege | String | 255 | No | - |
| leadName | String | 255 | Yes | - |
| leadEmail | String | 255 | Yes | - |
| leadMobile | String | 20 | Yes | - |
| leadDepartment | String | 50 | Yes | - |
| leadYear | String | 20 | Yes | - |
| leadLocation | String | 255 | No | - |
| leadTshirtSize | String | 10 | Yes | - |
| leadIsCsi | Boolean | - | No | false |
| createdAt | String | 50 | No | - |
| updatedAt | String | 50 | No | - |

6. Go to **Indexes** tab and create:
   - **Key**: `userId_index`
   - **Type**: Key
   - **Attributes**: `userId`
   - **Order**: ASC

## 3. Create Team Members Collection

1. Inside the `hackathon_db` database, click **Create collection**
2. Enter:
   - **Collection ID**: `team_members`
   - **Name**: `Team Members`
3. Click **Create**
4. Go to **Settings** tab and under **Permissions**, add:
   - Click **Add role** → Select **Users** → Enable `Create`, `Read`, `Update`, `Delete`
5. Go to **Attributes** tab and create these attributes:

| Key | Type | Size | Required | Default |
|-----|------|------|----------|---------|
| teamId | String | 255 | Yes | - |
| name | String | 255 | Yes | - |
| email | String | 255 | Yes | - |
| mobile | String | 20 | Yes | - |
| department | String | 50 | Yes | - |
| year | String | 20 | Yes | - |
| location | String | 255 | No | - |
| tshirtSize | String | 10 | Yes | - |
| isCsi | Boolean | - | No | false |
| createdAt | String | 50 | No | - |
| updatedAt | String | 50 | No | - |

6. Go to **Indexes** tab and create:
   - **Key**: `teamId_index`
   - **Type**: Key
   - **Attributes**: `teamId`
   - **Order**: ASC

## 4. Verify Setup

After creating the database and collections, your Appwrite Console should show:

```
hackathon_db (Database)
├── teams (Collection)
│   ├── Attributes: userId, teamName, collegeType, otherCollege, leadName, leadEmail, leadMobile, leadDepartment, leadYear, leadLocation, leadTshirtSize, leadIsCsi, createdAt, updatedAt
│   └── Indexes: userId_index
└── team_members (Collection)
    ├── Attributes: teamId, name, email, mobile, department, year, location, tshirtSize, isCsi, createdAt, updatedAt
    └── Indexes: teamId_index
```

## 5. Test the Setup

1. Start your dev server: `npm run dev`
2. Register/Login to your app
3. Go to Registration page
4. Fill in team details and add members
5. Check Appwrite Console → Databases → hackathon_db → teams to see saved data

## Troubleshooting

If you get errors:

1. **"Collection not found"**: Make sure collection IDs are exactly `teams` and `team_members`
2. **"Database not found"**: Make sure database ID is exactly `hackathon_db`
3. **"Permission denied"**: Check collection permissions allow Users to CRUD
4. **"Attribute not found"**: Verify all attributes are created with exact names (case-sensitive)
